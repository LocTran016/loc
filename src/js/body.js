/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
document.querySelector('#fullScreenButton')
    .addEventListener('click', fullScreen);

function fullScreen() {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  document.querySelector('#fullscreen').removeAttribute('class');
document.querySelector('#fullscreen').setAttribute('class', screenfull.isFullscreen ? 
          'bi bi-fullscreen':'bi bi-fullscreen-exit');
          
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

