import { log } from '../log';
import { roll, attack, pureAttack } from '../rollattack';
import { DEV } from '../dev';
import { endTurnMonster, playerHealthHelper } from '../turn';
import Stats from '../stats';

const goblin = {
  name: 'Wormface, the Goblin',
  monsterHealth: 20,
  monsterArmour: 4,
  monsterDamage: 4,
  monsterRage: 0,
  src: 'res/mobs/goblin.png',
  names: ['Wormface', 'Grubhead', 'Fartbreath', 'Poopnose', 'Wormhair'],
  turn() {
    const result = roll(100);
    result > 75 ? this.goblinSpit() : this.basicAttack();
  },
  basicAttack() {
    const result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log('Goblin hits for ' + result + ' damage!', 'mb');
    } 
    else {
      log('Goblin missed.', 'miss');
    }
    endTurnMonster(result);
  },
  goblinSpit() {
    const result = pureAttack(Stats.monsterDamage, 1, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log('Goblin uses <i>Goblin Spit</i> for ' + result + ' damage!', 'ms');
    } 
    else {
      log('Goblin missed.', 'miss');
    }
    endTurnMonster(result);
  }
}

export default goblin;