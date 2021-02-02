"use strict";

/* eslint-disable linebreak-style */

/* eslint-disable require-jsdoc */
$(document).ready(() => {
  $('#fullScreenButton').click(() => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      $('#fullscreen').removeAttr('class');
      $('#fullscreen').attr('class', screenfull.isFullscreen ? 'bi bi-fullscreen' : 'bi bi-fullscreen-exit');
    } else {
      alert('Your browser doesn\'t support full screen');
    }

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        console.log('Am I fullscreen?', screenfull.isFullscreen ? 'Yes' : 'No');
      });
    }
  });
});