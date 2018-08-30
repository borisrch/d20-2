// Open Live-reload in dev env.
// Webpack - load in modules when needed.
// Refactor html
import tippy from 'tippy.js';

import '../css/tingle.min.css';
// import '../css/game-interface.css';

import { roll, attack, pureAttack, bonus } from './rollattack';
import { log } from './log';
import { disable, enable } from './disable';
import { DEV } from './dev';
import Stats from './stats';
import { manaCheck } from './check';
import {
  selectWeapon,
  selectAmulet,
  selectTrinket,
  wand_desc,
  amulet_desc,
  trinket_desc,
  shop,
  potions,
  setShopItem,
  getGold,
  setEquipmentInterface,
  setWeaponInterface,
  updateWeaponInterface,
  updateEquipmentInterface,
  setAmuletInterface,
  updateAmuletInterface,
  buildInterface,
} from './equipment';
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
} from './conditions';
import { runTutorial, tutorialCondition, tutorialPause } from './tutorial';
import { endTurn, endTurnMonster, playerHealthHelper } from './turn';
import { updateStats } from './update';
import Logger from './logger';

import Goblin from './mobs/goblin';

const noop = () => {};

const chicken = {
  name: 'Cuck, the Chicken',
  monsterHealth: 10,
  monsterArmour: 0,
  monsterDamage: 2,
  monsterRage: 0,
  src: 'res/mobs/chicken.png',
  turn() {
    this.basicAttack();
  },
  basicAttack() {
    const result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log(`Chicken hits for ${result} damage!`, 'mb');
    } else {
      log('Chicken missed.', 'miss');
    }
    endTurnMonster(result);
  },
};

const dwarf = {
  name: 'Gimli, the Dwarf',
  monsterHealth: 30,
  monsterArmour: 8,
  monsterDamage: 6,
  monsterRage: 0,
  src: 'res/mobs/dwarf.png',
  turn() {
    if (Stats.monsterRage > 40) {
      if(DEV) {
        console.log('@Dwarf Rage')
      }
      Stats.monsterRage = 0;
      this.dwarfSmash();
    } else {
      Stats.monsterRage = Stats.monsterRage + 10;
      let result = roll(100);
      if (DEV) {
        console.log('@DwarfTurn');
        console.log('Dwarf ability chance ' + result);
      }
      if (result > 75) { 
        this.dwarfTank();
      } else {
        this.basicAttack();
      }    
    }
  },
  basicAttack() {
    let result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log('Dwarf hits for ' + result + ' damage!', 'mb');
    } else {
      log('Dwarf missed.', 'miss');
    }
    endTurnMonster(result);
  },
  dwarfTank() {
    dwarfTankCondition.bonusArmour = 4;
    dwarfTankCondition.active = true;
    Stats.monsterArmour = Stats.monsterArmour + dwarfTankCondition.bonusArmour;

    log('Dwarf uses <i>Dwarven Resilience</i> and buffs AC by 4!', 'ms');
    endTurnMonster();
  },
  dwarfSmash() {
    let result = pureAttack(Stats.monsterDamage + 4, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log('Dwarf uses <i>Dwarven Smash</i> for ' + result + ' damage!', 'ms');
    } else {
      log('Dwarf missed.', 'miss');
    }
    endTurnMonster(result);
  }
}

const ent = {
  name: 'Radagast, the Ent',
  monsterHealth: 40,
  monsterArmour: 6,
  monsterDamage: 10,
  monsterRage: 0,
  src: 'res/mobs/ent.png',
  turn() {
    if (Stats.monsterRage > 50) {
      this.growth();
    } 
    else {
      let result = roll(100);
      if (result > 50) {
        this.vine();
      }
      else {
        this.basicAttack();
      }  
    }
  },
  basicAttack() {
    Stats.monsterRage += 20;
    let result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log('Ent hits for ' + result + ' damage!', 'mb');
    } 
    else {
      log('Ent missed.', 'miss');
    }
    endTurnMonster(result);
  },
  growth() {
    // Chance of not using growth when rage > 50

    let result = roll(2);
    if (Stats.monsterRage === 100){
      result = 2;
    }
    if (result === 2) {
      let extra = (Stats.monsterRage / 10);
      Stats.monsterHealth = Stats.monsterHealth + extra

      if (DEV) {
        console.log(`Extra: ${extra}`);
      }

      Stats.monsterRage = 0;
      log(`Ent uses <i>Growth</i> and heals for ${extra} damage!`,'ms');
      endTurnMonster();
    }
    else {
      this.basicAttack();
    }
  },
  vine() {
    Stats.monsterRage += 20;
    playerDisadvantage.active = true;
    log('Ent uses <i>Vine Trip</i> and makes you disadvantaged for next turn!', 'ms');
    endTurnMonster();
  },
}

