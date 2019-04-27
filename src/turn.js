import tippy from 'tippy.js';

import Globals from './globals';
import Stats from './stats';

import { disable, enable } from './disable';
import {
  alzursThunderCondition,
  deathfireGraspCondition,
  runicEchoesCondition,
  sapphireAmuletCondition,
  dwarfTankCondition,
  monsterDead,
  playerDisadvantage,
  defensePotionCondition,
  accuracyPotionCondition,
  runicPotionCondition,
  skeletonFrightenCondition,
  undeadCondition
} from './conditions';
import { updateStats } from './update';
import { DEV } from './dev';

// UI elements
const playerArmour = document.getElementById('player-armour');
const playerGraphic = document.getElementById('player-graphic');
const monsterHealth = document.getElementById('monster-health');
const monsterGraphic = document.getElementById('monster-graphic');

const status = {
  SHOCKED: {
    id: 'monster-shocked',
    unit: 'monster',
    buff: false,
    icon: 'ra-player-thunder-struck',
    message: '<b>Shocked</b><br/>This monster will take bonus damage on your next attack.',
    particles() {
      Globals.particles.showShocked();
    },
  },
  DISADVANTAGED: {
    id: 'player-disadvantaged',
    unit: 'player',
    buff: false,
    icon: 'ra-player-despair',
    message: '<b>Disadvantaged</b><br/>You are less likely to hit on your next attack.',
    particles() {
      Globals.particles.showDisadvantaged();
    },
  },
  DWARF_TANK: {
    id: 'monster-dwarf-tank',
    unit: 'monster',
    buff: true,
    icon: 'ra-muscle-fat',
    message: '<b>Dwarven Resilience</b><br/>Armour class is buffed by 4 for this turn.',
    particles() {
      Globals.particles.showDwarfTank();
    },
  },
  FRIGHTENED: {
    id: 'player-frightened',
    unit: 'player',
    buff: false,
    icon: 'ra-player-pain',
    message: '<b>Frightened</b><br/>Armour class is reduced by 4 for this turn.',
    particles() {
      Globals.particles.showDisadvantaged();
    },
  },
  POTION_ACTIVE: {
    id: 'player-potion-buff',
    unit: 'player',
    buff: true,
    icon: 'ra-fizzing-flask',
    message: `<b>Potion Active</b><br/>A potion buff is currently affecting your stats.`,
    particles() {
      Globals.particles.showPotionActive();
    },
  },
  UNDEAD: {
    id: 'monster-undead',
    unit: 'monster',
    buff: true,
    icon: 'ra-skull',
    message: `<b>Undead</b><br/>This monster will take 2 less damage from all attacks.`,
    particles() {
    },
  },
  ELITE: {
    id: 'monster-elite',
    unit: 'monster',
    buff: null,
    icon: 'ra-monster-skull',
    message: `<b>Elite</b><br/>This monster has particularly strong spells and stats.`,
    particles() {
    },
  },
};

const setStatus = (buff) => {
  const el = document.getElementById(buff.id);

  // Only add new status if that type isn't already active.
  if (el === null) {
    let statusEl;

    if (buff.unit === 'monster') {
      statusEl = document.getElementById('monster-status');
    } else if (buff.unit === 'player') {
      statusEl = document.getElementById('player-status');
    } else {
      throw new TypeError(`Unit type not recognized: ${buff.unit}`);
    }

    buff.particles();

    const icon = document.createElement('span');
    icon.id = buff.id;
    icon.classList.add('ra', buff.icon, 'animated', 'flipInX');

    if (buff.buff) {
      icon.classList.add('colour-buff');
    } else if (buff.buff === false) {
      icon.classList.add('colour-debuff');
    } else {
      icon.classList.add('colour-elite');
    }

    statusEl.appendChild(icon);

    tippy(`#${icon.id}`, {
      content: buff.message,
    });
    // setTimeout(() => {
    //   icon.classList.remove('bounce');
    // }, 1001);
  }
};

