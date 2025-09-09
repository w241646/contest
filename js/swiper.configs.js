// JavaScript Document

/* -- mainVI -- */
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.mySwiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 3000,
    autoplay: {
      delay: 4000,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});
/* -- /mainVI -- */


/* -- /carousel -- */
const swiper = new Swiper('.swiper-container', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    320: {
      spaceBetween: 5,
    },
    480: {
      spaceBetween: 5,
    },
    768: {
      spaceBetween: 10,
    },
  },
});
/* -- /carousel -- */