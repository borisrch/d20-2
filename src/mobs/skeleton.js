import { log } from '../log';
import { roll, pureAttack } from '../rollattack';
import { endTurnMonster, playerHealthHelper } from '../turn';
import { skeletonFrightenCondition, undeadCondition } from '../conditions';

import Stats from '../stats';
import Globals from '../globals';

const skeleton = {
  name: 'Jack, the Skeleton',
  monsterHealth: 50,
  monsterArmour: 0,
  monsterDamage: 6,
  monsterRage: 0,
  src: 'res/mobs/skeleton.png',
  type: 'undead',
  turn() {
    if (Stats.monsterRage > 20) {
      this.frighten();
    } else {
      this.basicAttack();
    }
  },
  basicAttack() {
    Stats.monsterRage += 10;
    const result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log(`Skeleton hits for ${result} damage!`, 'mb');
      Globals.sound.playSkeleton();
    } else {
      log('Skeleton missed.', 'miss');
      Globals.sound.playMiss();
    }
    endTurnMonster(result);
  },
  frighten() {
    Stats.monsterRage = 0;
    skeletonFrightenCondition.reduction = 4;
    if (skeletonFrightenCondition.turns === 0 && skeletonFrightenCondition.active === false) {
      Stats.playerArmour -= skeletonFrightenCondition.reduction;
    }
    skeletonFrightenCondition.active = true;
    skeletonFrightenCondition.turns = 2;

    Globals.sound.playSkeletonFrighten();
    Globals.particles.showSkeletonFrighten();
    log(`Skeleton uses <i>Frighten</i> and reduces your armour by 4 for 2 turns.`, 'ms');
    endTurnMonster();
  },
};

export default skeleton;
