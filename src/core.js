// Open Live-reload in dev env.
// Webpack - load in modules when needed.
// Refactor html

import { roll, attack, pureAttack, bonus } from './rollattack';
import { log } from './log';
import { disable, enable } from './disable';
import { DEV } from './dev';
import Stats from './stats';
import { manaCheck } from './mana';
import {
  selectWeapon,
  selectAmulet,
  selectTrinket,
  wand_desc,
  amulet_desc,
  trinket_desc,
  shop,
  setShopItem,
  getGold,
} from './equipment';
import {
  alzursThunderCondition,
  deathfireGraspCondition,
  runicEchoesCondition,
  sapphireAmuletCondition,
  dwarfTankCondition,
  monsterDead,
} from './conditions';


if (DEV) {
  log('BUILD ALPHA 0.2.26 - Amulet, Trinket, Wand', 'info');
}

// Add items for other classes. Desc refers to array in equipment.js
const mageItem = [
  { name: 'Oak Wand', type: 'weapon', gold: 5, desc: 0 },
  { name: 'Sapphire Amulet', type: 'amulet', gold: 1, desc: 0 },
  { name: 'Magical Stick', type: 'trinket', gold: 1, desc: 0 },
  { name: 'Ebony Wand', type: 'weapon', gold: 1, desc: 1 },
  { name: 'Emerald Amulet', type: 'amulet', gold: 1, desc: 1 },
  { name: 'Cursed Locket', type: 'trinket', gold: 1, desc: 1 },
  { name: 'Elder Wand', type: 'weapon', gold: 1, desc: 2 },
  { name: 'Ruby Amulet', type: 'amulet', gold: 1, desc: 2 },
  { name: 'Ancient Coin', type: 'trinket', gold: 1, desc: 2 },
  { name: 'Null Sphere', type: 'trinket', gold: 1, desc: 3 },
];

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

const goblin = {
  name: 'Wormface, the Goblin',
  monsterHealth: 20,
  monsterArmour: 4,
  monsterDamage: 4,
  monsterRage: 0,
  src: 'res/mobs/goblin.png',
  names: ['Wormface', 'Grubhead', 'Fartbreath', 'Poopnose', 'Wormhair'],
  turn() {
    const result = roll(100);       
    if (DEV) {
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
    const result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
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
    if (Stats.monsterRage >= 20) {
      if(DEV) {
        console.log('@Ent Rage')
      }
      Stats.monsterRage = 0;

      let result = roll(100);
      if (result > 75) { 
        this.basicAttack();
      } else {
        this.basicAttack();
      }
    } else {
      Stats.monsterRage = Stats.monsterRage + 20;
      this.basicAttack();
    }
  },
  basicAttack() {
    let result = pureAttack(Stats.monsterDamage, 0, 0, 1, Stats.playerArmour);
    if (result != null) {
      playerHealthHelper(result);
      log('Ent hits for ' + result + ' damage!', 'mb');
    } else {
      log('Ent missed.', 'miss');
    }
    endTurnMonster(result);
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

  if (dwarfTankCondition.active == true) {
    dwarfTankCondition.active = false;
    Stats.monsterArmour = Stats.monsterArmour - dwarfTankCondition.bonusArmour;
  }
  
  $('.player-graphic').addClass('poke-right');

  if (monsterDead.active == true) {
    $('.monster-graphic').addClass('spawn');
    monsterDead.active = false;
  } else {
    $('.monster-graphic').addClass('monster-flail');
  }  

  if (sapphireAmuletCondition.active == true) {
    Stats.playerMaxMana = 125;
  } else {
    Stats.playerMaxMana = 100;
  }
  
  if (Stats.playerMana + 25 >= Stats.playerMaxMana) {
    Stats.playerMana = Stats.playerMaxMana;
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
    $('.monster-graphic').removeClass('spawn');
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
  }, 1800);
}

const endTurnMonster = function(result) {
  if (result) {
    $('.player-health').addClass('animated jello');
  }

  if(Stats.monsterRage > 0) {
    $('.monster-rage').addClass('colour-rage-add');
  }
  
  if (dwarfTankCondition.active == true) {
    $('.monster-armour').addClass('colour-rage-add');
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
    $('.monster-armour').removeClass('colour-rage-add');
    $('.monster-rage').removeClass('colour-rage-add');
  }, 500);
  setTimeout(() => {
    $('.monster-graphic').removeClass('poke-left');
    $('.player-graphic').removeClass('player-flail');
  }, 750);
}

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

