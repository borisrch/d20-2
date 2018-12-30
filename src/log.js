import Globals from './globals';

const styleHandler = function (style) {
  if (Globals.ui === 'light') {
    switch (style) {
      case 'mb':
        return 'log log-monster-basic-light animated slideInDown';
      case 'ms':
        return 'log log-monster-spell-light animated bounceIn';
      case 'miss':
        return 'log log-miss animated slideInDown';
      case 'miss-player':
        return 'log log-player-miss animated slideInDown';
      case 'info':
        return 'log log-info animated slideInDown';
      case 'victory':
        return 'log log-victory animated bounceInDown';
      case 'defeat':
        return 'log log-defeat animated bounceInDown';
      case 'pb':
        return 'log log-player-basic-light animated slideInDown';
      case 'ps':
        return 'log log-player-spell-light animated bounceIn';
      case 'ps-scorch':
        return 'log log-player-spell-light animated tada';
      case 'ps-thunder':
        return 'log log-player-spell-light animated flash';
      case 'ps-grasp':
        return 'log log-player-spell-light animated swing';
      case 'ps-echoes':
        return 'log log-player-spell-light animated slideInDown';
      default:
        throw new Error('Log message not recognized.');
    }
  } else {
    switch (style) {
      case 'mb':
        return 'log log-monster-basic animated slideInDown';
      case 'ms':
        return 'log log-monster-spell animated bounceIn';
      case 'miss':
        return 'log log-miss animated slideInDown';
      case 'miss-player':
        return 'log log-player-miss animated slideInDown';
      case 'info':
        return 'log log-info animated slideInDown';
      case 'victory':
        return 'log log-victory animated bounceInDown';
      case 'defeat':
        return 'log log-defeat animated bounceInDown';
      case 'pb':
        return 'log log-player-basic animated slideInDown';
      case 'ps':
        return 'log log-player-spell animated bounceIn';
      case 'ps-scorch':
        return 'log log-player-spell animated tada';
      case 'ps-thunder':
        return 'log log-player-spell animated flash';
      case 'ps-grasp':
        return 'log log-player-spell animated swing';
      case 'ps-echoes':
        return 'log log-player-spell animated slideInDown';
      default:
        throw new Error('Log message not recognized.');
    }
  }
};

export const log = function(message, style) {
  let logStyle = styleHandler(style);
  let logSize = $('.list').children().length;
  let logMessage = '<li>' + message + '</li>';
  let prepared = $(logMessage).addClass(logStyle);  
  if (logSize < 5) {    
    $('ul.list').prepend(prepared);
  }
  else {
    $('.list li').last().remove();
    $('ul.list').prepend(prepared);
  }
}

export const clearLog = () => {
  $('.list').empty();
};
