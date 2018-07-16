export const disable = function () {
  $('.basic-attack').prop('disabled', true);
  $('.q').prop('disabled', true);
  $('.w').prop('disabled', true);
  $('.e').prop('disabled', true);
  $('.r').prop('disabled', true);
  $('#equipment-weapon').prop('disabled', true);
  $('#equipment-amulet').prop('disabled', true);
  $('#equipment-trinket').prop('disabled', true);
  $('#equipment-shop').prop('disabled', true);
};

export const enable = function () {
  $('.basic-attack').prop('disabled', false);
  $('.q').prop('disabled', false);
  $('.w').prop('disabled', false);
  $('.e').prop('disabled', false);
  $('.r').prop('disabled', false);
  $('#equipment-weapon').prop('disabled', false);
  $('#equipment-amulet').prop('disabled', false);
  $('#equipment-trinket').prop('disabled', false);
  $('#equipment-shop').prop('disabled', false);
};