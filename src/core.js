import tippy from 'tippy.js';
import Hammer from 'hammerjs';
import tingle from 'tingle.js';
import { Howl } from 'howler';

import '../css/tingle.min.css';
import 'tippy.js/dist/tippy.css';
// import '../css/spell-interface.css';
// import '../css/game-interface.css';

import { roll, attack, pureAttack, bonus } from './rollattack';
import { log } from './log';
import { disable, enable } from './disable';
import { DEV } from './dev';
import Stats from './stats';
import { manaCheck } from './check';
import {
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
  resetMonsterConditions,
} from './conditions';
// import { runTutorial, tutorialCondition, tutorialPause } from './tutorial';
import { endTurn, endTurnMonster, playerHealthHelper } from './turn';
import { updateStats } from './update';

import { properties } from './properties/properties';
import SoundManager from './soundmanager';
import ParticlesManager from './particles/particlesmanager';
import LevelManager from './levelmanager';
import Globals from './globals';

import Goblin from './mobs/goblin';
import Chicken from './mobs/chicken';
import Dwarf from './mobs/dwarf';
import Ent from './mobs/ent';
import Skeleton from './mobs/skeleton';
import Caretaker from './mobs/caretaker';

import { armour } from './equipment-store';
import { wizardItems } from './equipment-weapons';

const monsterHealthHelper = function (result) {
  if (Stats.monsterHealth - result <= 0) {
    Stats.monsterHealth = 0;
    log(`You have slain ${Stats.monsterName} !`, 'victory');
    lm.advance();
    monsterDead.active = true;
  } else {
    Stats.monsterHealth -= result;
  }
};

// Must Define After Monster, but before Basic Attack

let currentMonster;

const playerTurnBasicAttack = function () {
  deathfireGraspCondition.active = false;

  let result = attack(Stats.playerDamage, Stats.playerHitChanceModifier, 0, 1, Stats.monsterArmour);
  if (Stats.currentMonster.type === 'undead' && result !== null) {
    if (result - 2 <= 0) {
      result = 0;
    } else {
      result -= 2;
    }
  }

  if (result !== null) {
    log('You hit for ' + result + ' damage!', 'pb');
    monsterHealthHelper(result);
    sm.playBasic();
  } else {
    log('You missed.', 'miss-player');
    sm.playMiss();
  }

  Stats.playerLastSpell = {
    name: 'Basic Attack',
    result,
    anim: 'poke-right',
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
  tippyInit();
  // setMobileEvents();
  updateStats();
}

const mageInit = function () {
  buildInterface();
  Stats.playerHealth = 100;
  Stats.playerArmour = 8;
  Stats.playerMana = 100;

  const playerGraphic = document.getElementById('player-graphic');
  playerGraphic.src = Stats.playerGraphic;

  // REFACTOR: Temp stores spell metadata, needs to be changed everytime spells are changed.
  const spells = [
    {
      name: 'Scorch',
      id: 'q',
      cost: 75,
    },
    {
      name: 'Alzur\'s Thunder',
      id: 'w',
      cost: 100,
    },
    {
      name: 'Anima Surge',
      id: 'e',
      cost: 50,
    },
    {
      name: 'Runic Echoes',
      id: 'r',
      cost: 25,
    },
  ];
  Stats.playerSpells.push(...spells);

  $('.q').addClass('spell spell-dragon-breath');
  $('.qi').addClass('ra ra-dragon-breath icon');

  $('.w').addClass('spell spell-lightning-trio');
  $('.wi').addClass('ra ra-lightning-trio icon');

  $('.e').addClass('spell spell-frostfire');
  $('.ei').addClass('ra ra-frostfire icon');

  $('.r').addClass('spell spell-fire-shield');
  $('.ri').addClass('ra ra-fire-shield icon');

  document.getElementById('basic-attack').addEventListener('click', () => {
    playerTurnBasicAttack();
  });

  document.getElementById('q').addEventListener('click', () => {
    manaCheck(75, scorch);
  });

  const _W = document.getElementById('w');
  const W = new Hammer(_W);
  W.on('tap', function(e) {
    manaCheck(100, alzurs_thunder);
  });  

  // document.getElementById('w').addEventListener('click', () => {
  //   if (tutorialCondition.b) {
  //     tutorialCondition.b = false;
  //     tutorialPause(3);
  //   }
  //   manaCheck(100, alzurs_thunder);
  // });

  document.getElementById('e').addEventListener('click', () => {
    manaCheck(50, deathfire_grasp);
  });

  document.getElementById('r').addEventListener('click', () => {
    manaCheck(25, runic_echoes);
  });

  wizardItems[0].action();
}

const tippyInit = function () {

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
      tip: 'Rage is aquired over time, and allows monsters to have additional spells and effects.',
    },
    {
      el: '.player-mana-tip',
      tip: 'Mana is used as the cost for casting spells. 25 mana is recharged per turn.',
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
      tip: '<b>Shop</b>',
    },
    {
      el: '#equipment-armour',
      tip: '<b>Equip Armour</b>',
    },
    {
      el: '#equipment-new',
      tip: '<b>Equipment</b>',
    },
  ];

  tippyMessages.forEach((item) => {
    tippy(item.el, {
      content: item.tip,
      duration: 0,
    });
  });

}

