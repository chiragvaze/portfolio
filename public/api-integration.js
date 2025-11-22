// API Configuration
const API_URL = window.CONFIG?.API_URL || 'http://localhost:5000/api';

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Utility: Get cached data or fetch new
const getCachedOrFetch = async (key, fetchFn) => {
  const cached = localStorage.getItem(key);
  const cacheTime = localStorage.getItem(`${key}_time`);
  
  if (cached && cacheTime && Date.now() - parseInt(cacheTime) < CACHE_DURATION) {
    return JSON.parse(cached);
  }
  
  const data = await fetchFn();
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_time`, Date.now().toString());
  return data;
};

// Fetch Profile Data
async function fetchProfile() {
  try {
    const response = await fetch(`${API_URL}/profile/public`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

// Fetch Projects
async function fetchProjects() {
  try {
    const response = await fetch(`${API_URL}/projects/public`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Fetch Experience
async function fetchExperience() {
  try {
    const response = await fetch(`${API_URL}/experience/public`);
    if (!response.ok) throw new Error('Failed to fetch experience');
    return await response.json();
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

// Fetch Certifications
async function fetchCertifications() {
  try {
    const response = await fetch(`${API_URL}/certifications/public`);
    if (!response.ok) throw new Error('Failed to fetch certifications');
    return await response.json();
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
}

// Submit Contact Form
async function submitContactForm(formData) {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) throw new Error('Failed to submit message');
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

// Update Profile Section
async function updateProfile() {
  const profile = await getCachedOrFetch('profile', fetchProfile);
  if (!profile) return;

  // Update Hero Section
  const heroName = document.querySelector('.hero-name, #hero-name');
  const heroTitle = document.querySelector('.hero-title, #hero-title');
  const heroDescription = document.querySelector('.hero-description, #hero-desc');
  
  if (heroName) heroName.textContent = profile.name;
  if (heroTitle) {
    // Format title with waving hand and gradient
    // Expected format: "👋 Hi, I'm Chirag Vaze" or similar
    const titleText = profile.title || '';
    const nameMatch = titleText.match(/(?:Hi,?\s*I'?m\s+)?(.+)/i);
    const name = nameMatch ? nameMatch[1].trim() : profile.name;
    
    heroTitle.innerHTML = `
      <span class="wave">👋</span>
      Hi, I'm <span class="gradient-text typing-animation">${name}</span>
    `;
  }
  if (heroDescription) heroDescription.textContent = profile.heroDescription;

  // Update About Section
  const aboutText = document.querySelector('.about-text, #about-text');
  if (aboutText && profile.aboutText) {
    // Split into paragraphs by double line breaks or single line breaks
    const paragraphs = profile.aboutText.split(/\n\n+|\n/).filter(p => p.trim());
    
    // Process each paragraph: highlight keywords
    const formattedParagraphs = paragraphs.map(paragraph => {
      let formatted = paragraph.trim();
      
      // Highlight name if it appears
      if (profile.name) {
        formatted = formatted.replace(
          new RegExp(`\\b${profile.name}\\b`, 'gi'),
          `<strong class="highlight-text">${profile.name}</strong>`
        );
      }
      
      // Highlight common important terms
      const keywords = ['Information Technology', 'IT', 'Web Developer', 'Full Stack', 'Frontend', 'Backend', 'React', 'Node.js'];
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        formatted = formatted.replace(regex, `<strong class="highlight-text">$&</strong>`);
      });
      
      return `<p>${formatted}</p>`;
    });
    
    aboutText.innerHTML = formattedParagraphs.join('');
  }

  // Update Stats
  if (profile.stats) {
    const statCounters = document.querySelectorAll('.counter');
    if (statCounters.length >= 3) {
      statCounters[0].setAttribute('data-target', profile.stats.projectsCompleted || 10);
      statCounters[0].textContent = profile.stats.projectsCompleted || 10;
      
      statCounters[1].setAttribute('data-target', profile.stats.technologies || 8);
      statCounters[1].textContent = profile.stats.technologies || 8;
      
      statCounters[2].setAttribute('data-target', profile.stats.yearsLearning || 2);
      statCounters[2].textContent = profile.stats.yearsLearning || 2;
    }
  }

  // Update Contact Info
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => link.href = `mailto:${profile.email}`);

  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => link.href = `tel:${profile.phone}`);

  // Update Social Links
  if (profile.socialLinks) {
    const githubLink = document.querySelector('a[href*="github"]');
    if (githubLink && profile.socialLinks.github) {
      githubLink.href = profile.socialLinks.github;
    }

    const linkedinLink = document.querySelector('a[href*="linkedin"]');
    if (linkedinLink && profile.socialLinks.linkedin) {
      linkedinLink.href = profile.socialLinks.linkedin;
    }
  }

  // Update Skills
  if (profile.skills && profile.skills.length > 0) {
    const skillsContainer = document.querySelector('.skills-grid, #skills-container');
    if (skillsContainer) {
      skillsContainer.innerHTML = profile.skills.map(skill => `
        <div class="skill-item" data-aos="fade-up">
          <i class="fas fa-check-circle"></i>
          <span>${skill}</span>
        </div>
      `).join('');
    }
  }
}

// Update Projects Section
async function updateProjects() {
  const projects = await getCachedOrFetch('projects', fetchProjects);
  if (!projects || projects.length === 0) return;

  const projectsContainer = document.querySelector('.projects-grid, #projects-container');
  if (!projectsContainer) return;

  projectsContainer.innerHTML = projects.map((project, index) => {
    // Parse long description for features (lines starting with ✓, -, or •)
    const features = project.longDescription 
      ? project.longDescription.split('\n').filter(line => line.trim().match(/^[✓\-•]/)).map(line => line.trim().replace(/^[✓\-•]\s*/, ''))
      : [];

    // Get image URL - try image field first, then images array, then use a default
    const imageUrl = project.image || 
                     (project.images && project.images.length > 0 ? project.images[0].url : null);

    return `
    <div class="project-card" data-aos="fade-up" ${index > 0 ? `data-aos-delay="${index * 100}"` : ''}>
      ${imageUrl ? `
      <div class="project-image">
        <img src="${imageUrl}" alt="${project.title}" class="project-img" loading="lazy">
        <div class="project-overlay">
          ${project.links?.github ? `<a href="${project.links.github}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>` : ''}
          ${project.links?.live ? `<a href="${project.links.live}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
        </div>
        <div class="project-bg"></div>
      </div>
      ` : ''}
      <div class="project-content">
        <span class="project-type">${project.category || 'Web'}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${features.length > 0 ? `
          <div class="project-features">
            ${features.slice(0, 4).map(feature => `<span><i class="fas fa-check"></i> ${feature}</span>`).join('')}
          </div>
        ` : ''}
        <div class="project-tech">
          ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `}).join('');
}

// Update Experience Section
async function updateExperience() {
  const experiences = await getCachedOrFetch('experience', fetchExperience);
  if (!experiences || experiences.length === 0) return;

  const experienceContainer = document.querySelector('.timeline, #experience-timeline');
  if (!experienceContainer) return;

  experienceContainer.innerHTML = experiences.map((exp, index) => `
    <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}" data-aos="fade-up">
      <div class="timeline-badge ${exp.type}">
        <i class="fas fa-${exp.type === 'work' ? 'briefcase' : exp.type === 'education' ? 'graduation-cap' : 'project-diagram'}"></i>
      </div>
      <div class="timeline-content">
        <span class="timeline-type">${exp.type}</span>
        <h3>${exp.title}</h3>
        <h4>${exp.organization}</h4>
        <span class="timeline-date">${exp.startDate} - ${exp.endDate}</span>
        <p>${exp.description}</p>
      </div>
    </div>
  `).join('');
}

// Update Certifications Section
async function updateCertifications() {
  const certifications = await getCachedOrFetch('certifications', fetchCertifications);
  if (!certifications || certifications.length === 0) return;

  const certificationsContainer = document.querySelector('.certifications-grid, #certifications-container');
  if (!certificationsContainer) return;

  certificationsContainer.innerHTML = certifications.map(cert => `
    <div class="certification-card" data-aos="zoom-in">
      <div class="cert-icon">
        <i class="${cert.icon || 'fas fa-certificate'}"></i>
      </div>
      <h3>${cert.title}</h3>
      <p>${cert.description}</p>
      <span class="cert-platform">${cert.platform}</span>
      ${cert.issueDate ? `<span class="cert-date">${cert.issueDate}</span>` : ''}
    </div>
  `).join('');
}

// Handle Contact Form Submission
function setupContactForm() {
  const contactForm = document.querySelector('#contact-form, .contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = {
      name: contactForm.querySelector('[name="name"]').value,
      email: contactForm.querySelector('[name="email"]').value,
      subject: contactForm.querySelector('[name="subject"]')?.value || 'Contact Form Submission',
      message: contactForm.querySelector('[name="message"]').value
    };

    try {
      await submitContactForm(formData);
      
      // Show success message
      alert('Message sent successfully! I\'ll get back to you soon.');
      contactForm.reset();
    } catch (error) {
      // Show error message
      alert('Failed to send message. Please try again or email me directly.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// Initialize Portfolio
async function initializePortfolio() {
  console.log('🚀 Initializing dynamic portfolio...');

  try {
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'api-loading';
    loadingIndicator.style.cssText = 'position:fixed;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#3b82f6,#8b5cf6);z-index:9999;';
    document.body.appendChild(loadingIndicator);

    // Load all sections in parallel
    await Promise.all([
      updateProfile(),
      updateProjects(),
      updateExperience(),
      updateCertifications()
    ]);

    // Setup contact form
    setupContactForm();

    // Remove loading indicator
    loadingIndicator.remove();

    console.log('✅ Portfolio data loaded successfully');
  } catch (error) {
    console.error('❌ Failed to initialize portfolio:', error);
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
  initializePortfolio();
}

// Export for manual refresh
window.refreshPortfolio = initializePortfolio;
