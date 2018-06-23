// Open Live-reload in dev env.
// Webpack - load in modules when needed.
// Refactor html

import { roll, attack } from './rollattack';
import { log } from './log';
import { DEV } from './dev';

if(DEV) {
  log('BUILD ALPHA 0.2.8', 'pb');
}

let playerHealth = 0;
let playerArmour = 0;
let playerDamage = 0;
let playerRunic = 0;
let playerMana = 0;

let monsterHealth = 0;
let monsterArmour = 0;
let monsterDamage = 0;
let monsterRage = 0;

let playerHitChanceModifier = 0;

const goblin = {
  monsterArmour: 15,
  monsterDamage: 4,
  monsterRage: 0,
  monsterTurnAttack() {
    let result = roll(100);
    
    if(DEV) {
      console.log('Goblin Abilty Chance ' + result)
    }

    if (result > 75) {      
      this.goblinSpit();
    } else {
      this.basicAttack();
    }
  },
  basicAttack() {
    let result = attack(this.monsterDamage, 0, 0, 1, playerArmour);
    if (result != null) {      
      log('Goblin hits for ' + result + ' damage!', 'mb');
    } else {
      log('Goblin missed.', 'miss');
    }
  },
  goblinSpit() {
    let result = attack(this.monsterDamage, 1, 0, 1, playerArmour);
    if (result != null) {
      log('Goblin uses <i>Goblin Spit</i> for ' + result + ' damage!', 'ms');
    } else {
      log('Goblin missed.', 'miss');
    }
  }
}

// Must Define After Monster, but before Basic Attack

let currentMonster = goblin;

const playerTurnBasicAttack = function() {
  let result = attack(playerDamage, playerHitChanceModifier, 0, 1, monsterArmour);
  if (result != null) {
    if(monsterHealth - result < 0) {
      monsterHealth = 0;
      log('You have slain Goblin!', 'pb');
    } else {
      monsterHealth = monsterHealth - result;
      log('You hit for ' + result + ' damage!', 'pb');
    }        
    updateStats();
  } else {
    log('You missed.', 'miss-player');
  }
}

const playerTurnSpellAttack = function spellHandler(spell) {
  switch (spell) {
    case 'Magic Missile':
    magicMissile();
    break;

    default:
    console.log('Error in spellHandler');
  }
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
  playerHealth = 100;
  playerDamage = 10;
  playerArmour = 8;
  playerRunic = 2;
  playerMana = 100;

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


}

const updateStats = function () {
  $('.player-health').text(playerHealth);
  $('.player-damage').text(playerDamage);
  $('.player-armour').text(playerArmour);
  $('.player-runic').text(playerRunic);
  $('.player-mana').text(playerMana);

  $('.monster-health').text(monsterHealth);
  $('.monster-armour').text(monsterArmour);
  $('.monster-damage').text(monsterDamage);
  $('.monster-rage').text(monsterRage);
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

  const basicAttackTip = '<b>Basic Attack:</b> Deal 1d' + playerDamage + ' damage.';
  $('.basic-attack').prop(title, basicAttackTip);
  tippy('.basic-attack');

  const mageSpellQ = '<b>Scorch (50 PP)</b>: Ignore 1d2 AC and deal 1d10 damage. Ignore an additional 1d2 AC per Runic level.';
  $('.q').prop(title, mageSpellQ);
  tippy('.q');
}

const monsterInit = function() {
  monsterArmour = 0;
  monsterDamage = 8;
  monsterHealth = 20;  
  monsterRage = 69;
}

console.log(currentMonster);
$(".character-selection").hide();
init('mage');
