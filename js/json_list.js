// JavaScript Document
/* List */
function list(callback, append, loop){
var list = "";
    $.ajax({
        url: './js/json/' + callback + '.jsonp',
        type:"GET",
        dataType:"jsonp",
        jsonpCallback: callback,
        error:function() {
            // alert("ロード失敗");
        },
        success: function(json){
    	 	var len = json.length;

            var display_num = "";
            if(loop) {
                var display_num = loop;
            } else {
                var display_num = len;
            }

            for(var i=0; i < display_num; i++){

                var caption = "";
                if(json[i].cap){
                    caption = '<span class="caption">' + json[i].cap + '</span>'
                } else {
                    caption = ''
                }

                var tags = "";
                if (json[i].tag && Array.isArray(json[i].tag)) {
                    tags = '<ul class="tags">';
                    for (var j = 0; j < json[i].tag.length; j++) {
                        tags += '<li>' + json[i].tag[j] + '</li>';
                    }
                    tags += '</ul>';
                } else {
                    tags = "";
                }

                var image = "";
                if (json[i].image) {
                    image = '<div class="image"><img src="' + json[i].image + '" alt="' + json[i].title + '"></div>';
                } else {
                    image = "";
                }

                var images = "";
                if (json[i].images && Array.isArray(json[i].images)) {
                    images = '<ul class="images">';
                    for (var j = 0; j < json[i].images.length; j++) {
                        images += '<li><a href="' + json[i].images[j] + '" data-lightbox="gallery' + i + '" data-title="' + json[i].title + '"><img src="' + json[i].images[j] + '" alt="' + json[i].title + '"></a></li>';
                    }
                    images += '</ul><p class="annotation">※ 画像をクリック／タップで拡大</p>';
                } else {
                    images = "";
                }

                if(json[i].title){
                    list = '<dl><dt><b>' + json[i].title + '</b>' + image + tags + '</dt><dd><p>' + json[i].text + '</p>' + images + '</dd></dl>';
                } else {
                    list = '';
                }
   				$(append).append(list);
   			}
            bindInviewAnimationRowList();
		}
    })
};