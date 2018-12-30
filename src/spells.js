import Stats from './stats';
import Globals from './globals';

import { roll, attack, bonus } from './rollattack';
import { log } from './log';
import { DEV } from './dev';
import { deathfireGraspCondition } from './conditions';
import { endTurn } from './turn';

const scorch = function () {
  const base = roll(2);
  const bonusRes = bonus(Stats.playerRunic, 2);
  const total = base + bonusRes;

  Stats.playerMana -= 75;
  deathfireGraspCondition.active = false;

  if (DEV) {
    console.log('Scorch base AC-ignore roll: ' + base);
    console.log('Scorch bonus AC-ignore roll: ' + bonusRes);
  }

  const result = attack(10, Stats.playerHitChanceModifier, 0, 1, Stats.monsterArmour - total);
  if (result != null) {
    log(`You <i>Scorch</i> for ${result} damage!`, 'ps-sorch');
    Globals.sound.playQSound();
    Globals.particles.showScorch();
    monsterHealthHelper(result);
  } else {
    log('You missed Scorch!', 'miss-player');
  }
  endTurn(result);
};

export default {
  scorch,
};