const monsterHealthHelper = function(result) {
  if (DEV) {
    console.log('@monsterHealthHelper result:' + result);
  }

  if(Stats.monsterHealth - result <= 0) {
    Stats.monsterHealth = 0;
    log('You have slain ' + Stats.monsterName + '!', 'victory');
    advance();

    monsterDead.active = true;    

  } else {    
    Stats.monsterHealth = Stats.monsterHealth - result;
  }  
};

// Must Define After Monster, but before Basic Attack

let currentMonster;

const playerTurnBasicAttack = function() {

  deathfireGraspCondition.active = false;

  let result = attack(Stats.playerDamage, Stats.playerHitChanceModifier, 0, 1, Stats.monsterArmour);
  if (result != null) {
    log('You hit for ' + result + ' damage!', 'pb');
    monsterHealthHelper(result);
  } else {
    log('You missed.', 'miss-player');
  }
  endTurn(result);
}

const init = function (mode) {

  monsterInit();

  switch(mode) {
    case 'warrior':
    break;

    case 'ranger':
    break;

    case 'mage':
    Stats.playerClass = 'mage';
    mageInit();
    tippyMage();    
    break;

    default:
    console.log('Error in init');
  }
  updateStats();
  tippyInit();
}

const mageInit = function () {
  
  buildInterface();

  Stats.playerHealth = 100;
  Stats.playerDamage = 6;
  Stats.playerArmour = 8;
  Stats.playerRunic = 2;
  Stats.playerMana = 100;

  const playerGraphic = document.getElementById('player-graphic');
  playerGraphic.src = Stats.playerGraphic;

  $('.q').addClass('spell spell-dragon-breath');
  $('.qi').addClass('ra ra-dragon-breath icon');

  $('.w').addClass('spell spell-lightning-trio');
  $('.wi').addClass('ra ra-lightning-trio icon');

  $('.e').addClass('spell spell-frostfire');
  $('.ei').addClass('ra ra-frostfire icon');

  $('.r').addClass('spell spell-fire-shield');
  $('.ri').addClass('ra ra-fire-shield icon');

  // Shop logic starts. Move to general init later.

  // document.getElementById('buy-health').addEventListener('click', () => {
  //   buyHealth();
  // });

  // document.getElementById('buy-defense').addEventListener('click', () => {
  //   buyDefense();
  // });

  // document.getElementById('buy-accuracy').addEventListener('click', () => {
  //   buyAccuracy();
  // });

  // document.getElementById('buy-pp').addEventListener('click', () => {
  //   buyPp();
  // });

  // document.getElementById('buy-runic').addEventListener('click', () => {
  //   buyRunic();
  // });

  document.getElementById('basic-attack').addEventListener('click', () => {
    if (tutorialCondition.a) {
      tutorialCondition.a = false;
      tutorialPause(2);
      tutorialCondition.b = true;
    }

    playerTurnBasicAttack();
  });

  document.getElementById('q').addEventListener('click', () => {
    if (tutorialCondition.b) {
      tutorialCondition.b = false;
      tutorialPause(3);
    }

    manaCheck(75, scorch);
  });

  document.getElementById('w').addEventListener('click', () => {
    if (tutorialCondition.b) {
      tutorialCondition.b = false;
      tutorialPause(3);
    }
    manaCheck(100, alzurs_thunder);
  });

  document.getElementById('e').addEventListener('click', () => {
    if (tutorialCondition.b) {
      tutorialCondition.b = false;
      tutorialPause(3);
    }
    manaCheck(50, deathfire_grasp);
  });

  document.getElementById('r').addEventListener('click', () => {
    if (tutorialCondition.b) {
      tutorialCondition.b = false;
      tutorialPause(3);
    }
    manaCheck(25, runic_echoes);
  });
}

// const updateStats = function () {
//   $('.player-health').text(Stats.playerHealth);
//   $('.player-damage').text(Stats.playerDamage);
//   $('.player-armour').text(Stats.playerArmour);
//   $('.player-runic').text(Stats.playerRunic);
//   $('.player-mana').text(Stats.playerMana);

