var buttonHover = function() {
    $('.deeper-button').each(function() {

        $(this).mouseenter(function(e) {
           var parentOffset = $(this).offset(); 
          
           var relX = e.pageX - parentOffset.left;
           var relY = e.pageY - parentOffset.top;
           $(this).find('.hover-effect').css({"left": relX, "top": relY });
        });

        $(this).mouseleave(function(e) {

             var parentOffset = $(this).offset(); 

             var relX = e.pageX - parentOffset.left;
             var relY = e.pageY - parentOffset.top;
             $(this).find('.hover-effect').css({"left": relX, "top": relY });
        });
    })
}

buttonHover();


var fly = function() {
    $('#scroll-top').on('click', function() {
        $(this).addClass('flyout');
    })
}

fly();