const tippyMage = function () {
  const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
  const basicAttackTip = `<b>Basic Attack</b> - Deal 1-${Stats.playerDamage} ${damageIcon} .`;
  const messages = [
    {
      el: '#basic-attack',
      tip: basicAttackTip,
    },
    {
      el: '#q',
      tip: properties.spells.wizard.q,
    },
    {
      el: '#w',
      tip: properties.spells.wizard.w,
    },
    {
      el: '#e',
      tip: properties.spells.wizard.e,
    },
    {
      el: '#r',
      tip: properties.spells.wizard.r,
    },
  ];

  messages.forEach((item) => {
    tippy(item.el, {
      content: item.tip,
      duration: 0,
    });
  });
};

const monsterInit = function () {
  Stats.monsterArmour = Chicken.monsterArmour;
  Stats.monsterDamage = Chicken.monsterDamage;
  Stats.monsterHealth = Chicken.monsterHealth;
  Stats.monsterRage = 0;
  Stats.monsterName = Chicken.name;
  currentMonster = Chicken;
  Stats.currentMonster = currentMonster;
};

const scorch = function () {
  Stats.playerMana -= 75;

  deathfireGraspCondition.active = false;

  let base = roll(2);
  let bonusRes = bonus(Stats.playerRunic, 2);
  let total = base + bonusRes;

  if(DEV) {
    console.log('Scorch base AC-ignore roll: ' + base);
    console.log('Scorch bonus AC-ignore roll: ' + bonusRes);
  }

  let result = attack(Stats.playerDamage, Stats.playerHitChanceModifier, 0, 1, Stats.monsterArmour - total);

  if (Stats.currentMonster.type === 'undead' && result !== null) {
    if (result - 2 <= 0) {
      result = 0;
    } else {
      result -= 2;
    }
  }

  if (result != null) {
    log('You <i>Scorch</i> for ' + result + ' damage!', 'ps-scorch');
    sm.playQSound();
    pm.showScorch();
    monsterHealthHelper(result);
  } else {
    log('You missed Scorch!', 'miss-player');
    sm.playMiss();
  }

  Stats.playerLastSpell = {
    name: 'Scorch',
    result,
    anim: 'poke-right',
  };

  endTurn(result);
};

