require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Import models
const User = require('../model/User');
const Notice = require('../model/Notice');
const Testimonial = require('../model/Testimonial');
const Settings = require('../model/Settings');
const Footer = require('../model/Footer');
const NavItem = require('../model/NavItem');
const Banner = require('../model/Banner');

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Notice.deleteMany({});
    await Testimonial.deleteMany({});
    await NavItem.deleteMany({});
    await Banner.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create Admin User
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@malhotrapublicschool.com',
      password: 'admin123', // Will be hashed automatically
      role: 'superadmin'
    });
    console.log('✓ Admin user created');
    console.log('  Email: admin@malhotrapublicschool.com');
    console.log('  Password: admin123');

    // // Create Navigation Items
    // const navItems = await NavItem.insertMany([
    //   { label: 'Home', link: '/', order: 1 },
    //   { label: 'About Us', link: '/about', order: 2 },
    //   { label: 'Academics', link: '/academics', order: 3 },
    //   { label: 'Admissions', link: '/admissions', order: 4 },
    //   { label: 'Gallery', link: '/gallery', order: 5 },
    //   { label: 'Contact', link: '/contact', order: 6 }
    // ]);
    // console.log(`✓ Created ${navItems.length} navigation items`);

    // Create Banners
    const banners = await Banner.insertMany([
      {
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
        title: 'Welcome to Malhotra Public School',
        subtitle: 'Learning Today, Leading Tomorrow',
        buttonText: 'Learn More',
        buttonLink: '/about',
        order: 1,
        isActive: true
      },
      {
        image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d',
        title: 'Admissions Open for 2026-27',
        subtitle: 'Join us in building a brighter future',
        buttonText: 'Apply Now',
        buttonLink: '/admissions',
        order: 2,
        isActive: true
      }
    ]);
    console.log(`✓ Created ${banners.length} banners`);

    // Create Notices
    const notices = await Notice.insertMany([
      {
        title: 'Admissions Open for 2026-27',
        description: 'We are now accepting applications for the academic year 2026-27. Visit the admissions office or apply online.',
        date: new Date('2026-03-01'),
        isHighlighted: true
      },
      {
        title: 'Annual Function on 15 March',
        description: 'Our annual function will be held on 15th March 2026. Parents are cordially invited.',
        date: new Date('2026-02-25'),
        isHighlighted: true
      },
      {
        title: 'Science Exhibition Registration Open',
        description: 'Students can register for the inter-school science exhibition. Last date: 10th March.',
        date: new Date('2026-02-20'),
        isHighlighted: false
      },
      {
        title: 'Parent-Teacher Meeting',
        description: 'PTM scheduled for all classes on 5th March 2026.',
        date: new Date('2026-02-28'),
        isHighlighted: false
      }
    ]);
    console.log(`✓ Created ${notices.length} notices`);

    // Create Testimonials
    const testimonials = await Testimonial.insertMany([
      {
        name: 'Mrs. Rajesh Kumar',
        role: 'Parent',
        content: 'Excellent education and discipline. My child has shown remarkable improvement in academics and extracurricular activities.',
        rating: 5,
        isActive: true
      },
      {
        name: 'Mr. Suresh Sharma',
        role: 'Parent',
        content: 'Best infrastructure in Kotputli. The teachers are very dedicated and caring towards students.',
        rating: 5,
        isActive: true
      },
      {
        name: 'Mrs. Priya Verma',
        role: 'Parent',
        content: 'A perfect blend of traditional values and modern education. Highly recommend this school.',
        rating: 5,
        isActive: true
      }
    ]);
    console.log(`✓ Created ${testimonials.length} testimonials`);

    // Create/Update Settings
    await Settings.findByIdAndUpdate(
      'global_settings',
      {
        _id: 'global_settings',
        themeColor: '#1E3A8A',
        accentColor: '#FACC15',
        fontFamily: 'Inter',
        animationsEnabled: true,
        seoTitle: 'Malhotra Public School - Learning Today, Leading Tomorrow',
        seoDescription: 'Premier educational institution in Kotputli, Rajasthan since 2008. Committed to academic excellence and character development.',
        googleAnalytics: ''
      },
      { upsert: true, new: true }
    );
    console.log('✓ Created global settings');

    // Create/Update Footer
    await Footer.findByIdAndUpdate(
      'footer_content',
      {
        _id: 'footer_content',
        address: 'Malhotra Public School, Kotputli, Rajasthan - 303108',
        phone: '+91-1234567890',
        email: 'info@malhotrapublicschool.com',
        mapUrl: '',
        socialLinks: [
          { platform: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
          { platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
          { platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
          { platform: 'YouTube', url: 'https://youtube.com', icon: 'youtube' }
        ],
        copyrightText: '© 2026 Malhotra Public School. All rights reserved.'
      },
      { upsert: true, new: true }
    );
    console.log('✓ Created footer content');

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📝 Login Credentials:');
    console.log('   Email: admin@malhotrapublicschool.com');
    console.log('   Password: admin123\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
