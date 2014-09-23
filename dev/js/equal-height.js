$.fn.eqHeights = function(options) {
    var defaults = {
        child: false,
        parentSelector: null
    };
    var opt = $.extend(defaults, options);
    var el = $(this);
    if (el.length > 0 && !el.data('eqHeights')) {
        $(window).bind('resize.eqHeights', function() {
            el.eqHeights();
        });
        el.data('eqHeights', true);
    }
    var elmtns = '';

    if (opt.child && opt.child.length > 0) {
        elmtns = $(opt.child, this);
    } else {
        elmtns = $(this).children();
    }

    var prevTop = 0;
    var max_height = 0;
    var elements = [];
    var parentEl;
    elmtns.height('auto').each(function() {

        if (opt.parentSelector && parentEl !== $(this).parents(opt.parentSelector).get(0)) {
            $(elements).height(max_height);
            max_height = 0;
            prevTop = 0;
            elements = [];
            parentEl = $(this).parents(opt.parentSelector).get(0);
        }

        var thisTop = this.offsetTop;

        if (prevTop > 0 && prevTop != thisTop) {
            $(elements).height(max_height);
            max_height = $(this).height();
            elements = [];
        }
        max_height = Math.max(max_height, $(this).height());

        prevTop = this.offsetTop;
        elements.push(this);
    });

    $(elements).height(max_height);
};

// run on load so it gets the size:
// can't have the same pattern for some reason or it scans the page and makes all the same height. Each row should be separate but it doesn't work that way.
$(window).load(function() {

    $('[class*="eq-"]').eqHeights({
        parentSelector: '.equal '
    });

});