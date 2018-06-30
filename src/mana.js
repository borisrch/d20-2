import Stats from './stats';
import { log } from './log';
import { DEV } from './dev';

setTimeout(() => {

}, )

export const manaCheck = function(cost, spellCallback) {
  if(DEV) {
    console.log('mana: ' + Stats.playerMana + ' cost: ' + cost);
  }
  
  if (Stats.playerMana < cost) {
    log('Not enough PP to cast.', 'pb');
  } else {    
    spellCallback();
  }
}