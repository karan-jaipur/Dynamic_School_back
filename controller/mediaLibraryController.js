const Banner = require('../model/Banner');
const ContentMap = require('../model/ContentMap');
const Gallery = require('../model/Gallery');
const Notice = require('../model/Notice');
const Page = require('../model/Page');
const PageContent = require('../model/PageContent');
const Settings = require('../model/Settings');

const IMAGE_FIELD_HINT = /(image|img|photo|banner|background|logo|favicon|icon|attachment)/i;
const IMAGE_VALUE_HINT = /(\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif)(\?.*)?$)|(^\/)|(uploads\/)|(^https?:\/\/)/i;

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function looksLikeImageUrl(value, key = '') {
  const text = normalizeText(value);
  if (!text) return false;
  return IMAGE_FIELD_HINT.test(key) || IMAGE_VALUE_HINT.test(text);
}

function pushAsset(target, seen, asset) {
  const url = normalizeText(asset.url);
  if (!url || seen.has(url)) return;
  seen.add(url);
  target.push({
    url,
    title: normalizeText(asset.title) || 'Untitled',
    source: normalizeText(asset.source) || 'content',
    category: normalizeText(asset.category) || '',
    context: normalizeText(asset.context) || '',
  });
}

function walkContentAssets(value, meta, target, seen, trail = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      walkContentAssets(item, meta, target, seen, trail.concat(String(index)));
    });
    return;
  }

  if (!value || typeof value !== 'object') {
    return;
  }

  Object.entries(value).forEach(([key, child]) => {
    if (typeof child === 'string' && looksLikeImageUrl(child, key)) {
      const contextTrail = trail.concat(key).filter(Boolean).join(' > ');
      pushAsset(target, seen, {
        url: child,
        title: contextTrail || key,
        source: meta.source,
        category: meta.category,
        context: meta.context ? `${meta.context}${contextTrail ? ` > ${contextTrail}` : ''}` : contextTrail,
      });
      return;
    }

    if (Array.isArray(child)) {
      child.forEach((item, index) => {
        if (typeof item === 'string' && looksLikeImageUrl(item, key)) {
          const contextTrail = trail.concat(`${key}[${index}]`).join(' > ');
          pushAsset(target, seen, {
            url: item,
            title: key,
            source: meta.source,
            category: meta.category,
            context: meta.context ? `${meta.context} > ${contextTrail}` : contextTrail,
          });
          return;
        }

        if (item && typeof item === 'object' && typeof item.url === 'string' && looksLikeImageUrl(item.url, key)) {
          const contextTrail = trail.concat(`${key}[${index}]`).join(' > ');
          pushAsset(target, seen, {
            url: item.url,
            title: item.title || item.label || item.caption || key,
            source: meta.source,
            category: meta.category || normalizeText(item.category),
            context: meta.context ? `${meta.context} > ${contextTrail}` : contextTrail,
          });
          return;
        }

        walkContentAssets(item, meta, target, seen, trail.concat(`${key}[${index}]`));
      });
      return;
    }

    if (child && typeof child === 'object') {
      if (typeof child.url === 'string' && looksLikeImageUrl(child.url, key)) {
        const contextTrail = trail.concat(key).join(' > ');
        pushAsset(target, seen, {
          url: child.url,
          title: child.title || child.label || child.caption || key,
          source: meta.source,
          category: meta.category || normalizeText(child.category),
          context: meta.context ? `${meta.context} > ${contextTrail}` : contextTrail,
        });
        return;
      }

      walkContentAssets(child, meta, target, seen, trail.concat(key));
    }
  });
}

exports.listMediaAssets = async (req, res, next) => {
  try {
    const [galleries, banners, notices, settings, contentMaps, pages, pageContents] = await Promise.all([
      Gallery.find({}).lean(),
      Banner.find({}).lean(),
      Notice.find({}).lean(),
      Settings.findOne({ _id: 'global_settings' }).lean(),
      ContentMap.find({}).lean(),
      Page.find({}).select('title slug').lean(),
      PageContent.find({}).lean(),
    ]);

    const assets = [];
    const seen = new Set();
    const pageMap = new Map(pages.map((page) => [String(page._id), page]));

    galleries.forEach((gallery) => {
      (gallery.images || []).forEach((image, index) => {
        pushAsset(assets, seen, {
          url: image.url,
          title: image.caption || gallery.title || `Gallery Image ${index + 1}`,
          source: 'gallery',
          category: gallery.category,
          context: gallery.description || gallery.title,
        });
      });
    });

    banners.forEach((banner, index) => {
      pushAsset(assets, seen, {
        url: banner.image,
        title: banner.title || `Banner ${index + 1}`,
        source: 'banner',
        category: 'banners',
        context: banner.subtitle || '',
      });
    });

    notices.forEach((notice, index) => {
      pushAsset(assets, seen, {
        url: notice.attachmentUrl,
        title: notice.title || `Notice ${index + 1}`,
        source: 'notice',
        category: 'notices',
        context: notice.description || '',
      });
    });

    if (settings) {
      [
        ['logo', settings.logo],
        ['favicon', settings.favicon],
        ['principalPhoto', settings.principalPhoto],
      ].forEach(([key, value]) => {
        pushAsset(assets, seen, {
          url: value,
          title: key,
          source: 'settings',
          category: 'settings',
          context: key,
        });
      });

      walkContentAssets(settings, { source: 'settings', category: 'settings', context: 'Global settings' }, assets, seen);
    }

    contentMaps.forEach((entry) => {
      walkContentAssets(
        entry.content,
        { source: 'content', category: entry.key, context: `Page content: ${entry.key}` },
        assets,
        seen
      );
    });

    pageContents.forEach((entry) => {
      const page = pageMap.get(String(entry.page_id));
      walkContentAssets(
        { sections: entry.sections || [] },
        {
          source: 'custom-page',
          category: page?.slug || 'custom-page',
          context: page?.title ? `Custom page: ${page.title}` : 'Custom page',
        },
        assets,
        seen
      );
    });

    res.json({
      success: true,
      data: assets,
    });
  } catch (error) {
    next(error);
  }
};
