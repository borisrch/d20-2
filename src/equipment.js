import Stats from './stats';

export const selectWeapon = function(weapon) {
  switch(weapon) {
    case 'oak-wand':
    Stats.playerRunic = 2;
    break;

    case 'Ebony Wand':
    Stats.playerRunic = 3;
    break;

    default:
    Stats.playerRunic = 2;
    break;
  }
}