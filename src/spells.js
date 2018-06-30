import Stats from './stats';
import { roll, attack, bonus } from './rollattack';
import { log } from './log';
import { DEV } from './dev';

export const scorch = function() {

  let base = roll(2);   
  let bonusRes = bonus(Stats.playerRunic, 2);
  let total = base + bonusRes;

  if(DEV) {
    console.log('Scorch base AC-ignore roll: ' + base);
    console.log('Scorch bonus AC-ignore roll: ' + bonusRes);
  }

  let result = attack(10, 0, 0, 1, Stats.monsterArmour - total);

  if(result != null) {
    monsterTurnHandler();
  }

}