//   $('.monster-health').text(Stats.monsterHealth);
//   $('.monster-armour').text(Stats.monsterArmour);
//   $('.monster-damage').text(Stats.monsterDamage);
//   $('.monster-rage').text(Stats.monsterRage);
//   $('.monster-label').text(Stats.monsterName);
// }

const tippyInit = function () {

  const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
  const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
  const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';

  const tippyMessages = [
    {
      el: '.player-damage-tip',
      tip: 'Damage attribute affects basic attack and spell damage.',
    },
    {
      el: '.player-armour-tip',
      tip: 'Armour class represents how hard it is for opponents to land an attack or spell on you.',
    },
    {
      el: '.player-runic-tip',
      tip: 'Runic attribute improves spells and their effects.',
    },
    {
      el: '.monster-rage-tip',
      tip: 'Rage is aquired over time, and allows Monsters to have additional spells and effects.',
    },
    {
      el: '.player-mana-tip',
      tip: 'PP represents the cost for casting spells. 25 PP is recharged per turn.',
    },
    {
      el: '#equipment-weapon',
      tip: '<b>Equip Weapon</b>',
    },
    {
      el: '#equipment-amulet',
      tip: '<b>Equip Amulet</b>',
    },
    {
      el: '#equipment-trinket',
      tip: '<b>Equip Trinket</b>',
    },
    {
      el: '#equipment-shop',
      tip: '<b>Browse Shop</b>',
    },
    {
      el: '#equipment-armour',
      tip: '<b>Equip Armour</b>',
    },
    {
      el: '#equipment-new',
      tip: '<b>Change Equipment</b>',
    },
  ];

  const tippyElements = [];

  tippyMessages.forEach((item) => {
    let c = document.querySelector(item.el);
    c.setAttribute('title', item.tip);
    tippyElements.push(c);
  })

  tippy(tippyElements);

}

const tippyMage = function() {  
  const title = 'title';

  const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
  const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
  const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';

  const basicAttackTip = '<b>Basic Attack</b> - Deal 1d' + Stats.playerDamage + ' ' + damageIcon + ' .';
  $('.basic-attack').prop(title, basicAttackTip);
  tippy('.basic-attack');

  const mageSpellQ = '<b>Scorch (75 PP)</b> - Ignore 1d2 ' + armourIcon + ' and deal 1d10 ' + damageIcon + '. Ignore an additional 1d2 ' + armourIcon + ' per ' + runicIcon + ' level.';
  $('.q').prop(title, mageSpellQ);
  tippy('.q');

  const mageSpellW = '<b>Alzur\'s Thunder (100 PP)</b> - Deal 2d4 ' + damageIcon + ' and apply <i>Shocked</i>. Shock deals bonus 1d4 ' + damageIcon + ' for ' + runicIcon + ' turns.';
  $('.w').prop(title, mageSpellW);
  tippy('.w');

  const mageSpellE = '<b>Malevolence (50 PP)</b> - Deal 1d10 ' + damageIcon + ' . Consecutive Malevolence casts deal bonus 1d2 ' + damageIcon + ' per ' + runicIcon + ' level.';
  $('.e').prop(title, mageSpellE);
  tippy('.e');

  const mageSpellR = '<b>Runic Echoes (25 PP)</b> - Increase ' + armourIcon + ' by 1d2 per ' + runicIcon + ' level for the next turn.';
  $('.r').prop(title, mageSpellR);
  tippy('.r');
}

const monsterInit = function() {
  Stats.monsterArmour = chicken.monsterArmour;
  Stats.monsterDamage = chicken.monsterDamage;
  Stats.monsterHealth = chicken.monsterHealth;
  Stats.monsterRage = 0;
  Stats.monsterName = chicken.name;
  currentMonster = chicken;
  Stats.currentMonster = currentMonster;
}

const scorch = function() {
  Stats.playerMana = Stats.playerMana - 75;

  deathfireGraspCondition.active = false;

  let base = roll(2);
  let bonusRes = bonus(Stats.playerRunic, 2);
  let total = base + bonusRes;

  if(DEV) {
    console.log('Scorch base AC-ignore roll: ' + base);
    console.log('Scorch bonus AC-ignore roll: ' + bonusRes);
  }

  let result = attack(10, Stats.playerHitChanceModifier, 0, 1, Stats.monsterArmour - total);

  if(result != null) {
    log('You <i>Scorch</i> for ' + result + ' damage!', 'ps-scorch');
    monsterHealthHelper(result);
  } else {
    log('You missed Scorch!', 'miss-player');
  }
  endTurn(result);
}