const removeStatus = (buff) => {
  const el = document.getElementById(buff.id);
  if (el !== null) {
    el.classList.remove('flipInX');
    el.classList.add('flipOutX');

    if (buff.unit === 'monster') {
      Globals.particles.hideMonsterParticles();
    } else if (buff.unit === 'player') {
      Globals.particles.hidePlayerParticles();
    }

    setTimeout(() => {
      el.parentNode.removeChild(el);
    }, 1000);
  }
};

/*
  Turn Lifecycle: End Turn (Player) --> End Turn (Mob) --> Begin Turn (Player)
  End Turn (Player): Apply buffs to player. (Damage is applied in monsterHealthHelper).
  End Turn (Mob):
*/

export const endTurn = (result) => {
  if (result) {
    monsterHealth.classList.add('animated', 'jello');
  }
  // Player last spell animation. Todo: Refactor to Switch when for new animations.
  if (Stats.playerLastSpell.anim === 'poke-up') {
    playerGraphic.classList.add('poke-up');
  } else {
    playerGraphic.classList.add('poke-right');
  }

  if (runicEchoesCondition.active === true || defensePotionCondition.active === true) {
    playerArmour.classList.add('colour-mana-add');
  }

  if (dwarfTankCondition.active === true) {
    dwarfTankCondition.active = false;
    Stats.monsterArmour -= dwarfTankCondition.bonusArmour;
  }

  if (monsterDead.active === true) {
    monsterGraphic.classList.add('spawn');
    monsterDead.active = false;
  } else {
    monsterGraphic.classList.add('monster-flail');
  }

  // if (sapphireAmuletCondition.active == true) {
  //   Stats.playerMaxMana = 125;
  // } else {
  //   Stats.playerMaxMana = 100;
  // }

  // if (Stats.playerMana + 25 >= Stats.playerMaxMana) {
  //   Stats.playerMana = Stats.playerMaxMana;
  // } else {
  //   Stats.playerMana = Stats.playerMana + 25;
  //   $('.player-mana').addClass('colour-mana-add');
  // }

  if (alzursThunderCondition.turns > 0) {
    setStatus(status.SHOCKED);
  } else if (alzursThunderCondition.turns === 0) {
    removeStatus(status.SHOCKED);
  }

  if (defensePotionCondition.active || accuracyPotionCondition.active || runicPotionCondition.active) {
    setStatus(status.POTION_ACTIVE);
  }

  if (skeletonFrightenCondition.turns === 0 && skeletonFrightenCondition.active) {
    skeletonFrightenCondition.active = false;
    Stats.playerArmour += skeletonFrightenCondition.reduction;
    removeStatus(status.FRIGHTENED);
  }

  // Update stats.
  updateStats();

  // Disable player spells.
  disable();

  // Remove animation classes.
  setTimeout(() => {
    playerGraphic.classList.remove('poke-right', 'poke-up');
    playerArmour.classList.remove('colour-mana-add');
    monsterHealth.classList.remove('animated', 'jello');
    monsterGraphic.classList.remove('monster-flail', 'spawn');
  }, 1000);

  setTimeout(() => {
    Stats.currentMonster.turn();
  }, 1300);
};

const beginTurnPlayer = () => {
  // Item Conditions
  if (sapphireAmuletCondition.active === true) {
    Stats.playerMaxMana = 125;
  } else {
    Stats.playerMaxMana = 100;
  }

  // Mana Conditions
  if (Stats.playerMana + 25 >= Stats.playerMaxMana) {
    Stats.playerMana = Stats.playerMaxMana;
  } else {
    Stats.playerMana += 25;
    $('.player-mana').addClass('colour-mana-add');
    
    if (DEV) {
      Stats.playerMana = Stats.playerMaxMana;
    }
  }

  if (skeletonFrightenCondition.turns > 0) {
    skeletonFrightenCondition.turns -= 1;
  }

  updateStats();

  setTimeout(() => {
    $('.player-mana').removeClass('colour-mana-add');
  }, 1000);
}

