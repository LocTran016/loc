const searchToggle = (obj, evt) => {
  const container = $(obj).closest('#search-wrapper');
  const icon = $(obj).closest('#search-icon')
  if (!container.hasClass('active')) {
    container.addClass('active');
    icon.addClass('search-icon')
    evt.preventDefault();
  } else if (container.hasClass('active') && $(obj)
      .closest('#input-holder').length == 0) {
    container.removeClass('active');
    icon.removeClass('search-icon')
    // clear input
    container.find('#search-input').val('');
    // clear and hide result container when we press close
    container.find('#result-container').fadeOut(100, () => {
      $(this).empty();
    });
  }
}
/* const submitFn = (obj, evt) => {
  value = $(obj).find('#search-input').val().trim().toLowerCase();
  _html = 'Searching for: ';
  if (!value.length) {
    _html = 'Ehem, I can\'t search nothing';
  } else {
    _html += '<b>' + value + '</b>';
  }
  $(obj).find('#result-container').html('<span>' + _html + '</span>');
  $(obj).find('#result-container').fadeIn(100);
  evt.preventDefault();
} */