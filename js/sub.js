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


/* -- breadcrumb -- */
function generateBreadcrumbs() {
  const breadcrumbContainer = document.getElementById("breadcrumb");
  const pathArray = window.location.pathname.split("/").filter(Boolean);
  const currentLabel = getMainTextFromH2();

  let breadcrumbHTML = `<a href="/">Home</a>`;
  let path = "";
  pathArray.forEach((segment, index) => {
    path += `/${segment}`;
    if (index === pathArray.length - 1) {
      breadcrumbHTML += ` &gt; <span>${currentLabel}</span>`;
    } else {
      breadcrumbHTML += ` &gt; <a href="${path}">${decodeURIComponent(segment)}</a>`;
    }
  });

  breadcrumbContainer.innerHTML = breadcrumbHTML;
}
window.addEventListener("DOMContentLoaded", generateBreadcrumbs);

// h2の対象の文字を抽出
function getMainTextFromH2() {
  const h2 = document.querySelector("h2");
  if (!h2) return null;

  // h2の子ノードを走査して、テキストノードだけを抽出
  const textParts = Array.from(h2.childNodes)
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.textContent.trim())
    .filter(text => text.length > 0);

  // 複数ある場合は2番目を取得（今回の構造に合わせて）
  return textParts[1] || textParts[0] || "現在地";
}
/* -- /breadcrumb -- */