export const endTurnMonster = function (result) {
  if (result) {
    $('.player-health').addClass('animated jello');
  }

  if (Stats.monsterRage > 0) {
    $('.monster-rage').addClass('colour-rage-add');
  }
  
  if (dwarfTankCondition.active == true) {
    $('.monster-armour').addClass('colour-rage-add');
  }

  if (runicEchoesCondition.active == true) {
    Stats.playerArmour = Stats.playerArmour - runicEchoesCondition.bonusArmour;
    runicEchoesCondition.active = false;
  }

  if (defensePotionCondition.turns > 0) {
    defensePotionCondition.turns = defensePotionCondition.turns - 1;
  }

  if (defensePotionCondition.turns === 0 && defensePotionCondition.active) {
    defensePotionCondition.active = false;
    Stats.playerArmour = Stats.playerArmour - defensePotionCondition.bonusArmour;
  }

  if (accuracyPotionCondition.turns > 0) {
    accuracyPotionCondition.turns = accuracyPotionCondition.turns - 1;
  }

  if (accuracyPotionCondition.turns === 0 && accuracyPotionCondition.active) {
    accuracyPotionCondition.active = false;
    Stats.playerHitChanceModifier -= accuracyPotionCondition.bonus;
  }

  if (runicPotionCondition.turns > 0) {
    runicPotionCondition.turns -= 1;
  }

  if (runicPotionCondition.turns === 0 && runicPotionCondition.active) {
    runicPotionCondition.active = false;
    Stats.playerRunic -= runicPotionCondition.bonus;
  }

  if (defensePotionCondition.active === false && accuracyPotionCondition.active === false && runicPotionCondition.active === false) {
    removeStatus(status.POTION_ACTIVE);
  }

  if (playerDisadvantage.active === true) {
    setStatus(status.DISADVANTAGED);
  }
  else if (playerDisadvantage.active === false) {
    removeStatus(status.DISADVANTAGED);
  }

  if (dwarfTankCondition.active === true) {
    setStatus(status.DWARF_TANK);
  } else if (dwarfTankCondition.active === false) {
    removeStatus(status.DWARF_TANK);
  }

  if (skeletonFrightenCondition.turns > 0) {
    setStatus(status.FRIGHTENED);
  }

  if (Stats.currentMonster.type.includes('undead')) {
    setStatus(status.UNDEAD);
  }
  
  if (Stats.currentMonster.type.includes('elite')) {
    setStatus(status.ELITE);
  } else {
    removeStatus(status.ELITE);
  }

  // const monsterGraphic = document.getElementById('monster-graphic');

  switch (Stats.monsterLastSpell.anim) {
    case 'poke-left':
      monsterGraphic.classList.add('poke-left');
      setTimeout(() => {
        monsterGraphic.classList.remove('poke-left');
      }, 750);
      break;

    case 'dwarf-smash':
      monsterGraphic.classList.add('dwarf-smash');
      setTimeout(() => {
        monsterGraphic.classList.remove('dwarf-smash');
      }, 750);
      break;

    default:
      throw new Error('monster animation not defined');
  }

  $('.player-graphic').addClass('player-flail');

  updateStats();
  setTimeout(() => {
    $('.player-health').removeClass('animated jello');
    $('.monster-armour').removeClass('colour-rage-add');
    $('.monster-rage').removeClass('colour-rage-add');
  }, 500);
  setTimeout(() => {
    $('.player-graphic').removeClass('player-flail');
  }, 750);

  setTimeout(() => {
    beginTurnPlayer();
    enable();
  }, 800);
}

export const playerHealthHelper = (result) => {
  if (Stats.playerHealth - result <= 0) {
    Stats.playerHealth = 0;
    log('You died to ' + currentMonster.name + '!', 'ms');
  } 
  else {
    Stats.playerHealth = Stats.playerHealth - result;
  }
}