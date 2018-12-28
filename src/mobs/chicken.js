import { log } from '../log';
import { pureAttack } from '../rollattack';
import { endTurnMonster, playerHealthHelper } from '../turn';
import Stats from '../stats';
import Globals from '../globals';

const chicken = {
  name: 'Cuck, the Chicken',
  monsterHealth: 10,
  monsterArmour: 0,
  monsterDamage: 2,
  monsterRage: 0,
  src: 'res/mobs/chicken.png',
  type: 'normal',
  turn() {
    this.basicAttack();
  },
  basicAttack() {
    const result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log(`Chicken hits for ${result} damage!`, 'mb');
      Globals.sound.playChicken();
    } else {
      log('Chicken missed.', 'miss');
      Globals.sound.playMiss();
    }
    endTurnMonster(result);
  },
};

export default chicken;
