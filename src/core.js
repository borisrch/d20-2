// Open Live-reload in dev env.
// Webpack - load in modules when needed.
// Refactor html

import { roll, attack, pureAttack, bonus, getRandomInt } from './rollattack';
import { log } from './log';
import { disable, enable } from './disable';
import { DEV } from './dev';
import Stats from './stats';
import { manaCheck } from './mana';

if(DEV) {
  log('BUILD ALPHA 0.2.23 - AlzursThunder', 'info');
}

let playerHealth = Stats.playerHealth;
let playerArmour = Stats.playerArmour;
let playerDamage = Stats.playerDamage;
let playerRunic = Stats.playerRunic;
let playerMana = Stats.playerMana;

let monsterHealth = Stats.monsterHealth;
let monsterArmour = Stats.monsterArmour;
let monsterDamage = Stats.monsterDamage;
let monsterRage = Stats.monsterRage;
let monsterName = Stats.monsterName;

let playerHitChanceModifier = 0;

const goblin = {
  name: 'Goblin',
  monsterArmour: 15,
  monsterDamage: 4,
  monsterRage: 0,
  names: ['Wormface', 'Grubhead', 'Fartbreath', 'Poopnose', 'Wormhair'],
  turn() {
    let result = roll(100);
    
    if(DEV) {
      console.log('Goblin Abilty Chance ' + result);
    }

    if (result > 75) {      
      this.goblinSpit();
    } else {
      this.basicAttack();
    }
  },
  basicAttack() {
    let result = pureAttack(Stats.monsterDamage, 0, 0, 1, playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log('Goblin hits for ' + result + ' damage!', 'mb');
    } else {
      log('Goblin missed.', 'miss');
    }
    endTurnMonster(result);
  },
  goblinSpit() {
    let result = pureAttack(Stats.monsterDamage, 1, 0, 1, playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log('Goblin uses <i>Goblin Spit</i> for ' + result + ' damage!', 'ms');
    } else {
      log('Goblin missed.', 'miss');
    }
    endTurnMonster(result);
  }
}

const monsterHealthHelper = function(result) {
  if (DEV) {
    console.log('@monsterHealthHelper result:' + result);
  }

  if(Stats.monsterHealth - result < 0) {
    Stats.monsterHealth = 0;
    log('You have slain Goblin!', 'pb');    
  } else {    
    Stats.monsterHealth = Stats.monsterHealth - result;
    
  }  
}

const playerHealthHelper = function(result) {
  if(Stats.playerHealth - result <= 0) {
    Stats.playerHealth = 0;
    log('You died to ' + currentMonster.name + '!', 'ms');
  } else {
    Stats.playerHealth = Stats.playerHealth - result;
  }
  
}

const endTurn = function(result) {
  if (result) {
    $('.monster-health').addClass('animated jello');
  }
  
  if (Stats.playerMana + 25 >= 100) {
    Stats.playerMana = 100;
  } else {
    Stats.playerMana = Stats.playerMana + 25;
    $('.player-mana').addClass('colour-mana-add');
  }

  updateStats();

  disable();

  // Remove animation classes.

  setTimeout(() => {
    $('.monster-health').removeClass('animated jello');
  }, 500);

  setTimeout(() => {
    $('.player-mana').removeClass('colour-mana-add');
  }, 1000);


  setTimeout(() => {
    currentMonster.turn(); 
    enable();
  }, 1500);
}

const endTurnMonster = function(result) {
  if (result) {
    $('.player-health').addClass('animated jello');
  }  
  updateStats();
  setTimeout(() => {
    $('.player-health').removeClass('animated jello');
  }, 500);
}

// Must Define After Monster, but before Basic Attack

let currentMonster = goblin;

const playerTurnBasicAttack = function() {
  let result = attack(Stats.playerDamage, Stats.playerHitChanceModifier, 0, 1, Stats.monsterArmour);
  if (result != null) {
    log('You hit for ' + result + ' damage!', 'pb');
    monsterHealthHelper(result);
  } else {
    log('You missed.', 'miss-player');
  }
  endTurn(result);
}

const init = function(mode) {
  
  tippyInit();
  monsterInit();

  switch(mode) {
    case 'warrior':
    break;

    case 'ranger':
    break;

    case 'mage':
    mageInit();
    tippyMage();    
    break;

    default:
    console.log('Error in init');
  }
  updateStats();  
}

const mageInit = function() {
  Stats.playerHealth = 100;
  Stats.playerDamage = 10;
  Stats.playerArmour = 8;
  Stats.playerRunic = 2;
  Stats.playerMana = 100;

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
}

const updateStats = function () {
  $('.player-health').text(Stats.playerHealth);
  $('.player-damage').text(Stats.playerDamage);
  $('.player-armour').text(Stats.playerArmour);
  $('.player-runic').text(Stats.playerRunic);
  $('.player-mana').text(Stats.playerMana);

  $('.monster-health').text(Stats.monsterHealth);
  $('.monster-armour').text(Stats.monsterArmour);
  $('.monster-damage').text(Stats.monsterDamage);
  $('.monster-rage').text(Stats.monsterRage);
}

const tippyInit = function () {
  const title = 'title';

  const playerDamageTip = 'Damage attribute affects basic attack and spell damage.';
  $('.player-damage-tip').prop(title, playerDamageTip);
  tippy('.player-damage-tip');  

  const playerArmourTip = 'Armour class represents how hard it is for opponents to land an attack or spell on you.';
  $('.player-armour-tip').prop(title, playerArmourTip);  
  tippy('.player-armour-tip');  

  const playerRunicTip = 'Runic attribute improves spells and their effects.';
  $('.player-runic-tip').prop(title, playerRunicTip);  
  tippy('.player-runic-tip');  

  const playerManaTip = 'PP represents the cost for casting spells. 25 PP is recharged per turn.';
  $('.player-mana-tip').prop(title, playerManaTip);
  tippy('.player-mana-tip');

  const monsterRageTip = 'Rage is aquired over time, and allows Monsters to have additional spells and effects.';
  $('.monster-rage-tip').prop(title, monsterRageTip);
  tippy('.monster-rage-tip');
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

  const mageSpellW = '<b>Alzur\'s Thunder (100 PP)</b> - Deal 1d8 ' + damageIcon + ' and apply <i>Shocked</i>. Shock deals bonus 1d4 ' + damageIcon + ' for ' + runicIcon + ' turns.';
  $('.w').prop(title, mageSpellW);
  tippy('.w');
}

const monsterInit = function() {
  Stats.monsterArmour = 10;
  Stats.monsterDamage = 8;
  Stats.monsterHealth = 20;  
  Stats.monsterRage = 69;
}

const scorch = function() {

  Stats.playerMana = Stats.playerMana - 75;

  let base = roll(2);   
  let bonusRes = bonus(Stats.playerRunic, 2);
  let total = base + bonusRes;

  if(DEV) {
    console.log('Scorch base AC-ignore roll: ' + base);
    console.log('Scorch bonus AC-ignore roll: ' + bonusRes);
  }

  let result = attack(10, 0, 0, 1, Stats.monsterArmour - total);

  if(result != null) {
    log('You <i>Scorch</i> for ' + result + ' damage!', 'ps-scorch');
    monsterHealthHelper(result);
    
  } else {
    log('You missed Scorch!', 'miss-player');
  }

  endTurn(result);

}

const alzurs_thunder = function() {

  Stats.playerMana = Stats.playerMana - 75;

  
  
}

$(".character-selection").hide();
init('mage');

for (let i = 0 ; i < 100 ; i++ ) {
  // console.log(getRandomInt(5));
}