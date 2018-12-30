import { log } from '../log';
import { roll, pureAttack } from '../rollattack';
import { endTurnMonster, playerHealthHelper } from '../turn';
import { skeletonFrightenCondition, undeadCondition } from '../conditions';

import Stats from '../stats';
import Globals from '../globals';

const caretaker = {
  name: 'Yorick, the Caretaker',
  monsterHealth: 65,
  monsterArmour: 10,
  monsterDamage: 10,
  monsterRage: 0,
  src: 'res/mobs/caretaker.png',
  type: ['undead', 'boss'],
  init: false,
  turn() {
    if(!this.init) {
      this.init = true;
      Globals.particles.showCaretaker();
    }

    const result = roll(3);

    if (result == 3 || Stats.monsterHealth < 20) {
      this.desecrate();
    } else if (Stats.monsterRage >= 60) {
      this.lastRite();
    } else if (result == 1) {
      this.basicAttack();
    } else {
      this.basicAttack();
    }
  },
  basicAttack() {
    Stats.monsterRage += 20;
    const result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log(`Caretaker hits for ${result} damage!`, 'mb');
      Globals.sound.playSkeleton();
    } else {
      log('Caretaker missed.', 'miss');
      Globals.sound.playMiss();
    }
    endTurnMonster(result);
  },
  lastRite() {
    Stats.monsterRage = 0;
    const result = roll(3) + roll(3) + roll(3);
    playerHealthHelper(result);
    log(`Caretaker conjures <i>Last Rite</i> and hits for ${result} damage!`, 'ms');
    Globals.sound.playCaretakerSpell();
    Globals.particles.showCaretakerSpell();
    endTurnMonster(result);
  },
  desecrate() {
    Stats.monsterRage += 20;
    const result = roll(2) + roll(2) + roll(2);
    Stats.monsterHealth += result;
    playerHealthHelper(result);
    log(`Caretaker casts <i>Desecrate</i> and lifesteals for ${result} damage!`, 'ms');
    Globals.particles.showMobHeal();
    Globals.particles.showCaretakerSpell();
    Globals.sound.playCaretakerSpell();
    endTurnMonster(result);
  }
};

export default caretaker;