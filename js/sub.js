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
/* -- /inview -- */

/* -- inview - talk -- */
$(function() {
  $(".inview_re").on("inview",function(event,isInView,visiblepartX,visiblepartY) {
    if(isInView){
      $(this).stop().addClass("is-show");
    }
  });
});
/* -- /inview - talk -- */

/* -- ScrollHint -- */
new ScrollHint('.tableArea', {
  suggestiveShadow: true,
  remainingTime: 5000,
  i18n: {
    scrollable: 'スクロールできます'
  }
});
/* -- /ScrollHint -- */