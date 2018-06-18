// Open Live-reload in dev env.
// Webpack - load in modules when needed.
// Refactor html

const DEV = true; 

let playerHealth = 0;
let playerArmour = 0;
let playerDamage = 0;
let playerRunic = 0;
let playerMana = 0;

let monsterArmour = 0;
let monsterDamage = 0;
let monsterRage = 0;


let playerHitChanceModifier = 0;

const log = function(message, style) {
  let logStyle = styleHandler(style);
  let logSize = $('.list').children().length;
  let logMessage = '<li>' + message + '</li>';
  let prepared = $(logMessage).addClass(logStyle);  
  if (logSize < 8) {    
    $('ul.list').prepend(prepared);
  }
  else {
    $('.list li').last().remove();
    $('ul.list').prepend(prepared);
  }

}

const styleHandler = function(style) {
  switch(style) {
    // Monster basic
    case 'mb':
    return 'log log-monster-basic animated slideInDown';

    case 'ms':
    return 'log log-monster-spell animated bounceIn';

    case 'miss':
    return 'log log-miss animated slideInDown';

    case 'miss-player':
    return 'log log-player-miss animated slideInDown';

    case 'pb':
    return 'log log-player-basic animated slideInDown';

    default:
    console.log('Error in styleHandler');
    break;
  }
}

const roll = function(n) {
  let min = 1;
  let max = Math.floor(n);
  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}


const attack = function playerAttack(playerDamage, playerHitChanceModifier, playerDamageModifier, playerMultiplier, monsterArmour) {
  let result = 0;
  let hit = roll(20) + playerHitChanceModifier;  
  if (hit >= monsterArmour) {
    for (let i = 0; i < playerMultiplier; i++) {
      result += roll(playerDamage);
    }
    result += playerDamageModifier;    
    return result;
  }
  return result = null;
}

const goblin = {
  monsterArmour: 5,
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
  let result = attack(playerDamage, playerHitChanceModifier, 0, 1, currentMonster.monsterArmour);
  if (result != null) {      
    log('You hit for ' + result + ' damage!', 'pb');
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
}

const mageInit = function() {
  playerHealth = 100;
  playerDamage = 10;
  playerArmour = 8;
  playerRunic = 2;
  playerMana = 100;

  updateStats();

  $('.w').addClass('spell spell-dragon-breath');
  $('.wi').addClass('ra ra-dragon-breath icon');

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
  tippyMage();
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

  const mageSpellQ = '<b>Scorch (50 SP)</b>: Ignore 1d2 AC and deal 1d10 damage. Ignore an additional ' + playerRunic + 'd2 AC with Runic level.';
  $('.q').prop(title, mageSpellQ);
  tippy('.q');
}

console.log(currentMonster);
$(".character-selection").hide();
init('mage');

