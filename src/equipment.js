import Stats from './stats';
import { sapphireAmuletCondition } from './conditions';
import { roll } from './rollattack';

const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';
const manaIcon = '<span class="ra ra-lightning-bolt colour-mana"></span>';

export const selectWeapon = function(weapon) {
  switch(weapon) {
    case 'Oak Wand':
    Stats.playerRunic = 2;
    Stats.playerHitChanceModifier = 0;
    break;

    case 'Ebony Wand':
    Stats.playerRunic = 3;
    Stats.playerHitChanceModifier = 2;
    break;

    case 'Elder Wand':
    Stats.playerRunic = 4;
    Stats.playerHitChanceModifier = 3;
    break;

    default:
    throw new Error('Error at selectWeapon');
    break;
  }
}

const oak_wand_desc = '<h2>Equip Wand</h2> <b>Oak Wand</b>: +2 to ' + runicIcon + ' . <br>';
const ebony_wand_desc = '<b>Ebony Wand</b>: +2 to hit chance,  +3 to ' + runicIcon + ' . <br>';
const elder_wand_desc = '<b>Elder Wand</b>: +3 to hit chance,  +4 to ' + runicIcon + ' . <br>';

export const wand_desc = [oak_wand_desc, oak_wand_desc + ebony_wand_desc, oak_wand_desc + ebony_wand_desc + elder_wand_desc];

export const selectAmulet = function(amulet) {
  switch(amulet) {
    case 'None':
    sapphireAmuletCondition.active = false;
    break;

    case 'Sapphire Amulet':
    sapphireAmuletCondition.active = true;
    break;

    case 'Emerald Amulet':
    sapphireAmuletCondition.active = false;
    Stats.playerArmour = Stats.playerArmour + 2;
    break;

    case 'Ruby Amulet':
    break;

    default:
    throw new Error('Error at selectAmulet');
    break;
  }
}

const sapphire_amulet_desc = '<h2>Equip Amulet</h2> <b>Sapphire Amulet</b>: +25 to maximum ' + manaIcon + '.<br>';
const emerald_amulet_desc = '<b>Emerald Amulet</b>: +2 to ' + armourIcon + '.<br>';
const ruby_amulet_desc = '<b>Ruby Amulet</b>: +15% lifesteal. <br>';

export const amulet_desc = [sapphire_amulet_desc, sapphire_amulet_desc + emerald_amulet_desc, sapphire_amulet_desc + emerald_amulet_desc + ruby_amulet_desc];

export const selectTrinket = function(trinket) {
  switch(trinket) {
    case 'None':

    break;

    case 'Magical Stick':
    
    break;

    case 'Cursed Locket':

    break;

    case 'Ancient Coin':
    break;


    case 'Null Sphere':
    break;

    default:
    throw new Error('Error at selectTrinket');
    break;
  }
}

const magical_stick_desc = '<h2>Equip Trinket</h2> <b>Slightly Magical Stick</b>: +1 to ' + runicIcon + '.<br>';
const cursed_locket_desc = '<b>Susannah\'s Cursed Locket</b>: +2 to ' + runicIcon + ' but -2 to ' + armourIcon + '.<br>';
const ancient_coin_desc = '<b>Ancient Coin</b>: +3 to ' + runicIcon + ' and ' + damageIcon + ' but -5 to ' + armourIcon +'.<br>';
const null_sphere_desc = '<b>Null Sphere</b>: -25 % to ' + manaIcon + ' cost. <br>';

export const trinket_desc = [magical_stick_desc, magical_stick_desc + cursed_locket_desc, magical_stick_desc + cursed_locket_desc + ancient_coin_desc, magical_stick_desc + cursed_locket_desc + ancient_coin_desc + null_sphere_desc];

export const potions = [
  { 
    name: 'Healing Potion',
    desc: 'Heals for 1d10 + 10 HP.',
    icon: 'ra-heart-bottle',
    style: 'potion-health',
    cost: '15',
    id: 'buy-health'
  },
  { 
    name: 'Accuracy Potion',
    desc: 'Increases hit chance by 1d4 for next 4 turns.',
    icon: 'ra-corked-tube',
    style: 'potion-accuracy',
    cost: '25',
    id: 'buy-accuracy',
  },
  { 
    name: 'Defense Potion',
    desc: 'Increases AC by 1d4 + 2 for next 4 turns.',
    icon: 'ra-round-bottom-flask',
    style: 'potion-defense',
    cost: '35',
    id: 'buy-defense',
  },
  { 
    name: 'PP Potion',
    desc: 'Restores 75 PP.',
    icon: 'ra-bubbling-potion',
    style: 'potion-pp',
    cost: '50',
    id: 'buy-pp',
  },
  { 
    name: 'Runic Potion',
    desc: 'Grants 1d2 + 2 bonus Runic for next 4 turns.',
    icon: 'ra-fizzing-flask',
    style: 'potion-runic',
    cost: '75',
    id: 'buy-runic',
  },
];

export const getGold = () => {
  return '<div>Current gold: ' + Stats.gold +'</div>';
}

export const setShopItem = (potionName, potionDescription, ra, style, potionCost, id) => {
  let shopDesc = document.createElement('div');
  shopDesc.classList.add('shop-desc');
  
  let potion = document.createElement('p');
  potion.innerText = potionName + ': ';
  
  let description = document.createElement('p');
  description.innerText = potionDescription

  let icon = document.createElement('span');
  icon.classList.add('ra');
  icon.classList.add(ra);
  icon.classList.add(style);
  icon.classList.add('shop-icon');
  
  let cost = document.createElement('p');
  cost.innerText = potionCost + ' gold.';

  let button = document.createElement('button');
  button.innerText = 'Buy';
  button.classList.add('spell-potion');
  button.setAttribute('id', id);

  let shopItem = document.createElement('div');
  shopItem.classList.add('shop-item');

  potion.appendChild(description);
  shopDesc.appendChild(potion);

  shopItem.appendChild(icon);
  shopItem.appendChild(shopDesc);
  shopItem.appendChild(cost);
  shopItem.appendChild(button);

  const shop = document.getElementById('shop');
  shop.appendChild(shopItem);
}

