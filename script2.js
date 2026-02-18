// Select carousel elements
const slides = document.querySelectorAll('.slide');
const thumbs = document.querySelectorAll('.thumb');
const arrowLeft = document.querySelector('.arrow.left');
const arrowRight = document.querySelector('.arrow.right');
const carousel = document.querySelector('.carousel'); // for hover detection

let current = 0;
let isAnimating = false;
let autoSlideInterval;

// --- Update carousel with animation ---
function updateCarousel(index, direction = 'next') {
  if (isAnimating) return;
  isAnimating = true;

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  const prev = current;
  current = index;

  const currentSlide = slides[prev];
  const nextSlide = slides[current];

  // Clear animation classes first
  slides.forEach(s =>
    s.classList.remove(
      'active',
      'prev',
      'next',
      'slide-in-left',
      'slide-in-right',
      'slide-out-left',
      'slide-out-right'
    )
  );

  // Direction-based transitions
  if (direction === 'next') {
    currentSlide.classList.add('slide-out-left');
    nextSlide.classList.add('slide-in-right');
  } else {
    currentSlide.classList.add('slide-out-right');
    nextSlide.classList.add('slide-in-left');
  }

  // Update after animation ends
  setTimeout(() => {
    slides.forEach((s, i) => {
      s.classList.remove(
        'slide-in-left',
        'slide-in-right',
        'slide-out-left',
        'slide-out-right'
      );
      s.classList.remove('active', 'prev', 'next');
      if (i === current) s.classList.add('active');
      else if (i === (current - 1 + slides.length) % slides.length)
        s.classList.add('prev');
      else if (i === (current + 1) % slides.length)
        s.classList.add('next');
    });
    isAnimating = false;
  }, 700);

  // Update thumbnails
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === current);
  });
}

// --- Controls ---
arrowLeft.addEventListener('click', () => updateCarousel(current - 1, 'prev'));
arrowRight.addEventListener('click', () => updateCarousel(current + 1, 'next'));

thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () =>
    updateCarousel(i, i > current ? 'next' : 'prev')
  );
});

// --- Auto slide ---
function startAutoSlide() {
  stopAutoSlide(); // clear any existing interval
  autoSlideInterval = setInterval(
    () => updateCarousel(current + 1, 'next'),
    6000
  );
}
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}
startAutoSlide();

// --- Pause on hover ---
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);