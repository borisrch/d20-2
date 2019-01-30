import { log } from '../log';
import { roll, pureAttack } from '../rollattack';
import { endTurnMonster, playerHealthHelper } from '../turn';
import { dwarfTankCondition } from '../conditions';

import Stats from '../stats';
import Globals from '../globals';

const dwarf = {
  name: 'Gimli, the Dwarf',
  monsterHealth: 25,
  monsterArmour: 4,
  monsterDamage: 4,
  monsterRage: 0,
  src: 'res/mobs/dwarf-animated.gif',
  type: ['normal'],
  turn() {
    if (Stats.monsterRage > 40) {
      Stats.monsterRage = 0;
      this.dwarfSmash();
    } else if (Stats.monsterHealth < 8) {
      Stats.monsterRage += 10;
      this.dwarfTank();
    } else {
      Stats.monsterRage += 10;
      const result = roll(100);
      if (result > 60) {
        this.dwarfTank();
      } else {
        this.basicAttack();
      }
    }
  },
  basicAttack() {
    const result = pureAttack(Stats.monsterDamage / 2, 0, 0, 2, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log(`Dwarf hits for ${result} damage!`, 'mb');
      Globals.sound.playDwarf();
    } else {
      log('Dwarf missed.', 'miss');
      Globals.sound.playMiss();
    }
    endTurnMonster(result);
  },
  dwarfTank() {
    dwarfTankCondition.bonusArmour = 4;
    dwarfTankCondition.active = true;
    Stats.monsterArmour += dwarfTankCondition.bonusArmour;
    log('Dwarf uses <i>Dwarven Resilience</i> and buffs AC by 4!', 'ms');
    Globals.sound.playDwarfTank();
    endTurnMonster();
  },
  dwarfSmash() {
    const result = pureAttack(Stats.monsterDamage + 4, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log(`Dwarf uses <i>Dwarven Smash</i> for ${result} damage!`, 'ms');
    } else {
      log('Dwarf missed.', 'miss');
      Globals.sound.playMiss();
    }
    endTurnMonster(result);
  },
};

export default dwarf;
