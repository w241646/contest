// JavaScript Document

/* -- arctext -- */
$(function () {
  $('#txt_radius1').arctext({radius: 100});
});
/* -- /arctext -- */


/* -- inview -- */
$(function(){
  $(".inview").on("inview", function (event, isInView) {
    if (isInView) {
      $(this).stop().addClass("is-show");
    }
  });
});


/* -- inview - talk -- */
$(function() {
  $(".inview_re").on("inview",function(event,isInView,visiblepartX,visiblepartY) {
    if(isInView){
      $(this).stop().addClass("is-show");
    }
  });
});

/* -- inview - row_list -- */
function bindInviewAnimationRowList() {
  $(".row_list").each(function () {
    const $row = $(this);
    const $items = $row.find("dl");

    $row.off("inview").on("inview", function (event, isInView) {
      if (isInView) {
        $items.each(function (index) {
          const delay = index * 300;
          const $this = $(this);
          setTimeout(function () {
            $this.addClass("inview");
          }, delay);
        });
      }
    });
  });
}

// 初期読み込み時
$(function () {
  bindInviewAnimationRowList();
});


/* -- inview - card-list -- */
function bindInviewAnimationCardList() {
  $(function () {
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
}

// 初期読み込み時
$(function () {
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