/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
document.querySelector('#fullScreenButton')
    .addEventListener('click', fullScreen);

function fullScreen() {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  } else {
    alert('Your browser doesn\'t support full screen');
  }
  if (screenfull.isEnabled) {
    screenfull.on('change', () => {
      console.log('Am I fullscreen?',
          screenfull.isFullscreen ? 'Yes' : 'No');
    });
  }
};

