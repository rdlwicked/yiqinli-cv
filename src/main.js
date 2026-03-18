import './style.css';

/* ═══════════ Theme Toggle ═══════════ */
function getStoredTheme() {
  return localStorage.getItem('theme');
}

function getThemePreference() {
  const saved = getStoredTheme();
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

applyTheme(getThemePreference());

document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.classList.add('transition');
  applyTheme(next);
  localStorage.setItem('theme', next);
  setTimeout(() => document.documentElement.classList.remove('transition'), 500);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!getStoredTheme()) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

/* ═══════════ Progress Bar ═══════════ */
const progressBar = document.getElementById('progress');

function updateProgress() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ═══════════ Navigation ═══════════ */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.setAttribute('aria-expanded', 'false');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ═══════════ Scroll Reveal ═══════════ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
);

/* ═══════════ Lightbox ═══════════ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.life-card img').forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ═══════════ Scroll Reveal ═══════════ */
document.querySelectorAll('.proj, .exp-item, .research-item, .life-card').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});
