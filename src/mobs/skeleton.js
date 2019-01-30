import { log } from '../log';
import { roll, pureAttack } from '../rollattack';
import { endTurnMonster, playerHealthHelper } from '../turn';
import { skeletonFrightenCondition, undeadCondition } from '../conditions';

import Stats from '../stats';
import Globals from '../globals';

const skeleton = {
  name: 'Jack, the Skeleton',
  monsterHealth: 30,
  monsterArmour: 0,
  monsterDamage: 5,
  monsterRage: 0,
  src: 'res/mobs/skeleton.png',
  type: ['undead'],
  turn() {
    if (Stats.monsterRage > 20) {
      this.frighten();
    } else {
      this.basicAttack();
    }
  },
  basicAttack() {
    Stats.monsterRage += 10;
    const result = pureAttack(2, 0, 1, 2, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log(`Skeleton hits for ${result} damage!`, 'mb');
      Globals.sound.playSkeleton();
    } else {
      log('Skeleton missed.', 'miss');
      Globals.sound.playMiss();
    }
    Stats.monsterLastSpell = {
      name: 'Skeleton Basic Attack',
      result,
      anim: 'poke-left',
    };
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

    Stats.monsterLastSpell = {
      name: 'Skeleton Frighten',
      result: null,
      anim: 'poke-left',
    };
    endTurnMonster();
  },
};

export default skeleton;
