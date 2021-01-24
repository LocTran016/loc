/* eslint-disable linebreak-style */
document.getElementById('fullScreenButton').addEventListener('click',
    function() {
      if (screenfull.isEnabled) {
        screenfull.request();
      } else {
        screenfull.exit();
      }
      if (screenfull.isEnabled) {
        screenfull.on('change', () => {
          console.log('Am I fullscreen?',
          screenfull.isFullscreen ? 'Yes' : 'No');
        });
      }
    });

