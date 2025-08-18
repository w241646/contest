// JavaScript Document

/* -- rating -- */
function renderRatings() {
  const reviewBlocks = document.querySelectorAll('.rev-box');

  reviewBlocks.forEach(block => {
    const rating = parseFloat(block.dataset.rating); // data-ratingの数値を取得
    const starContainer = block.querySelector('.stars'); // 星を表示する要素

    if (!starContainer || isNaN(rating)) return; // 要素がない or ratingがNaNならスキップ

    starContainer.innerHTML = ''; // 初期化
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      if (rating >= i) {
        star.textContent = '★';
        star.classList.add('star', 'filled-star');
      } else if (rating >= i - 0.5) {
        star.textContent = '☆';
        star.classList.add('star', 'half-star');
      } else {
        star.textContent = '☆';
        star.classList.add('star', 'empty-star');
      }
      starContainer.appendChild(star);
    }

    const score = document.createElement('span');
    score.textContent = `（${rating}）`;
    starContainer.appendChild(score);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderRatings();
});
/* -- /rating -- */