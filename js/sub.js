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
$(function bindInviewAnimationRowList() {
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
});

// card-list のアニメーション処理
$(function bindInviewAnimationCardList() {
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
});

// 初期読み込み時
$(function () {
  bindInviewAnimationRowList();
  bindInviewAnimationCardList();
});
/* -- /inview -- */


/* -- ScrollHint -- */
new ScrollHint('.tableArea', {
  suggestiveShadow: true,
  remainingTime: 5000,
  i18n: {
    scrollable: 'スクロールできます'
  }
});
/* -- /ScrollHint -- */