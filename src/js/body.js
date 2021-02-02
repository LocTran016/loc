/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
$(document).ready(() => {
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
});
function searchToggle(obj, evt) {
  const container = $(obj).closest('#search-wrapper');

  if (!container.hasClass('active')) {
    container.addClass('active');
    evt.preventDefault();
  } else if (container.hasClass('active') && $(obj)
      .closest('#input-holder').length == 0) {
    container.removeClass('active');
    // clear input
    container.find('#search-input').val('');
    // clear and hide result container when we press close
    container.find('#result-container').fadeOut(100, function() {
      $(this).empty();
    });
  }
}

function submitFn(obj, evt) {
  value = $(obj).find('#search-input').val().trim();

  _html = 'Searching for: ';
  if (!value.length) {
    _html = 'Ehem, I can\'t search nothing';
  } else {
    _html += '<b>' + value + '</b>';
  }

  $(obj).find('#result-container').html('<span>' + _html + '</span>');
  $(obj).find('#result-container').fadeIn(100);

  evt.preventDefault();
}

