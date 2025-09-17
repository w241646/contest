// JavaScript Document
/* List */
function review_list(callback, append, loop){
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

                var image = "";
                if(json[i].img){
                    image = '<figure class="faceicon"><img class="img" src="' + json[i].img + '" /></figure>'
                } else {
                    image = ''
                }

                var name = "";
                if(json[i].name){
                    name = '<p class="rev-name">' + json[i].name + ' さん <small>(' + json[i].age + '代・' + json[i].gender + ')</small></p>'
                } else {
                    name = '<p class="rev-name">サイクリスト さん <small>(' + json[i].age + '代・' + json[i].gender + ')</small></p>'
                }

                var list = "";
                if(json[i].note){
                    list = '<div class="rev-box flexBox" data-rating="' + json[i].rate + '">' + image + name +'<p class="stars"></p><b class="title">' + json[i].title + '</b><p class="note">' + json[i].note + '</p></div>';
                } else {
                    list = '';
                }
   				$(append).append(list);
                renderRatings();
   			}
            bindInviewAnimationCardList();
		}
    })
};