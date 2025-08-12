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

                var caption = "";
                if(json[i].cap){
                    caption = '<span class="caption">' + json[i].cap + '</span>'
                } else {
                    caption = ''
                }

                var price = "";
                if(json[i].price){
                    price = '<p class="price">' + json[i].price + '<span>円</span></p>'
                } else {
                    price = ''
                }

                if(json[i].title){
                    list = '<dl><dt><b>' + json[i].title + '</b></dt><dd><p>' + json[i].text + '</p></dd></dl>';
                } else {
                    list = '';
                }
   				$(append).append(list);
   			}
		}
    })
};