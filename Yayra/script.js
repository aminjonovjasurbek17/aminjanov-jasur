// ===== Yayra — interaktivlik =====

// Nav holati (scrollda fon paydo bo'ladi)
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobil hamburger menyu
const burger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');
if (burger) {
  const closeMenu = () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

// Scroll reveal — bo'limlar ko'rinishga chiqqanda jonlanadi
const revealTargets = [
  '.section-head', '.flavor-card', '.benefit-card', '.review-card', '.faq__item',
  '.story__inner', '.ritual__item', '.cta-banner', '.footer__top'
];
const els = document.querySelectorAll(revealTargets.join(','));
els.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 60}ms`;
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
els.forEach(el => io.observe(el));

// Hero shishasiga yengil parallaks
const bottles = document.querySelector('.hero__bottles');
if (bottles && window.matchMedia('(min-width:1000px)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 800) bottles.style.transform = `translateY(${y * 0.06}px)`;
  }, { passive: true });
}

// "Savatga" tugmasi — yoqimli mikro-fikbek
let cartCount = 0;
document.querySelectorAll('.btn--mini').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    const original = btn.textContent;
    btn.textContent = '✓ Qo\'shildi';
    btn.style.background = '#7FB733';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
    }, 1400);
  });
});
