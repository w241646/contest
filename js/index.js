// JavaScript Document

/* -- loading -- */
$(function () {
  var webStorage = function () {
    if (sessionStorage.getItem('access')) {
      /* 2回目以降アクセス時の処理 */
      $(".loading").addClass('is-active');

      // 少し待ってからフェードアウトアニメーションを開始
      setTimeout(function () {
        $(".loading").addClass('slide-up');
      }, 1000); // 表示後1秒でアニメーション開始
      
    } else {
      /* 初回アクセス時の処理 */
      sessionStorage.setItem('access', 'true'); // sessionStorageにデータを保存
      $(".loading-animation").addClass('is-active'); // loadingアニメーションを表示

      setTimeout(function () {
        $(".loading").addClass('is-active');
        $(".loading-animation").removeClass('is-active');

        // ローディング表示後にフェードアウトアニメーションを開始
        setTimeout(function () {
          $(".loading-animation").addClass('slide-up');
        }, 0);

      }, 2000); // ローディングを表示する時間
    }
  }
  webStorage();
});
/* -- /loading -- */


/* -- applyResponsiveStyles -- */
function applyResponsiveStyles() {
  const width = window.innerWidth;

  // 基準値（例：最小320px、最大1920px）
  const minWidth = 300;
  const maxWidth = 1920;

  // 正規化（0〜1の範囲に変換）
  const normalized = Math.min(Math.max((width - minWidth) / (maxWidth - minWidth), 0), 1);

  // スタイルの動的計算（例：フォントサイズを14px〜24pxの間で変化させる）
  const fontSize = 14 + (24 - 14) * normalized;
  const padding = 8 + (32 - 8) * normalized;
  const contentMinWidth = 300; // コンテンツの最小幅
  const contentMaxWidth = 1350; // コンテンツの最大幅
  const contentWidth = contentMinWidth + (contentMaxWidth - contentMinWidth) * normalized;

  // 適用対象の要素
  // const target = document.querySelector('.responsive-box');
  const target = document.querySelector('.mainVI');
  if (target) {
    // target.style.fontSize = `${fontSize}px`;
    // target.style.padding = `${padding}px`;
    target.style.setProperty('--after-width', `${contentWidth}px`);
    // target.style.width = `${contentWidth}px`;
    // target.style.margin = '0 auto'; // 中央寄せ（任意）
  }
}

// 初回実行
applyResponsiveStyles();

// リサイズ時にも更新
window.addEventListener('resize', applyResponsiveStyles);
/* -- /applyResponsiveStyles -- */


/* -- loop-slider -- */
window.addEventListener('load', () => {
  const track = document.getElementById('sliderTrack');
  const images = Array.from(track.children);

  // 複製して追加
  images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });

  // DOMが更新された後に幅を取得
  requestAnimationFrame(() => {
    const totalWidth = track.scrollWidth / 2;
    track.style.animationDuration = `${totalWidth / 50}s`; // 速度調整
    track.style.setProperty('--scroll-distance', `-${totalWidth}px`);
  });
});
/* -- /loop-slider -- */