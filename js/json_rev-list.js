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
//            alert("ロード失敗");
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

                var list = "";
                if(json[i].name){
                    list = '<div class="rev-box flexBox" data-rating="' + json[i].rate + '">' + image + '<p class="rev-name">' + json[i].name + ' さん</p><p class="stars"></p><p class="note">' + json[i].note + '</p></div>';
                } else {
                    list = '';
                }
   				$(append).append(list);
                bindInviewAnimationRowList();
                renderRatings();
   			}
		}
    })
};