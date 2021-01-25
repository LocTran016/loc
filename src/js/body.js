/* eslint-disable linebreak-style */
document.getElementById('fullScreenButton').addEventListener('click',
    function fullScreenButton() {
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
    });

