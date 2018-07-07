// Open Live-reload in dev env.
// Webpack - load in modules when needed.
// Refactor html

import { roll, attack, pureAttack, bonus, getRandomInt } from './rollattack';
import { log } from './log';
import { disable, enable } from './disable';
import { DEV } from './dev';
import Stats from './stats';
import { manaCheck } from './mana';
import { alzursThunderCondition, deathfireGraspCondition, runicEchoesCondition } from './conditions';
import { selectWeapon } from './equipment';

import MicroModal from 'micromodal';

if(DEV) {
  log('BUILD ALPHA 0.2.26 - Enable Source Maps, Debug', 'info');
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

// Add items for other classes
let mageItem = [
  { name: 'Oak Wand', type: 'weapon' },
  { name: 'Ebony Wand', type: 'weapon' },
  { name: 'Seismic Wand', type: 'weapon' },
  { name: 'Elder Wand', type: 'weapon' }
]


const chicken = {
  name: 'Chicken',
  monsterHealth: 10,
  monsterArmour: 0,
  monsterDamage: 2,
  monsterRage: 0,
  turn() {

  },
  basicAttack() {

  }
}

const goblin = {
  name: 'Wormface, the Goblin',
  monsterHealth: 20,
  monsterArmour: 15,
  monsterDamage: 4,
  monsterRage: 0,
  names: ['Wormface', 'Grubhead', 'Fartbreath', 'Poopnose', 'Wormhair'],
  turn() {
    let result = roll(100);
    
    if(DEV) {
      console.log('@GoblinTurn');
      console.log('Goblin Abilty Chance ' + result);
    }

    if (result > 75) {      
      this.goblinSpit();
    } else {
      this.basicAttack();
    }
  },
  basicAttack() {
    let result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log('Goblin hits for ' + result + ' damage!', 'mb');
    } else {
      log('Goblin missed.', 'miss');
    }
    endTurnMonster(result);
  },
  goblinSpit() {
    let result = pureAttack(Stats.monsterDamage, 1, 0, 1, Stats.playerArmour);
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
    log('You have slain ' + Stats.monsterName + '!', 'victory');
    advance();
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

  if (runicEchoesCondition.active == true) {
    $('.player-armour').addClass('colour-mana-add');
  }
  
  $('.player-graphic').addClass('poke-right');
  $('.monster-graphic').addClass('monster-flail');
  
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
    $('.player-graphic').removeClass('poke-right');
    $('.monster-graphic').removeClass('monster-flail');
  }, 500);

  setTimeout(() => {
    $('.player-mana').removeClass('colour-mana-add');
    $('.player-armour').removeClass('colour-mana-add');
  }, 1000);


  setTimeout(() => {
    currentMonster.turn();     
    setTimeout(() => {
      enable();
    }, 200);    
  }, 2000);
}

