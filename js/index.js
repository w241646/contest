// JavaScript Document

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