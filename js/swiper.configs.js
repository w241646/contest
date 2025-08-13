// JavaScript Document

/* -- swiper -- */
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
/* -- /swiper -- */