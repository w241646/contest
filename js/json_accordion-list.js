// JavaScript Document
/* Accordion List */
function accordionli(callback, append, loop){
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
				if(json[i].title) {
					list = '<dt class="ac-parent"><p>' + json[i].title + '</p></dt><dd class="ac-child"><p>' + json[i].text + '</p></dd>';
				} else {
					list = '';
				}
				$(append).append(list);
			}
			$(append + ' .ac-parent').on('click', function () {
				$(this).next().slideToggle();
				//openクラスをつける
				$(this).toggleClass("open");
			});
		}
    })
};