const alzurs_thunder = function() {

  Stats.playerMana = Stats.playerMana - 100;

  if (DEV) {
    console.log('@AlzursThunder');
    console.log('Extra turns: ' + alzursThunderCondition.turns)
  }

  let result = attack(4, Stats.playerHitChanceModifier, 0, 2, Stats.monsterArmour);

  alzursThunderCondition.turns = Stats.playerRunic;
  deathfireGraspCondition.active = false;

  if(result != null) {
    log('You summon <i>Alzur\'s Thunder</i> for ' + result + ' damage!', 'ps-thunder');
    monsterHealthHelper(result);
    
  } else {
    log('You missed Alzur\'s Thunder!', 'miss-player');
  }
  endTurn(result);  
}

const deathfire_grasp = function() {

  Stats.playerMana = Stats.playerMana - 50;

  if (DEV) {
    Logger.info('@DeathfireGrasp');
    Logger.info('Active: ' + deathfireGraspCondition.active);
    Logger.info('Stack: ' + deathfireGraspCondition.stack);
  }

  let result;

  if (deathfireGraspCondition.active == true) {
    const stackRunic = Stats.playerRunic + deathfireGraspCondition.stack;
    deathfireGraspCondition.stack += 1;

    let bonusRes = bonus(stackRunic, 2);
    result = attack(10, Stats.playerHitChanceModifier, bonusRes, 1, Stats.monsterArmour);

  } else {
    result = attack(10, Stats.playerHitChanceModifier, 0, 1, Stats.monsterArmour);
    deathfireGraspCondition.stack = 1;
  }
  
  deathfireGraspCondition.active = true;

  if(result != null) {
    log('You invoke <i>Malevolence</i> for ' + result + ' damage!', 'ps-grasp');
    monsterHealthHelper(result);
  } else {
    log('You missed Malevolence!', 'miss-player');
  }
  endTurn(result);
};

const runic_echoes = function() {

  Stats.playerMana = Stats.playerMana - 25;

  let bonusRes = bonus(Stats.playerRunic, 2);

  runicEchoesCondition.active = true;
  runicEchoesCondition.bonusArmour = bonusRes;

  Stats.playerArmour = Stats.playerArmour + bonusRes;

  log('You cast <i>Runic Echoes</i> and boost armour by ' + bonusRes + '!', 'ps-echoes');

  endTurn();
}

// Incomplete function. Add item types to this.
const advance = function() {
  
  if (DEV) {
    console.log('@Advance');
  }

  Stats.playerLevel += 1;

  // NEED TO ADD CHECK FOR LAST MONSTERS !! if (Stats.playerLevel > 10) or whatever.

  if (Stats.playerLevel > 10) {
    throw new Error('playerLevel exceeds 10. No more monsters');
  }

  // Handles gold income and logging. 
  // if (item.gold > 0) {
  //   Stats.gold += item.gold;
  //   log('Loot: ' + item.name + ' (' + item.type + ') and ' + item.gold + ' gold.', 'victory');
  // } else {
  //   log('Loot: ' + item.name + ' (' + item.type + ').', 'victory');
  // }

  currentMonster = getNextMonster(Stats.playerLevel);

  // This is only used for external turn.js module. Highly likely Null Pointers
  Stats.currentMonster = currentMonster;

  Stats.monsterHealth = currentMonster.monsterHealth;
  Stats.monsterDamage = currentMonster.monsterDamage;
  Stats.monsterArmour = currentMonster.monsterArmour;
  Stats.monsterName = currentMonster.name;
  Stats.monsterRage = 0;
  $('#monster-graphic').addClass('animated zoomOut');
  $('#monster-graphic').attr('src', currentMonster.src);
  setTimeout(() => {
    $('#monster-graphic').removeClass('animated zoomOut');
  }, 750);

  updateStats();
}

const completeStage = () => {
  
}

const getNextMonster = function(level) {
  switch(level) {
    case 0:
    return chicken;
    break;

    case 1:
    return Goblin;
    break;

    case 2:
    return dwarf;
    break;

    case 3:
    return ent;
    break;

    default:
    console.log('@Error at getNextMonster');
    return goblin;
    break;
  }
}



init('mage');

// runTutorial();

// Turn simulator

// let turnCount = 0;
// const sim = setInterval(function(){  
//   if(turnCount < 10) {
//     turnCount++;
//     playerTurnBasicAttack();
//   } else {
//     clearInterval(sim);
//   }  
// }, 2500);

// Skip to monsters. Function still +1 to level 
// Stats.playerLevel = 2;
// advance();