// JavaScript Document

/* -- PageTop -- */ 
$(function() {
    var showFlag = false;
    var topBtn = $('#PageTop');   
    topBtn.css('bottom', '-135px');
    var showFlag = false;
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            if (showFlag == false) {
                showFlag = true;
                topBtn.stop().animate({'bottom' : '10px'}, 200);
            }
        } else {
            if (showFlag) {
                showFlag = false;
                topBtn.stop().animate({'bottom' : '-135px'}, 200);
            }
        }
    });
    //スクロールしてトップ
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});

$(function(){
    $('a[href^="#"]').click(function(){ 
        var speed = 1000; //移動完了までの時間(sec)を指定
        var href= $(this).attr("href"); 
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = (target.offset().top - 70);
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });
});
/* -- /PageTop -- */ 


/* -- btn_menu -- */
jQuery(function($) {
    $('.btn_menu').click(function() {
        $(this).toggleClass('active');
        $('.bg').fadeToggle();
        $('#hamMenu nav').toggleClass('open');
        // $('body').css('position', 'fixed');
        $('nav.anchors').fadeToggle();
        $('.mainVI .mVI_txt').toggle();
    })
    $('.ham_list a').click(function() {
        $('.bg').fadeToggle();
        $('.btn_menu').removeClass('active');
        $('#hamMenu nav').removeClass('open');
        // $('body').css('position', 'fixed');
    })
    $('.bg').click(function() {
        $(this).fadeOut();
        $('.btn_menu').removeClass('active');
        $('#hamMenu nav').removeClass('open');
        // $('body').css('position', 'static');
    })
})
/* -- /btn_menu -- */


/* -- menu_link -- */
$(function () {
  $(window).on("load scroll resize", function () {
    var st = $(window).scrollTop();
    var wh = $(window).height();
    $('.sec-scroll-point').each(function (i) {
      var tg = $(this).offset().top;
      var id = $(this).attr('id');

      var tg2 = $('.sec-scroll-point').first().offset().top;
      if (st < (tg2 - 100)) {
        $(".f__link").removeClass("is-active");
      } else if (st > tg  - wh + (wh / 2)) {
        $(".f__link").removeClass("is-active");
        var link = $(".f__link[href *= " + id +"]");
        $(link).addClass("is-active");
      }  
    });
  });
});
/* -- /menu_link -- */


/* -- underLine -- */
$(function () {
  $(window).on('scroll',function(){
    $(".u_line").each(function(){
      var position = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > position - windowHeight){
        $(this).addClass('animeLine');
      }
    });
  });
});
/* -- /underLine -- */


/* -- breadcrumb -- */
function generateBreadcrumbs() {
  const breadcrumbContainer = document.getElementById("breadcrumb");

  // 要素が存在しない場合は何もしない
  if (!breadcrumbContainer) return;

  // TOPページ（ルートパスまたは index.html）なら何もしない
  const path = window.location.pathname;
  if (path === "/" || path === "/index.html") return;

  const pathArray = path.split("/").filter(Boolean);
  const currentLabel = getMainTextFromH2() || "現在地";

  let breadcrumbHTML = `<a href="/">Home</a>`;
  let accumulatedPath = "";
  pathArray.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;
    if (index === pathArray.length - 1) {
      breadcrumbHTML += ` &gt; <span>${currentLabel}</span>`;
    } else {
      breadcrumbHTML += ` &gt; <a href="${accumulatedPath}">${decodeURIComponent(segment)}</a>`;
    }
  });

  breadcrumbContainer.innerHTML = breadcrumbHTML;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", generateBreadcrumbs);
} else {
  setTimeout(generateBreadcrumbs, 100);
}

// h2の対象の文字を抽出
function getMainTextFromH2() {
  const h2 = document.querySelector("h2");
  if (!h2) return null;

  const textParts = Array.from(h2.childNodes)
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.textContent.trim())
    .filter(text => text.length > 0);

  return textParts[1] || textParts[0] || "現在地";
}
/* -- /breadcrumb -- */


/* -- adjustFixed_LangPosition -- */
function adjustFixedLangPosition() {
  const footer = document.querySelector('footer');
  const fixedElement = document.querySelector('#Lang');
  const footerTop = footer.getBoundingClientRect().top;
  if (footerTop < window.innerHeight) {
    fixedElement.classList.add('hidden');
  } else {
    fixedElement.classList.remove('hidden');
  }
}

// スマホサイズのみでイベント登録
if (window.innerWidth <= 600) {
  window.addEventListener('scroll', adjustFixedLangPosition);
}
/* -- /adjustFixed_LangPosition -- */


/* -- ShowMoreToList -- */
window.addEventListener('load', function () {
  const targetNodes = document.querySelectorAll('.moreList');
  const initialCount = 4;
  const maxAttempts = 60;
  const intervalMs = 500;

  targetNodes.forEach((targetNode, index) => {
    let attemptCount = 0;

    const checkAndSetup = () => {
      const dlElements = targetNode.querySelectorAll('dl');

      if (dlElements.length >= initialCount) {
        // 初期状態：initialCount未満は表示＆inview付与、それ以外は非表示＆inview除去
        dlElements.forEach((dl, i) => {
          if (i < initialCount) {
            dl.style.display = '';
            dl.classList.add('inview');
          } else {
            dl.style.display = 'none';
            dl.classList.remove('inview');
          }
        });

        // ボタンが未生成なら追加
        if (!targetNode.querySelector('.showMoreBtn')) {
          const btn = document.createElement('button');
          btn.className = 'showMoreBtn';
          btn.textContent = 'もっと見る';

          btn.addEventListener('click', function () {
            const hiddenItems = Array.from(dlElements).slice(initialCount);
            hiddenItems.forEach(dl => {
              dl.style.display = 'block';
              dl.classList.remove('inview');
            });

            setTimeout(() => {
              hiddenItems.forEach(dl => {
                dl.classList.add('inview');
              });
            }, 50);

            btn.style.display = 'none';
          });

          targetNode.appendChild(btn);
        }

        clearInterval(retryTimer);
      }

      attemptCount++;
      if (attemptCount >= maxAttempts) {
        clearInterval(retryTimer);
        console.warn('DL要素の生成が確認できませんでした');
      }
    };

    const retryTimer = setInterval(checkAndSetup, intervalMs);
  });
});
/* -- /ShowMoreToList -- */