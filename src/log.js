const styleHandler = function(style) {
  switch(style) {
    // Monster basic
    case 'mb':
    return 'log log-monster-basic animated slideInDown';

    case 'ms':
    return 'log log-monster-spell animated bounceIn';

    case 'miss':
    return 'log log-miss animated slideInDown';

    case 'miss-player':
    return 'log log-player-miss animated slideInDown';

    case 'pb':
    return 'log log-player-basic animated slideInDown';

    default:
    console.log('Error in styleHandler');
    break;
  }
}

export const log = function(message, style) {
  let logStyle = styleHandler(style);
  let logSize = $('.list').children().length;
  let logMessage = '<li>' + message + '</li>';
  let prepared = $(logMessage).addClass(logStyle);  
  if (logSize < 8) {    
    $('ul.list').prepend(prepared);
  }
  else {
    $('.list li').last().remove();
    $('ul.list').prepend(prepared);
  }

}