// ==================== 1. DARK MODE TOGGLE ====================
const darkModeToggle = () => {
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'darkModeToggle';
  toggleBtn.innerHTML = '🌙';
  toggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
  toggleBtn.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 30px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, var(--accent), var(--accent-dark));
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    z-index: 998;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  document.body.appendChild(toggleBtn);
  
  // Check saved preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggleBtn.innerHTML = '☀️';
  }
  
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    
    // Button animation
    toggleBtn.style.transform = 'scale(0.9) rotate(360deg)';
    setTimeout(() => {
      toggleBtn.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  });
  
  toggleBtn.addEventListener('mouseenter', () => {
    toggleBtn.style.transform = 'scale(1.1) translateY(-4px)';
    toggleBtn.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
  });
  
  toggleBtn.addEventListener('mouseleave', () => {
    toggleBtn.style.transform = 'scale(1) translateY(0)';
    toggleBtn.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
  });
};

// ==================== 2. BACK TO TOP BUTTON ====================
const backToTop = () => {
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Back to Top');
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 30px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, var(--accent), var(--accent-dark));
    color: white;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 998;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  document.body.appendChild(btn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
    } else {
      btn.style.opacity = '0';
      btn.style.visibility = 'hidden';
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.1) translateY(-4px)';
    btn.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1) translateY(0)';
    btn.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
  });
};

// ==================== 3. MOBILE HAMBURGER MENU ====================
const mobileMenu = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  const hamburger = document.createElement('button');
  hamburger.id = 'hamburger';
  hamburger.innerHTML = '☰';
  hamburger.setAttribute('aria-label', 'Toggle Menu');
  hamburger.style.cssText = `
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
    padding: 8px;
    transition: transform 0.3s ease;
  `;
  
  navbar.parentNode.insertBefore(hamburger, navbar);
  
  // Mobile styles
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      #hamburger {
        display: block !important;
      }
      .navbar {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: linear-gradient(180deg, var(--dark), var(--accent-dark));
        flex-direction: column;
        align-items: stretch;
        padding: 20px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease, padding 0.4s ease;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        z-index: 997;
      }
      .navbar.active {
        max-height: 500px;
        padding: 20px;
      }
      .navbar a {
        margin: 6px 0;
        text-align: center;
      }
    }
  `;
  document.head.appendChild(style);
  
  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    hamburger.style.transform = navbar.classList.contains('active') 
      ? 'rotate(90deg)' 
      : 'rotate(0deg)';
    hamburger.innerHTML = navbar.classList.contains('active') ? '✕' : '☰';
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && e.target !== hamburger) {
      navbar.classList.remove('active');
      hamburger.style.transform = 'rotate(0deg)';
      hamburger.innerHTML = '☰';
    }
  });
};

// ==================== 4. SCROLL ANIMATIONS ====================
const scrollAnimations = () => {
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .animate-on-scroll.animated {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  const elements = document.querySelectorAll('.card, .picture, .hobby-card');
  elements.forEach((el, i) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
};

// ==================== 5. TYPING EFFECT (Home Page) ====================
const typingEffect = () => {
  const heroTitle = document.querySelector('.hero h1, .two-col h1');
  if (!heroTitle) return;
  
  const originalText = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.borderRight = '3px solid var(--accent)';
  heroTitle.style.display = 'inline-block';
  heroTitle.style.paddingRight = '5px';
  
  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      setTimeout(() => {
        heroTitle.style.borderRight = 'none';
      }, 500);
    }
  };
  
  setTimeout(typeWriter, 500);
};

// ==================== 6. GALLERY LIGHTBOX ====================
const galleryLightbox = () => {
  const pictures = document.querySelectorAll('.picture img, .side-card img, .side-img img');
  if (pictures.length === 0) return;
  
  // Create lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.95);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
    animation: fadeIn 0.3s ease;
  `;
  
  const img = document.createElement('img');
  img.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    animation: zoomIn 0.3s ease;
  `;
  
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = `
    position: absolute;
    top: 30px;
    right: 40px;
    font-size: 40px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.3s ease;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes zoomIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    #lightbox:hover span {
      transform: scale(1.2) rotate(90deg);
    }
  `;
  document.head.appendChild(style);
  
  lightbox.appendChild(img);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);
  
  pictures.forEach(picture => {
    picture.style.cursor = 'pointer';
    picture.addEventListener('click', (e) => {
      e.stopPropagation();
      img.src = picture.src;
      lightbox.style.display = 'flex';
    });
  });
  
  const closeLightbox = () => {
    lightbox.style.display = 'none';
  };
  
  lightbox.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', closeLightbox);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
};

// ==================== 7. FORM VALIDATION (Contact Page) ====================
const formValidation = () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');
  
  const showError = (input, message) => {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error-message')) {
      error = document.createElement('span');
      error.classList.add('error-message');
      error.style.cssText = `
        color: #ff4444;
        font-size: 12px;
        display: block;
        margin-top: 4px;
        animation: shake 0.3s ease;
      `;
      input.parentNode.appendChild(error);
    }
    error.textContent = message;
    input.style.borderColor = '#ff4444';
  };
  
  const clearError = (input) => {
    const error = input.nextElementSibling;
    if (error && error.classList.contains('error-message')) {
      error.remove();
    }
    input.style.borderColor = '#d0d0d0';
  };
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
  `;
  document.head.appendChild(style);
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    // Name validation
    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Name is required');
      isValid = false;
    } else {
      clearError(nameInput);
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email');
      isValid = false;
    } else {
      clearError(emailInput);
    }
    
    // Message validation
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters');
      isValid = false;
    } else {
      clearError(messageInput);
    }
    
    if (isValid) {
      alert('Thank you! Your message has been sent successfully.');
      form.reset();
    }
  });
  
  // Real-time validation
  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => clearError(input));
    }
  });
};

