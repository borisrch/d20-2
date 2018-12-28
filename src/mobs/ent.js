import { log } from '../log';
import { roll, pureAttack } from '../rollattack';
import { endTurnMonster, playerHealthHelper } from '../turn';
import { playerDisadvantage } from '../conditions';

import Stats from '../stats';
import Globals from '../globals';

const ent = {
  name: 'Shrekt, the Ogre',
  monsterHealth: 40,
  monsterArmour: 6,
  monsterDamage: 10,
  monsterRage: 0,
  src: 'res/mobs/ogre.png',
  type: 'normal',
  turn() {
    if (Stats.monsterRage > 50) {
      this.growth();
    } else {
      const result = roll(100);
      if (result > 50) {
        this.vine();
      } else {
        this.basicAttack();
      }
    }
  },
  basicAttack() {
    Stats.monsterRage += 20;
    const result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log(`Ogre hits for ${result} damage!`, 'mb');
      Globals.sound.playEnt();
    } else {
      log('Ogre missed.', 'miss');
      Globals.sound.playMiss();
    }
    endTurnMonster(result);
  },
  growth() {
    let result = roll(2);
    if (Stats.monsterRage === 100) {
      result = 2;
    }
    if (result === 2) {
      const extra = (Stats.monsterRage / 10);
      Stats.monsterHealth += extra;
      Stats.monsterRage = 0;
      Globals.sound.playEntHeal();
      Globals.particles.showMobHeal();
      log(`Ogre uses <i>Battle Cry</i> and heals for ${extra} damage!`, 'ms');
      endTurnMonster();
    } else {
      this.basicAttack();
    }
  },
  vine() {
    Stats.monsterRage += 20;
    playerDisadvantage.active = true;
    Globals.sound.playEntTrip();
    Globals.particles.showEntTrip();
    log('Ogre uses <i>Earth Shaker</i> and makes you Disadvantaged!', 'ms');
    endTurnMonster();
  },
};

export default ent;
