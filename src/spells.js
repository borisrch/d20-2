import Stats from './stats';
import Globals from './globals';

import { roll, attack, bonus } from './rollattack';
import { log } from './log';
import { DEV } from './dev';
import { deathfireGraspCondition } from './conditions';
import { endTurn } from './turn';

const scorch = function () {
  Stats.playerMana -= 75;
  deathfireGraspCondition.active = false;

  const base = roll(2);
  const bonusRes = bonus(Stats.playerRunic, 2);
  const total = base + bonusRes;

  let result = attack(Stats.playerDamage, Stats.playerHitChanceModifier, 0, 1, Stats.monsterArmour - total);

  if (Stats.currentMonster.type === 'undead' && result !== null) {
    if (result - 2 <= 0) {
      result = 0;
    } else {
      result -= 2;
    }
  }

  if (result != null) {
    log(`You <i>Scorch</i> for ${result} damage!`, 'ps-scorch');
    Globals.sound.playQSound();
    Globals.particles.showScorch();
    monsterHealthHelper(result);
  } else {
    log('You missed Scorch!', 'miss-player');
    Globals.sound.playMiss();
  }

  Stats.playerLastSpell = {
    name: 'Scorch',
    result,
    anim: 'poke-right',
  };

  endTurn(result);
};

export default {
  scorch,
};