const mageInit = function () {
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

  weaponModal.setContent(wand_desc[0]);
  weaponModal.addFooterBtn('Oak Wand', 'spell-equipment wand-button', function() {
    selectWeapon('Oak Wand');
    updateStats();
    weaponModal.close();
  });

  amuletModal.setContent('<h2>Select Amulet</h2><p>You don\'t have any amulets yet.');
  amuletModal.addFooterBtn('None', 'spell-amulet', function() {
    selectAmulet('None');
    updateStats();
    amuletModal.close();
  });

  trinketModal.setContent('<h2>Select Trinket</h2><p>You don\'t have any trinkets yet.');
  trinketModal.addFooterBtn('None', 'spell-trinket', function() {
    updateStats();
    trinketModal.close();
  });

  shopModal.setContent('<div class="shop-interface" id="shop"></div>');
  setShopItem('Healing Potion', 'Heals for 1d10 + 10 HP.', 'ra-heart-bottle', 'potion-health', '15', 'buy-health');
  setShopItem('Healing Potion', 'Heals for 1d10 + 10 HP.', 'ra-heart-bottle', 'potion-health', '15', 'buy-health');
  setShopItem('Healing Potion', 'Heals for 1d10 + 10 HP.', 'ra-heart-bottle', 'potion-health', '15', 'buy-health');
  setShopItem('Healing Potion', 'Heals for 1d10 + 10 HP.', 'ra-heart-bottle', 'potion-health', '15', 'buy-health');
  setShopItem('Healing Potion', 'Heals for 1d10 + 10 HP.', 'ra-heart-bottle', 'potion-health', '15', 'buy-health');

  shopModal.setFooterContent(getGold());

  document.getElementById('equipment-weapon').addEventListener('click', () => {
    weaponModal.open();
  });

  document.getElementById('equipment-amulet').addEventListener('click', () => {
    amuletModal.open();
  });

  document.getElementById('equipment-trinket').addEventListener('click', () => {
    trinketModal.open();
  });

  document.getElementById('equipment-shop').addEventListener('click', () => {
    shopModal.setFooterContent(getGold());
    shopModal.open();
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

  const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
  const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
  const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';

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

  const weaponTip = 'Switch Weapon - Weapons affect your hit chance.';
  $('#equipment-weapon').prop(title, weaponTip);
  tippy('#equipment-weapon');

  const amuletTip = 'Switch Amulet - Amulets can affect ' + damageIcon + ' and ' + armourIcon + ' .';
  $('#equipment-amulet').prop(title, amuletTip);
  tippy('#equipment-amulet');

  const trinketTip = 'Switch Trinket - Trinkets affect all attributes.';
  $('#equipment-trinket').prop(title, trinketTip);
  tippy('#equipment-trinket');

  const shopTip = 'Browse Shop - Buy potions with gold.';
  $('#equipment-shop').prop(title, shopTip);
  tippy('#equipment-shop');
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

const trinketModal = new tingle.modal({
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

const shopModal = new tingle.modal({
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
    weaponModal.addFooterBtn(item.name, 'spell-equipment wand-button', () => {
      selectWeapon(item.name);
      updateStats();      
      weaponModal.close();
    });
    
    weaponModal.setContent(wand_desc[item.desc]);
    
  }

  if (item.type === 'amulet') {
    amuletModal.addFooterBtn(item.name, 'spell-amulet wand-button', () => {
      selectAmulet(item.name);
      updateStats();      
      amuletModal.close();
    });

    amuletModal.setContent(amulet_desc[item.desc]);  
  }

  if (item.type === 'trinket') {
    trinketModal.addFooterBtn(item.name, 'spell-trinket wand-button', () => {
      selectTrinket(item.name);
      updateStats();      
      trinketModal.close();
    });
    trinketModal.setContent(trinket_desc[item.desc]);
  }

  // Handles gold income and logging. 
  if (item.gold > 0) {
    Stats.gold += item.gold;
    log('Loot: ' + item.name + ' (' + item.type + ') and ' + item.gold + ' gold.', 'victory');
  } else {
    log('Loot: ' + item.name + ' (' + item.type + ').', 'victory');
  }

  

  currentMonster = getNextMonster(Stats.playerLevel);

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

const getNextMonster = function(level) {
  switch(level) {
    case 0:
    return chicken;
    break;

    case 1:
    return goblin;
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

$(".character-selection").hide();

init('mage');

// let turnCount = 0;
// const sim = setInterval(function(){  
//   if(turnCount < 10) {
//     turnCount++;
//     playerTurnBasicAttack();
//   } else {
//     clearInterval(sim);
//   }  
// }, 2500);