import '../../scss/button.scss';
"use strict";

/* Button Hover */
var buttonHover = () => {
    $('.deeper-button').each(() => {

        $(this).mouseenter((e) => {
           var parentOffset = $(this).offset(); 
          
           var relX = e.pageX - parentOffset.left;
           var relY = e.pageY - parentOffset.top;
           $(this).find('.hover-effect').css({"left": relX, "top": relY });
        });

        $(this).mouseleave((e) => {

             var parentOffset = $(this).offset(); 

             var relX = e.pageX - parentOffset.left;
             var relY = e.pageY - parentOffset.top;
             $(this).find('.hover-effect').css({"left": relX, "top": relY });
        });
    })
}

/* Scroll To Top Button */
var fly = () => {
    $('#scroll-top').click(() => {
        $(this).addClass('flyout');
    })
}

/****** Full Screen Button *******/
var fullScreen = () => {$(document).ready(() => {
    $('#fullScreenButton')
        .click(() => {
          if (screenfull.isEnabled) {
            screenfull.toggle();
            $('#fullscreen').removeAttr('class');
            $('#fullscreen').attr('class',
    screenfull.isFullscreen ? 'bi bi-fullscreen':'bi bi-fullscreen-exit');
          } else {
            alert('Your browser doesn\'t support full screen');
          }
          if (screenfull.isEnabled) {
            screenfull.on('change', () => {
              console.log('Am I fullscreen?',
            screenfull.isFullscreen ? 'Yes' : 'No');
            });
          }
        });
  });}

buttonHover();
fullScreen();
fly();
  
  


