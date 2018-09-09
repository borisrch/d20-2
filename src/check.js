import Stats from './stats';
import { log } from './log';
import { DEV } from './dev';

export const manaCheck = function(cost, spellCallback) {
  if(DEV) {
    console.log('mana: ' + Stats.playerMana + ' cost: ' + cost);
  }
  
  if (Stats.playerMana < cost) {
    log('Not enough mana!', 'info');
  } else {    
    spellCallback();
  }
}

export const costCheck = (cost, buyPotion, potionName) => {
  if (Stats.gold < cost) {
    log (`Not enough gold to buy ${potionName}`);
  }
  else {
    Stats.gold = Stats.gold - cost;
    buyPotion();
  }
}