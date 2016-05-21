$('.smooth').on('click', function() {
    $.smoothScroll({
        scrollElement: $('body'),
        scrollTarget: '#' + this.id
    });
    
    return false;
});




$(document).ready( function() {
    $('.subMenu').smint({
    	'scrollSpeed' : 1000
    });
    
    $portfolio.waypoint(function() {
        notify("waypoint hit");
    });
});


