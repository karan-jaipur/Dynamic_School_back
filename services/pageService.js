const Page = require('../model/Page');
const PageContent = require('../model/PageContent');

const SECTION_TYPES = ['hero', 'content', 'gallery', 'extra'];
const MAX_CONTENT_LENGTH = 1000;
const MAX_IMAGES = 10;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function normalizeSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeText(value) {
  return String(value || '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

async function getNextOrder() {
  const lastPage = await Page.findOne().sort({ order: -1 }).lean();
  return (lastPage?.order || 0) + 1;
}

async function ensurePageOrder(page) {
  if (Number.isInteger(page.order) && page.order > 0) {
    return page.order;
  }

  const nextOrder = await getNextOrder();
  page.order = nextOrder;
  await page.save();
  return nextOrder;
}

async function ensureUniqueSlug(slug, excludeId) {
  const existing = await Page.findOne({
    slug,
    ...(excludeId ? { _id: { $ne: excludeId } } : {}),
  });

  if (existing) {
    throw createHttpError(409, 'Slug must be unique');
  }
}

function validatePageInput(payload, { partial = false } = {}) {
  const updates = {};

  if (!partial || payload.title !== undefined) {
    const title = normalizeText(payload.title);
    if (!title) {
      throw createHttpError(400, 'Title is required');
    }
    if (title.length > 50) {
      throw createHttpError(400, 'Title must be 50 characters or fewer');
    }
    updates.title = title;
  }

  if (!partial || payload.slug !== undefined) {
    const slug = normalizeSlug(payload.slug);
    if (!slug) {
      throw createHttpError(400, 'Slug is required');
    }
    updates.slug = slug;
  }

  if (payload.is_active !== undefined) {
    updates.is_active = Boolean(payload.is_active);
  }

  if (payload.order !== undefined) {
    const order = Number(payload.order);
    if (!Number.isInteger(order) || order < 1) {
      throw createHttpError(400, 'Order must be a positive integer');
    }
    updates.order = order;
  }

  return updates;
}

function validateHeroSection(section, order) {
  const title = normalizeText(section.title);
  const subtitle = normalizeText(section.subtitle);
  const content = normalizeText(section.content);
  const image = normalizeText(section.image);
  const buttons = ensureArray(section.buttons)
    .map((button) => ({
      label: normalizeText(button.label),
      link: normalizeText(button.link),
    }))
    .filter((button) => button.label && button.link);

  if (!title) {
    throw createHttpError(400, 'Hero section title is required');
  }
  if (title.length > 50) {
    throw createHttpError(400, 'Hero title must be 50 characters or fewer');
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    throw createHttpError(400, 'Hero content must be 1000 characters or fewer');
  }

  return {
    type: 'hero',
    order,
    title,
    subtitle,
    content,
    image,
    buttons,
  };
}

function validateContentSection(section, order) {
  const text = normalizeText(section.text);
  if (!text) {
    throw createHttpError(400, 'Content section text is required');
  }
  if (text.length > MAX_CONTENT_LENGTH) {
    throw createHttpError(400, 'Content text must be 1000 characters or fewer');
  }

  return {
    type: 'content',
    order,
    text,
  };
}

function validateGallerySection(section, order) {
  const images = ensureArray(section.images).map((image, index) => {
    const url = normalizeText(image.url);
    const category = normalizeText(image.category);
    const size_bytes = Number(image.size_bytes || 0);

    if (!url) {
      throw createHttpError(400, `Gallery image ${index + 1} requires a URL`);
    }
    if (!Number.isFinite(size_bytes) || size_bytes <= 0) {
      throw createHttpError(400, `Gallery image ${index + 1} requires a valid size in bytes`);
    }
    if (size_bytes > MAX_IMAGE_SIZE) {
      throw createHttpError(400, `Gallery image ${index + 1} exceeds the 2MB limit`);
    }

    return {
      url,
      category,
      size_bytes,
    };
  });

  if (images.length > MAX_IMAGES) {
    throw createHttpError(400, 'Gallery section allows at most 10 images');
  }

  return {
    type: 'gallery',
    order,
    images,
  };
}

function validateExtraSection(section, order) {
  const layout = section.layout === 'grid-2' ? 'grid-2' : 'grid-1';
  const stats = ensureArray(section.stats).map((item) => ({
    label: normalizeText(item.label),
    value: normalizeText(item.value),
  })).filter((item) => item.label && item.value);

  const testimonials = ensureArray(section.testimonials).map((item) => ({
    name: normalizeText(item.name),
    quote: normalizeText(item.quote),
  })).filter((item) => item.name && item.quote);

  return {
    type: 'extra',
    order,
    layout,
    stats,
    testimonials,
  };
}

function validateSections(sections) {
  if (!Array.isArray(sections) || sections.length === 0) {
    throw createHttpError(400, 'At least one section is required');
  }

  return sections.map((section, index) => {
    const order = index + 1;
    if (!SECTION_TYPES.includes(section.type)) {
      throw createHttpError(400, `Unsupported section type: ${section.type}`);
    }

    switch (section.type) {
      case 'hero':
        return validateHeroSection(section, order);
      case 'content':
        return validateContentSection(section, order);
      case 'gallery':
        return validateGallerySection(section, order);
      case 'extra':
        return validateExtraSection(section, order);
      default:
        throw createHttpError(400, 'Unsupported section type');
    }
  });
}

async function reorderPages(pageId, desiredOrder) {
  const pages = await Page.find({}).sort({ order: 1, createdAt: 1 });
  const currentIndex = pages.findIndex((page) => String(page._id) === String(pageId));

  if (currentIndex === -1) {
    throw createHttpError(404, 'Page not found');
  }

  const [targetPage] = pages.splice(currentIndex, 1);
  const nextIndex = Math.max(0, Math.min(desiredOrder - 1, pages.length));
  pages.splice(nextIndex, 0, targetPage);

  const operations = pages.map((page, index) => ({
    updateOne: {
      filter: { _id: page._id },
      update: { order: index + 1 },
    },
  }));

  if (operations.length) {
    await Page.bulkWrite(operations);
  }
}

async function buildAdminPage(page) {
  await ensurePageOrder(page);
  const content = await PageContent.findOne({ page_id: page._id }).lean();
  return {
    ...page.toObject(),
    has_sections: Boolean(content?.sections?.length),
    sections: content?.sections || [],
  };
}

async function createPage(payload) {
  const input = validatePageInput(payload);
  await ensureUniqueSlug(input.slug);

  const page = await Page.create({
    ...input,
    order: await getNextOrder(),
  });

  await PageContent.create({
    page_id: page._id,
    sections: [],
  });

  return buildAdminPage(page);
}

async function listAdminPages() {
  const pages = await Page.find({}).sort({ order: 1, createdAt: 1 });
  return Promise.all(pages.map((page) => buildAdminPage(page)));
}

async function getAdminPage(pageId) {
  const page = await Page.findById(pageId);
  if (!page) {
    throw createHttpError(404, 'Page not found');
  }

  return buildAdminPage(page);
}

async function updatePage(pageId, payload) {
  const page = await Page.findById(pageId);
  if (!page) {
    throw createHttpError(404, 'Page not found');
  }

  await ensurePageOrder(page);
  const previousOrder = page.order;

  const input = validatePageInput(payload, { partial: true });

  if (input.slug) {
    await ensureUniqueSlug(input.slug, pageId);
    page.slug = input.slug;
  }

  if (input.title !== undefined) page.title = input.title;
  if (input.is_active !== undefined) page.is_active = input.is_active;
  if (input.order !== undefined) page.order = input.order;
  await page.save();

  if (input.order !== undefined && input.order !== previousOrder) {
    await reorderPages(page._id, input.order);
  }

  return getAdminPage(pageId);
}

async function savePageContent(pageId, sections) {
  const page = await Page.findById(pageId);
  if (!page) {
    throw createHttpError(404, 'Page not found');
  }

  const validatedSections = validateSections(sections);

  const content = await PageContent.findOneAndUpdate(
    { page_id: page._id },
    { page_id: page._id, sections: validatedSections },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  ).lean();

  return {
    page: {
      _id: page._id,
      title: page.title,
      slug: page.slug,
      is_active: page.is_active,
      order: page.order,
    },
    sections: content.sections,
  };
}

async function getUserPages() {
  const pages = await Page.find({ is_active: true }).sort({ order: 1, createdAt: 1 }).lean();
  const contents = await PageContent.find({
    page_id: { $in: pages.map((page) => page._id) },
  }).lean();

  const contentMap = new Map(contents.map((content) => [String(content.page_id), content.sections || []]));

  return pages
    .map((page) => ({
      ...page,
      sections: contentMap.get(String(page._id)) || [],
    }))
    .filter((page) => page.sections.length > 0);
}

module.exports = {
  SECTION_TYPES,
  MAX_CONTENT_LENGTH,
  MAX_IMAGES,
  MAX_IMAGE_SIZE,
  createPage,
  listAdminPages,
  getAdminPage,
  updatePage,
  savePageContent,
  getUserPages,
};
