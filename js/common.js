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


/* -- loading -- */
$(function () {
  var webStorage = function () {
    if (sessionStorage.getItem('access')) {
      /* 2回目以降アクセス時の処理 */
      $(".loading").addClass('is-active');
    } else {
      /* 初回アクセス時の処理 */
      sessionStorage.setItem('access', 'true'); // sessionStorageにデータを保存
      $(".loading-animation").addClass('is-active'); // loadingアニメーションを表示
      setTimeout(function () {
        // ローディングを数秒後に非表示にする
        $(".loading").addClass('is-active');
        $(".loading-animation").removeClass('is-active');
      }, 2000); // ローディングを表示する時間
    }
  }
  webStorage();
});
/* -- /loading -- */


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
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", generateBreadcrumbs);
} else {
  setTimeout(generateBreadcrumbs, 100);
}

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


/* -- adjustFixedLangPosition -- */
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
/* -- /adjustFixedLangPosition -- */
