require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Profile = require('./models/Profile');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Certification = require('./models/Certification');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Certification.deleteMany({});

    // Create admin user
    console.log('👤 Creating admin user...');
    await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@chiragvaze.com',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    });

    // Create profile
    console.log('📝 Creating profile...');
    await Profile.create({
      name: 'Chirag Vaze',
      title: 'IT Engineering Student & Web Developer',
      heroDescription: 'Passionate about creating innovative web solutions and building scalable applications.',
      aboutText: 'I am an IT Engineering student with a passion for web development. I specialize in building modern, responsive web applications using the latest technologies.',
      email: 'chirag@example.com',
      phone: '+91 1234567890',
      location: 'Mumbai, India',
      socialLinks: {
        github: 'https://github.com/chiragvaze',
        linkedin: 'https://linkedin.com/in/chiragvaze',
        twitter: 'https://twitter.com/chiragvaze'
      },
      stats: {
        experience: '2+',
        projects: '15+',
        clients: '5+'
      },
      skills: [
        { name: 'HTML5', category: 'frontend', icon: 'fab fa-html5', proficiency: 95 },
        { name: 'CSS3', category: 'frontend', icon: 'fab fa-css3-alt', proficiency: 90 },
        { name: 'JavaScript', category: 'frontend', icon: 'fab fa-js', proficiency: 85 },
        { name: 'React', category: 'frontend', icon: 'fab fa-react', proficiency: 80 },
        { name: 'Node.js', category: 'backend', icon: 'fab fa-node', proficiency: 75 },
        { name: 'MongoDB', category: 'backend', icon: 'fas fa-database', proficiency: 70 },
        { name: 'Git', category: 'tools', icon: 'fab fa-git-alt', proficiency: 85 },
        { name: 'VS Code', category: 'tools', icon: 'fas fa-code', proficiency: 90 }
      ]
    });

    // Create projects
    console.log('💼 Creating projects...');
    await Project.create([
      {
        title: 'Task Manager Application',
        description: 'A full-stack task management application with real-time updates and user authentication.',
        longDescription: 'Built with React, Node.js, Express, and MongoDB. Features include task creation, editing, deletion, real-time updates using Socket.io, and JWT authentication.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
        features: ['Real-time updates', 'User authentication', 'Task categories', 'Due date reminders'],
        links: {
          github: 'https://github.com/chiragvaze/task-manager',
          live: 'https://taskmanager.example.com'
        },
        category: 'web',
        status: 'completed',
        featured: true,
        order: 1
      },
      {
        title: 'Weather Dashboard',
        description: 'Modern weather application with 7-day forecast and location-based weather data.',
        longDescription: 'Responsive weather dashboard using React and OpenWeather API. Features include current weather, hourly forecast, 7-day forecast, and location search.',
        technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
        features: ['7-day forecast', 'Location search', 'Weather charts', 'Responsive design'],
        links: {
          github: 'https://github.com/chiragvaze/weather-app',
          live: 'https://weather.example.com'
        },
        category: 'web',
        status: 'completed',
        featured: true,
        order: 2
      },
      {
        title: 'Medical Appointment System',
        description: 'Healthcare management system for booking and managing medical appointments.',
        longDescription: 'Complete healthcare solution with patient registration, doctor scheduling, appointment booking, and medical records management.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Express'],
        features: ['Patient registration', 'Doctor scheduling', 'Appointment booking', 'Medical records'],
        links: {
          github: 'https://github.com/chiragvaze/medical-system'
        },
        category: 'web',
        status: 'completed',
        featured: true,
        order: 3
      }
    ]);

    // Create experiences
    console.log('🎓 Creating experiences...');
    await Experience.create([
      {
        type: 'education',
        title: 'B.Tech in Information Technology',
        organization: 'University of Mumbai',
        location: 'Mumbai, India',
        description: 'Pursuing Bachelor of Technology in Information Technology with focus on web development and software engineering.',
        startDate: '2023',
        endDate: 'Present',
        current: true,
        technologies: ['Java', 'Python', 'Data Structures', 'Algorithms'],
        order: 1
      },
      {
        type: 'project',
        title: 'Team Project - E-commerce Platform',
        organization: 'Academic Project',
        description: 'Developed a full-stack e-commerce platform as part of academic curriculum. Led a team of 4 developers.',
        startDate: '2024',
        endDate: '2024',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redux'],
        achievements: ['Led team of 4 developers', 'Implemented payment gateway', 'Scored 95/100'],
        order: 2
      },
      {
        type: 'other',
        title: 'Self-Learning Web Development',
        organization: 'Online Courses & Projects',
        description: 'Completed multiple online courses and built personal projects to strengthen web development skills.',
        startDate: '2023',
        endDate: '2024',
        technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
        order: 3
      }
    ]);

    // Create certifications
    console.log('🏆 Creating certifications...');
    await Certification.create([
      {
        title: 'Full Stack Web Development',
        description: 'Comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and MongoDB',
        platform: 'Udemy',
        icon: 'fas fa-code',
        issueDate: '2024',
        order: 1
      },
      {
        title: 'JavaScript Algorithms and Data Structures',
        description: 'Advanced JavaScript programming and problem-solving techniques',
        platform: 'freeCodeCamp',
        icon: 'fab fa-js',
        issueDate: '2023',
        order: 2
      },
      {
        title: 'Responsive Web Design',
        description: 'Modern CSS, Flexbox, Grid, and responsive design principles',
        platform: 'freeCodeCamp',
        icon: 'fas fa-mobile-alt',
        issueDate: '2023',
        order: 3
      },
      {
        title: 'React - The Complete Guide',
        description: 'In-depth React course covering hooks, context, Redux, and more',
        platform: 'Udemy',
        icon: 'fab fa-react',
        issueDate: '2024',
        order: 4
      },
      {
        title: 'Node.js & Express',
        description: 'Backend development with Node.js, Express, and MongoDB',
        platform: 'Coursera',
        icon: 'fab fa-node',
        issueDate: '2024',
        order: 5
      },
      {
        title: 'Git & GitHub Essentials',
        description: 'Version control and collaborative development',
        platform: 'Udemy',
        icon: 'fab fa-git-alt',
        issueDate: '2023',
        order: 6
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('\n📌 Admin Credentials:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@chiragvaze.com'}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log('\n⚠️  Remember to change these in production!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
