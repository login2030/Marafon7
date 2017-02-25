window.addEventListener('load', function() {
	// $('#container > div').draggable({
	// 	axis: "y"
	// });

	$(window).click(function(e) {
		var $el = $(e.target);
		
		if ($el.attr('data-href')) {
			$('html, body').stop().animate({
				scrollTop: $($el.attr('data-href')).offset().top
			}, 1200);
		}
	});
});