// ==================== 8. STATS COUNTER ANIMATION ====================
const statsCounter = () => {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    });
    
    observer.observe(counter);
  });
};

// ==================== 9. LOADING SCREEN ====================
const loadingScreen = () => {
  const loader = document.createElement('div');
  loader.id = 'pageLoader';
  loader.innerHTML = `
    <div style="text-align: center;">
      <div class="spinner"></div>
      <p style="color: white; margin-top: 20px; font-size: 18px; font-weight: 600;">Loading...</p>
    </div>
  `;
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--dark), var(--accent-dark));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(loader);
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 500);
  });
};

// ==================== 10. NAVBAR ACTIVE STATE ====================
const navbarActiveState = () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.background = 'linear-gradient(45deg, var(--accent-dark), var(--accent))';
      link.style.boxShadow = '0 0 20px rgba(60,110,113,0.5)';
    }
  });
};

// ==================== DARK MODE CSS ====================
const darkModeStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    body.dark-mode {
      background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
      color: #e0e0e0;
    }
    body.dark-mode .card {
      background: #2a2a2a;
      color: #e0e0e0;
    }
    body.dark-mode .picture {
      background: linear-gradient(180deg, #2a2a2a, #333);
    }
    body.dark-mode .table th {
      background: linear-gradient(90deg, #3c6e71, #284b63);
    }
    body.dark-mode .table td {
      background: #2a2a2a;
      border-color: #444;
    }
    body.dark-mode input,
    body.dark-mode textarea {
      background: #333;
      border-color: #555;
      color: #e0e0e0;
    }
    body.dark-mode .site-footer {
      background: linear-gradient(90deg, #1a1a1a, #2a2a2a);
    }
  `;
  document.head.appendChild(style);
};

// ==================== SMOOTH SCROLL FOR ALL LINKS ====================
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

// ==================== 11. SOUND EFFECTS ====================
const soundEffects = () => {
  // Create audio context for sound effects
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  
  // Sound generator function
  const playSound = (frequency, duration, type = 'sine') => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
  };
  
  // Click sound (short beep)
  const clickSound = () => {
    playSound(800, 0.1, 'sine');
  };
  
  // Hover sound (subtle tone)
  const hoverSound = () => {
    playSound(600, 0.05, 'sine');
  };
  
  // Page transition sound (swoosh)
  const pageTransitionSound = () => {
    playSound(400, 0.15, 'sine');
    setTimeout(() => playSound(600, 0.1, 'sine'), 50);
  };
  
  // Success sound (positive chime)
  const successSound = () => {
    playSound(523, 0.1, 'sine'); // C
    setTimeout(() => playSound(659, 0.1, 'sine'), 100); // E
    setTimeout(() => playSound(784, 0.15, 'sine'), 200); // G
  };
  
  // Error sound (alert)
  const errorSound = () => {
    playSound(300, 0.1, 'square');
    setTimeout(() => playSound(250, 0.15, 'square'), 100);
  };
  
  // Add sound to navigation links
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (e) => {
      pageTransitionSound();
    });
    
    link.addEventListener('mouseenter', () => {
      hoverSound();
    });
  });
  
  // Add sound to buttons
  document.querySelectorAll('.btn, button').forEach(btn => {
    btn.addEventListener('click', () => {
      clickSound();
    });
    
    btn.addEventListener('mouseenter', () => {
      hoverSound();
    });
  });
  
  // Add sound to cards and pictures
  document.querySelectorAll('.card, .picture, .hobby-card').forEach(element => {
    element.addEventListener('click', () => {
      clickSound();
    });
    
    element.addEventListener('mouseenter', () => {
      hoverSound();
    });
  });
  
  // Add sound to form inputs
  document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
      playSound(500, 0.05, 'sine');
    });
  });
  
  // Add sound to table rows
  document.querySelectorAll('.table tr').forEach(row => {
    row.addEventListener('click', () => {
      clickSound();
    });
  });
  
  // Add sound to links
  document.querySelectorAll('a:not(.navbar a)').forEach(link => {
    link.addEventListener('click', () => {
      clickSound();
    });
  });
  
  // Success sound for form submission
  const form = document.querySelector('.contact-form');
  if (form) {
    const originalSubmit = form.onsubmit;
    form.addEventListener('submit', (e) => {
      if (form.checkValidity()) {
        successSound();
      } else {
        errorSound();
      }
    });
  }
  
  // Dark mode toggle sound
  const darkToggle = document.querySelector('#darkModeToggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      playSound(700, 0.1, 'sine');
      setTimeout(() => playSound(500, 0.1, 'sine'), 80);
    });
  }
  
  // Back to top sound
  const backBtn = document.querySelector('#backToTop');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      playSound(600, 0.12, 'triangle');
    });
  }
  
  // Gallery lightbox sound
  document.querySelectorAll('.picture img, .side-card img').forEach(img => {
    img.addEventListener('click', () => {
      playSound(900, 0.15, 'sine');
    });
  });
  
  // Page load sound
  setTimeout(() => {
    playSound(440, 0.1, 'sine');
    setTimeout(() => playSound(550, 0.1, 'sine'), 80);
    setTimeout(() => playSound(660, 0.15, 'sine'), 160);
  }, 800);
  
  // Create sound toggle button
  const soundToggle = document.createElement('button');
  soundToggle.id = 'soundToggle';
  soundToggle.innerHTML = '🔊';
  soundToggle.setAttribute('aria-label', 'Toggle Sound');
  soundToggle.style.cssText = `
    position: fixed;
    bottom: 160px;
    right: 30px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, var(--accent), var(--accent-dark));
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    z-index: 998;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  document.body.appendChild(soundToggle);
  
  let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
  if (!soundEnabled) {
    soundToggle.innerHTML = '🔇';
    audioCtx.suspend();
  }
  
  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.innerHTML = soundEnabled ? '🔊' : '🔇';
    localStorage.setItem('soundEnabled', soundEnabled);
    
    if (soundEnabled) {
      audioCtx.resume();
      playSound(600, 0.1, 'sine');
    } else {
      audioCtx.suspend();
    }
    
    soundToggle.style.transform = 'scale(0.9) rotate(360deg)';
    setTimeout(() => {
      soundToggle.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  });
  
  soundToggle.addEventListener('mouseenter', () => {
    soundToggle.style.transform = 'scale(1.1) translateY(-4px)';
    soundToggle.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
  });
  
  soundToggle.addEventListener('mouseleave', () => {
    soundToggle.style.transform = 'scale(1) translateY(0)';
    soundToggle.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
  });
};

// ==================== INITIALIZE ALL FEATURES ====================
document.addEventListener('DOMContentLoaded', () => {
  loadingScreen();
  darkModeStyles();
  darkModeToggle();
  backToTop();
  mobileMenu();
  scrollAnimations();
  typingEffect();
  galleryLightbox();
  formValidation();
  statsCounter();
  navbarActiveState();
  smoothScroll();
  soundEffects();
  
  console.log('✅ All enhancement features loaded successfully!');
  console.log('🔊 Sound effects activated!');
});
