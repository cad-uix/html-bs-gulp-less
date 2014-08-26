(function($){

  $.fn.slideMenu = function() {
    var target = $(this).attr('data-target');
    var direction = $(this).attr('data-direction');
    var body = '#page-wrap';

    $(target).addClass(direction);
    $(this).addClass(direction);
    $(body).addClass(direction);

	$(this).click( function() {
    	$(target).toggleClass('move');
    	$(body).toggleClass('move');
    	return false;
	});
  }
})(jQuery);

$('.slide-menu-toggle').slideMenu();