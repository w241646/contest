// JavaScript Document

/* -- arctext -- */
$(function () {
  $('#txt_radius1').arctext({radius: 100});
});
/* -- /arctext -- */


/* -- inview -- */
$(function () {
  // 共通の inview クラス処理
  $(".inview, .inview_re").on("inview", function (event, isInView) {
    if (isInView) {
      $(this).stop().addClass("is-show");
    }
  });
});

// row_list のアニメーション処理
function bindInviewAnimationRowList() {
  $(".row_list").each(function () {
    const $row = $(this);
    const $items = $row.find("dl");

    $row.off("inview").on("inview", function (event, isInView) {
      if (isInView) {
        $items.each(function (index) {
          const delay = index * 100;
          const $this = $(this);
          setTimeout(function () {
            $this.addClass("inview");
          }, delay);
        });
      }
    });
  });
};

// card-list のアニメーション処理
function bindInviewAnimationCardList() {
  $(".card-list").each(function () {
    const $cardList = $(this);
    const $items = $cardList.children("div");

    $cardList.on("inview", function (event, isInView) {
      if (isInView) {
        $items.each(function (index) {
          const delay = index * 250;
          const $this = $(this);
          setTimeout(function () {
            $this.addClass("inview");
          }, delay);
        });
      }
    });
  });
};

// 初期読み込み時
$(function () {
  bindInviewAnimationRowList();
  bindInviewAnimationCardList();
});
/* -- /inview -- */


/* -- ScrollHint -- *
new ScrollHint('.tableArea', {
  suggestiveShadow: true,
  remainingTime: 5000,
  i18n: {
    scrollable: 'スクロールできます'
  }
});
* -- /ScrollHint -- */


/* -- PageScroll -- */
$(function () {
  const anchorsNav = document.querySelector('.anchors');
  const navItems = document.querySelectorAll('.anchors li');
  const mainArea = document.querySelector('main');
  const mainTop = mainArea.getBoundingClientRect().top + window.scrollY;
  const prevBtn = document.querySelector('.anchors .prev');
  const nextBtn = document.querySelector('.anchors .next');

  // 選択状態を更新する関数（余裕を持たせた判定）
  function updateSelectedNav() {
    let currentSection = null;
    document.querySelectorAll('main section').forEach(section => {
      const offsetTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionBottom = offsetTop + section.offsetHeight;
      const buffer = 500; // ← 余裕幅を広げて判定を安定化
      if (window.scrollY >= offsetTop - buffer && window.scrollY < sectionBottom - buffer) {
        currentSection = section;
      }
    });

    if (currentSection) {
      const sectionClass = [...currentSection.classList].find(cls => cls.endsWith('-section'));
      if (sectionClass) {
        const targetClass = sectionClass.replace('-section', '');
        navItems.forEach(li => {
          li.classList.remove('selected');
          if (li.classList.contains(targetClass)) {
            li.classList.add('selected');
          }
        });

        // 前後ボタンの表示制御（visibility + pointer-events）
        const current = document.querySelector('.anchors li.selected');
        const prev = current?.previousElementSibling;
        const next = current?.nextElementSibling;

        if (prev && prev.tagName === 'LI') {
          prevBtn.style.visibility = 'visible';
          prevBtn.style.pointerEvents = 'auto';
        } else {
          prevBtn.style.visibility = 'hidden';
          prevBtn.style.pointerEvents = 'none';
        }

        if (next && next.tagName === 'LI') {
          nextBtn.style.visibility = 'visible';
          nextBtn.style.pointerEvents = 'auto';
        } else {
          nextBtn.style.visibility = 'hidden';
          nextBtn.style.pointerEvents = 'none';
        }
      }
    }
  }

  // スクロールイベントでナビ固定と選択状態を更新
  window.addEventListener('scroll', () => {
    if (window.scrollY >= mainTop) {
      anchorsNav.classList.add('fixed');
    } else {
      anchorsNav.classList.remove('fixed');
    }
    updateSelectedNav();
  });

  // ページ内スクロール（クリック時）
  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const targetClass = item.classList[0];
      const targetSection = document.querySelector(`.${targetClass}-section`);
      if (targetSection) {
        const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY;
        const adjust = (index % 2 === 1) ? 250 : 100;
        window.scrollTo({
          top: offsetTop - adjust,
          behavior: 'smooth'
        });
        setTimeout(updateSelectedNav, 700); // スクロール完了後に再判定
      }
    });
  });

  // 「前へ」ボタン
  document.querySelector('.anchors .prev').addEventListener('click', () => {
    const current = document.querySelector('.anchors li.selected');
    const prev = current?.previousElementSibling;
    if (prev && prev.tagName === 'LI') {
      const targetClass = prev.classList[0];
      const targetSection = document.querySelector(`.${targetClass}-section`);
      if (targetSection) {
        const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY;
        const index = Array.from(navItems).indexOf(prev);
        const adjust = (index % 2 === 1) ? 250 : 100;
        window.scrollTo({
          top: offsetTop - adjust,
          behavior: 'smooth'
        });
        setTimeout(updateSelectedNav, 700);
      }
    }
  });

  // 「次へ」ボタン
  document.querySelector('.anchors .next').addEventListener('click', () => {
    const current = document.querySelector('.anchors li.selected');
    const next = current?.nextElementSibling;
    if (next && next.tagName === 'LI') {
      const targetClass = next.classList[0];
      const targetSection = document.querySelector(`.${targetClass}-section`);
      if (targetSection) {
        const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY;
        const index = Array.from(navItems).indexOf(next);
        const adjust = (index % 2 === 1) ? 250 : 100;
        window.scrollTo({
          top: offsetTop - adjust,
          behavior: 'smooth'
        });
        setTimeout(updateSelectedNav, 700);
      }
    }
  });
});
/* -- /PageScroll -- */


/* -- LanguageBarArea -- */
$(function () {
  let headerTag = null;
  let buttonMenu = null;

  function checkHeaderAndTranslateBar() {
    // インクルードされた要素がまだ読み込まれていない場合は再取得
    if (!headerTag) headerTag = document.querySelector('#header header');
    if (!buttonMenu) buttonMenu = document.querySelector('#header .btn_menu');
    if (!headerTag || !buttonMenu) return;

    // 翻訳バーの検出
    const bars = document.querySelectorAll('div.skiptranslate');
    for (const bar of bars) {
      const iframe = bar.querySelector('iframe.skiptranslate');
      if (iframe && bar.getAttribute('style') === '') {
        // 翻訳バーが表示されたとき
        headerTag.style.top = '40px';
        buttonMenu.style.top = '40px';
        return;
      }
    }

    // 翻訳バーが消えたとき
    headerTag.style.top = '';
    buttonMenu.style.top = '';
  }

  // 1秒ごとにチェック
  setInterval(checkHeaderAndTranslateBar, 1000);
});
/* -- /LanguageBarArea -- */


/* -- Game Button -- */
$(function () {
  let timeout;
  window.addEventListener('scroll', function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const gameSection = document.querySelector('#Game');
      const floatingButton = document.querySelector('.floating_link a');
      if (!gameSection || !floatingButton) return;

      const rect = gameSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      floatingButton.classList.toggle('slide-out', isVisible);
      floatingButton.classList.toggle('slide-in', !isVisible);
    }, 100);
  });
});
/* -- /Game Button -- */