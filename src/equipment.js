import Stats from './stats';

export const selectWeapon = function(weapon) {
  switch(weapon) {
    case 'oak-wand':
    Stats.playerRunic = 2;

    default:
    Stats.playerRunic = 2;
  }
}