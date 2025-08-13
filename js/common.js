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
/* -- underLine -- */