

// BURGER MENU
const burger = document.getElementById('burger');
const navOverlay = document.getElementById("nav-overlay");
const whiteSection = document.getElementById('white-section');

// Burger click toggles menu
burger?.addEventListener("click", () => {
  if (navOverlay.classList.contains("show")) {
    navOverlay.classList.remove("show");
    navOverlay.classList.add("animating-out");
    setTimeout(() => {
      navOverlay.classList.remove("animating-out");
    }, 600);
  } else {
    navOverlay.classList.add("show");
  }
  burger.classList.toggle("active");
});

// Detect white section for burger color change
window.addEventListener('scroll', () => {
  if (!whiteSection) return;
  const rect = whiteSection.getBoundingClientRect();
  const inView = rect.top <= 60 && rect.bottom >= 60;
  burger.classList.toggle('black-burger', inView);
});

// REVEAL ANIMATIONS
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementBottom = el.getBoundingClientRect().bottom;
    const revealPoint = 150;

    // Add if in view
    if (elementTop < windowHeight - revealPoint && elementBottom > 0) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// MAGNET SCROLL — only on homepage
if (document.body.classList.contains('home-page')) {
  const snapPages = (() => {
  const chosen = Array.from(document.querySelectorAll('.snap-page'));
  return chosen.length ? chosen : Array.from(document.querySelectorAll('section'));
})();
  if (snapPages.length) {
    let isScrolling = false;
    let currentPage = 0;

    function scrollToPage(index) {
      if (index < 0 || index >= snapPages.length) return;
      isScrolling = true;
      currentPage = index;
      snapPages[index].scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => isScrolling = false, 800);
    }

    window.addEventListener('wheel', (e) => {
      if (isScrolling) return;
      if (e.deltaY > 0) scrollToPage(currentPage + 1);
      else if (e.deltaY < 0) scrollToPage(currentPage - 1);
    });

    window.addEventListener('keydown', (e) => {
      if (isScrolling) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') scrollToPage(currentPage + 1);
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') scrollToPage(currentPage - 1);
    });

    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });
    window.addEventListener('touchend', (e) => {
      if (isScrolling) return;
      const touchEndY = e.changedTouches[0].clientY;
      if (touchStartY - touchEndY > 50) scrollToPage(currentPage + 1);
      else if (touchEndY - touchStartY > 50) scrollToPage(currentPage - 1);
    });
  }
}