const endTurnMonster = function(result) {
  if (result) {
    $('.player-health').addClass('animated jello');
  } 

  if (runicEchoesCondition.active == true) {
    Stats.playerArmour = Stats.playerArmour - runicEchoesCondition.bonusArmour;
    runicEchoesCondition.active = false;
  }

  $('.monster-graphic').addClass('poke-left');
  $('.player-graphic').addClass('player-flail');

  updateStats();
  setTimeout(() => {
    $('.player-health').removeClass('animated jello');
  }, 500);
  setTimeout(() => {
    $('.monster-graphic').removeClass('poke-left');
    $('.player-graphic').removeClass('player-flail');
  }, 750);
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
    Stats.playerClass = 'mage';
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

  weaponModal.setContent('<span class="modal-title">Select Weapon</span>');
  weaponModal.addFooterBtn('Oak Wand', 'equipment-icon', function() {
    selectWeapon('oak-wand');
    updateStats();
    weaponModal.close();
  });

  amuletModal.setContent('<span class="modal-title">Select Amulet</span>');
  amuletModal.addFooterBtn('None', 'equipment-icon', function() {
    updateStats();
    amuletModal.close();
  });

  document.getElementById('equipment-weapon').addEventListener('click', () => {
    weaponModal.open();
  });

  document.getElementById('equipment-amulet').addEventListener('click', () => {
    amuletModal.open();
  });

  document.getElementById('basic-attack').addEventListener('click', () => {
    playerTurnBasicAttack();
  });

  document.getElementById('q').addEventListener('click', () => {
    manaCheck(75, scorch);
  });

  document.getElementById('w').addEventListener('click', () => {
    manaCheck(100, alzurs_thunder);
  });

  document.getElementById('e').addEventListener('click', () => {
    manaCheck(50, deathfire_grasp);
  });

  document.getElementById('r').addEventListener('click', () => {
    manaCheck(25, runic_echoes);
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
  $('.monster-label').text(Stats.monsterName);
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

  const weaponTip = 'Change your weapon.';
  $('#equipment-weapon').prop(title, weaponTip);
  tippy('#equipment-weapon');

  const amuletTip = 'Change your amulet.';
  $('#equipment-amulet').prop(title, amuletTip);
  tippy('#equipment-amulet');
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
  Stats.monsterArmour = 4;
  Stats.monsterDamage = 4;
  Stats.monsterHealth = 20;  
  Stats.monsterRage = 0;
  Stats.monsterName = goblin.name;
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
    console.log('@DeathfireGrasp');
    console.log('Active: ' + deathfireGraspCondition.active);
  }

  let result;

  if (deathfireGraspCondition.active == true) {
    let bonusRes = bonus(Stats.playerRunic, 2);
    result = attack(10, Stats.playerHitChanceModifier, bonusRes, 1, Stats.monsterArmour);

  } else {
    result = attack(10, Stats.playerHitChanceModifier, 0, 1, Stats.monsterArmour);
  }
  
  deathfireGraspCondition.active = true;

  if(result != null) {
    log('You invoke <i>Malevolence</i> for ' + result + ' damage!', 'ps-grasp');
    monsterHealthHelper(result);
    
  } else {
    log('You missed Malevolence!', 'miss-player');
  }
  endTurn(result);  

}

const runic_echoes = function() {

  Stats.playerMana = Stats.playerMana - 25;

  let bonusRes = bonus(Stats.playerRunic, 2);

  runicEchoesCondition.active = true;
  runicEchoesCondition.bonusArmour = bonusRes;

  Stats.playerArmour = Stats.playerArmour + bonusRes;

  log('You cast <i>Runic Echoes</i> and boost armour by ' + bonusRes + '!', 'ps-echoes');

  endTurn();
}

const weaponModal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ['button', 'escape'],
  closeLabel: "Close",
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function() {
      
  },
  onClose: function() {
      
  },
  beforeClose: function() {
      // here's goes some logic
      // e.g. save content before closing the modal
      return true; // close the modal
  }
});

const amuletModal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ['button', 'escape'],
  closeLabel: "Close",
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function() {
      
  },
  onClose: function() {
      
  },
  beforeClose: function() {
      return true;
  }
});

// Incomplete function. Add item types to this.
const advance = function() {
  
  if (DEV) {
    console.log('@Advance');
  }

  Stats.playerLevel = Stats.playerLevel + 1;

  // NEED TO ADD CHECK FOR LAST MONSTERS !! if (Stats.playerLevel > 10) or whatever.

  if (Stats.playerLevel > 10) {
    throw new Error('playerLevel exceeds 10. No more monsters');
  }

  let item = mageItem[Stats.playerLevel];

  if (item.type === 'weapon') {
      weaponModal.addFooterBtn(item.name, 'equipment-icon', function() {
      selectWeapon(item.name);
      updateStats();      
      weaponModal.close();
    });
    log(Stats.monsterName + ' dropped: ' + item.name +'!', 'victory');
  }

  if (item.type === 'amulet') {

  }

  if (item.type === 'trinket') {
    
  }

  currentMonster = getNextMonster(Stats.playerLevel);

  Stats.monsterHealth = currentMonster.monsterHealth;
  Stats.monsterDamage = currentMonster.monsterDamage;
  Stats.monsterName = currentMonster.name;
  Stats.monsterRage = 0;

  updateStats();
  
}

const getNextMonster = function(level) {
  switch(level) {
    case 0:
    return goblin;
    break;

    case 1:
    return goblin;
    break;

    default:
    console.log('@Error at getNextMonster');
    return goblin;
    break;
  }
}


$(".character-selection").hide();

init('mage');


for (let i = 0 ; i < 100 ; i++ ) {
  // console.log(getRandomInt(5));
}