const alzurs_thunder = function() {

  Stats.playerMana = Stats.playerMana - 100;

  if (DEV) {
    console.log('@AlzursThunder');
    console.log('Extra turns: ' + alzursThunderCondition.turns)
  }

  let result = attack(4, Stats.playerHitChanceModifier, 0, 2, Stats.monsterArmour);

  if (Stats.currentMonster.type === 'undead' && result !== null) {
    if (result - 2 <= 0) {
      result = 0;
    } else {
      result -= 2;
    }
  }

  alzursThunderCondition.turns = Stats.playerRunic;
  deathfireGraspCondition.active = false;

  if (result != null) {
    // log(`You summon <i>Alzur's Thunder</i> for ${result} damage! <i class="ra ra-lightning-trio ra-log"></i>`, 'ps-thunder');
    log(`You summon <i>Alzur's Thunder</i> for ${result} damage!`, 'ps-thunder');
    monsterHealthHelper(result);
    sm.playWSound();
    pm.showThunder();
  } else {
    log('You missed Alzur\'s Thunder!', 'miss-player');
    sm.playMiss();
  }

  Stats.playerLastSpell = {
    name: 'Alzur\'s Thunder',
    result,
    anim: 'poke-right',
  };
  console.log(Stats.playerLastSpell);
  endTurn(result);  
}

const deathfire_grasp = function() {

  Stats.playerMana = Stats.playerMana - 50;

  const total = Stats.playerDamage + Stats.playerRunic;

  let result = attack(total, Stats.playerHitChanceModifier, 5, 1, Stats.monsterArmour);
  if (Stats.currentMonster.type === 'undead' && result !== null) {
    if (result - 2 <= 0) {
      result = 0;
    } else {
      result -= 2;
    }
  }

  if (result != null) {
    log('You invoke <i>Anima Surge</i> for ' + result + ' damage!', 'ps-grasp');
    monsterHealthHelper(result);
    sm.playESound();
    pm.showDeathfire();
  } else {
    log('You missed Surge!', 'miss-player');
    sm.playMiss();
  }

  Stats.playerLastSpell = {
    name: 'Anima Surge',
    result,
    anim: 'poke-right',
  };

  endTurn(result);
};

const runic_echoes = function() {

  if (DEV) {
    endTurn();
  } else {

  Stats.playerMana = Stats.playerMana - 25;

  let bonusRes = bonus(Stats.playerRunic, 2);

  runicEchoesCondition.active = true;
  runicEchoesCondition.bonusArmour = bonusRes;

  Stats.playerArmour = Stats.playerArmour + bonusRes;

  sm.playRSound();
  pm.showRunicEchoes();

  log('You cast <i>Runic Echoes</i> and boost armour by ' + bonusRes + '!', 'ps-echoes');

  Stats.playerLastSpell = {
    name: 'Runic Echoes',
    result: null,
    anim: 'poke-up',
  };

  endTurn();
  // Temporary if for DEV no damage.
  }
}

const getNextMonster = function (level) {
  switch (level) {
    case 0:
      return Chicken;

    case 1:
      return Goblin;

    case 2:
      return Dwarf;

    case 3:
      return Ent;

    case 4:
      return Skeleton;

    case 5:
      return Caretaker;

    case 6:
      return Caretaker;

    default:
      throw new Error('getNextMonster: Out of monsters');
  }
};

init('mage');

const sm = new SoundManager();
Globals.sound = sm;
const pm = new ParticlesManager();
Globals.particles = pm;
const lm = new LevelManager();

if (DEV) {
  Stats.playerHealth = 1000;
}

// Investigate this further, might interfere with tap/touch library.
document.documentElement.addEventListener('touchmove', function (event) {
  event.preventDefault();
}, false);

window.onload = () => {
  const canvas = lm.setForestLevel();
  canvas.classList.add('hidden');
  const game = document.getElementById('game-interface');
  const loading = document.getElementById('loading-container');
  loading.classList.add('animated', 'fadeOutUp');
  setTimeout(() => {
    loading.classList.add('hidden');
    canvas.classList.remove('hidden');
    canvas.classList.add('animated', 'fadeInUp');
    game.classList.remove('hidden');
    game.classList.add('animated', 'fadeInUp');
    setTimeout(() => {
      game.classList.remove('animated', 'fadeInUp');
      // Do not remove... Particles need this.
      window.dispatchEvent(new Event('resize'));
    }, 1050);
  }, 700);
};

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

// lm.setGraveyard();
// Stats.playerLevelName = 'graveyard';