// === Initial Page Load Animation ===
window.addEventListener('load', () => {
  document.querySelectorAll('h1, h2, h3, p, img, section, .grid-item, nav, .hero-grid, footer')
    .forEach((el, index) => {
      setTimeout(() => el.classList.add('visible'), index * 100);
    });
});

// === Continuous Scroll-triggered Animations (Up + Down) ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // re-trigger animation when scrolling back up
    }
  });
}, { threshold: 0.1 });

// Observe all animatable elements
document.querySelectorAll('h1, h2, h3, p, img, section, .grid-item, nav, .hero-grid, footer')
  .forEach(el => observer.observe(el));

// === Optional: Smooth Scroll Reveal Effect ===
window.addEventListener('scroll', () => {
  document.querySelectorAll('.visible').forEach(el => {
    el.style.transitionDelay = `${Math.random() * 0.3}s`;
  });
});

const gallery = document.querySelector('.gallery');
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');
const images = document.querySelectorAll('.gallery img');
const selectionMessage = document.getElementById('selection-message');

// Scroll left/right when buttons are clicked
leftBtn.addEventListener('click', () => {
  gallery.scrollBy({ left: -220, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  gallery.scrollBy({ left: 220, behavior: 'smooth' });
});

// Show which trouser was selected
images.forEach(img => {
  img.addEventListener('click', () => {
    selectionMessage.textContent = `You selected: ${img.alt}`;
  });
});