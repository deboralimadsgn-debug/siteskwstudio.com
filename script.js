// =============================================
// CALI ARQUITETURA — Scripts
// =============================================

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth scroll com offset do header fixo
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
}

// Smooth reveal on scroll
const revealEls = document.querySelectorAll(
  '.section__header, .about__grid, .service-card, .diff-item, .portfolio__item, .contact__grid, .quote'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Portfolio slider
const slider = document.getElementById('portfolioSlider');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

if (slider && prevBtn && nextBtn) {
  let current = 0;
  const slides = slider.querySelectorAll('.portfolio__slide');
  const total = slides.length;
  const visible = 3; // visíveis por vez (de 6 no total)

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth + 12;
    slider.style.transform = `translateX(-${current * slideWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (current < total - visible) current++;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    if (current > 0) current--;
    updateSlider();
  });

  window.addEventListener('resize', updateSlider);
}

// Select placeholder color
document.querySelectorAll('select.placeholder').forEach(sel => {
  sel.addEventListener('change', () => sel.classList.remove('placeholder'));
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Mensagem enviada!';
    btn.disabled = true;
    btn.style.background = '#A69F82';
    setTimeout(() => {
      btn.textContent = 'Enviar mensagem';
      btn.disabled = false;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}
