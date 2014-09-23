// <div id="slide-menu"></div>
// <button type="button" class="slide-menu-toggle" data-direction="right" data-target="#slide-menu">
//   <i class="fa fa-reorder"></i>
// </button>

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
  };
})(jQuery);

$('.slide-menu-toggle').slideMenu();