import { log } from './log';
import { roll, attack } from './rollattack';
import { DEV } from './dev';

export const goblin = {
  monsterArmour: 15,
  monsterDamage: 4,
  monsterRage: 0,
  monsterTurnAttack() {
    let result = roll(100);
    
    if(DEV) {
      console.log('Goblin Abilty Chance ' + result)
    }

    if (result > 75) {      
      this.goblinSpit();
    } else {
      this.basicAttack();
    }
  },
  basicAttack() {
    let result = attack(this.monsterDamage, 0, 0, 1, playerArmour);
    if (result != null) {      
      log('Goblin hits for ' + result + ' damage!', 'mb');
    } else {
      log('Goblin missed.', 'miss');
    }
  },
  goblinSpit() {
    let result = attack(this.monsterDamage, 1, 0, 1, playerArmour);
    if (result != null) {
      log('Goblin uses <i>Goblin Spit</i> for ' + result + ' damage!', 'ms');
    } else {
      log('Goblin missed.', 'miss');
    }
  }
}