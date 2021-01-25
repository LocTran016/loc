/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
document.querySelector('#fullScreenButton')
    .addEventListener('click', fullScreen);

function fullScreen() {
  if (screenfull.isEnabled) {
    screenfull.toggle();
    if (screenfull.isFullscreen) {
      document.querySelector('#fullscreen').removeAttribute('class');
      document.querySelector('#fullscreen').setAttribute('class',
          'bi bi-fullscreen');
    } else {
      document.querySelector('#fullscreen').removeAttribute('class');
      document.querySelector('#fullscreen').setAttribute('class',
          'bi bi-fullscreen-exit');
    }
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

