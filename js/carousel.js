// Homepage testimonial carousel. Each .testimonial-carousel is independent —
// arrows only page that panel's own cards. Desktop shows all cards at once
// (see CSS); this only takes over the layout at the mobile breakpoint.
document.querySelectorAll('.testimonial-carousel').forEach(function (carousel) {
  var track = carousel.querySelector('.testimonials');
  var slides = track ? Array.prototype.slice.call(track.children) : [];
  var prevBtn = carousel.querySelector('.testimonial-arrow.prev');
  var nextBtn = carousel.querySelector('.testimonial-arrow.next');

  if (!slides.length || !prevBtn || !nextBtn) return;

  var index = slides.findIndex(function (slide) {
    return slide.classList.contains('is-active');
  });
  if (index < 0) index = 0;

  function render() {
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === index);
    });
  }

  function next() {
    index = (index + 1) % slides.length;
    render();
  }

  function prev() {
    index = (index - 1 + slides.length) % slides.length;
    render();
  }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  render();
});
