(function($) {
	$(document).ready(function() {
	var list = "#navigation li";

	$(list).each(function(index) {
		var link = $(this).find("a");
		$(this).attr("title",String(index)+". "+$(link).text());
	});

	function slide(index) {
		var current = $("#status .index").text();
		if (index === undefined) {
			return current;
		}
		if (index === NaN || index < 0) {
			index = 0;
		}
		var max = $(list).index($(list+":last"));
		if (index > max) {
			index = max;
		}
		var last = $(list+":eq("+current+")");
		last.removeClass("selected");

		var item = $(list+":eq("+index+")");
		item.addClass("selected");
		item.addClass("visited");

		var link = $(list+":eq("+index+") a");
		var url = $(link).attr("href");

		$("#status .index").text(index);
		$("#status a.title").text($(link).text());
		$("#status a.title").attr("href",url);
		$("#status a.title").attr("title",url);
		$("#display").attr("src",url);
		window.location.hash = index;
	}

	$(list).click(function() {
		slide($(list).index(this));
	});

	$("#navigation .next").click(function() {
		slide(parseInt(slide())+1);
	});

	$("#navigation .prev").click(function() {
		slide(parseInt(slide())-1);
	});

	$(document).bind("keydown","nav",function(event) {
		switch (event.keyCode) {
		case 8:
		case 37:
			slide(parseInt(slide())-1);
			break;
		case 14:
		case 32:
		case 39:
			slide(parseInt(slide())+1);
			break;
		}
	});
	var initial = window.location.hash ?  parseInt(window.location.hash.match(/\d+/g)[0]): 0;
	slide(initial);
});
})(jQuery);
