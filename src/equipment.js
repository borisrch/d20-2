import tingle from 'tingle.js';

import Stats from './stats';
import {
  sapphireAmuletCondition
} from './conditions';
import {
  roll
} from './rollattack';
import {
  wizardItems
} from './equipment-weapons';
import {
  amulets,
  armour,
  trinkets,
  potions
} from './equipment-store';
import {
  endTurn
} from './turn';

const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';
const manaIcon = '<span class="ra ra-lightning-bolt colour-mana"></span>';

let SELECTED_WEAPON = null;
let SELECTED_AMULET = null;
let SELECTED_POTION = null;
let SELECTED_ARMOUR = null;

export const selectWeapon = function (weapon) {
  switch (weapon) {
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

export const selectAmulet = function (amulet) {
  switch (amulet) {
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

export const selectTrinket = function (trinket) {
  switch (trinket) {
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

export const getGold = () => {
  return '<div>Current gold: ' + Stats.gold + '</div>';
}

export const setShopItem = (potionName, potionDescription, ra, style, potionCost, id) => {

  let shopDesc = document.createElement('div');
  shopDesc.classList.add('shop-desc');

  let potion = document.createElement('p');
  potion.innerText = potionName + '';

  let description = document.createElement('p');
  description.innerText = potionDescription

  let icon = document.createElement('span');
  icon.classList.add('ra');
  icon.classList.add(ra);
  icon.classList.add(style);
  icon.classList.add('shop-icon');

  let cost = document.createElement('div');
  let costDesc = document.createElement('p');
  costDesc.innerText = potionCost + ' gold.';
  costDesc.classList.add('shop-desc');
  let coinImg = document.createElement('img');
  coinImg.src = '/res/common/coin.png';
  coinImg.classList.add('shop-coin');

  let button = document.createElement('button');
  button.innerText = 'Buy';
  button.classList.add('spell-potion');
  button.classList.add('shop-buy');
  button.setAttribute('id', id);

  let shopItem = document.createElement('div');
  shopItem.classList.add('shop-item');

  potion.appendChild(description);
  shopDesc.appendChild(potion);

  cost.appendChild(coinImg);
  cost.appendChild(costDesc);

  shopItem.appendChild(icon);
  shopItem.appendChild(shopDesc);
  shopItem.appendChild(cost);
  shopItem.appendChild(button);

  const shop = document.getElementById('shop');
  shop.appendChild(shopItem);
}

const setEquipmentInterface = () => {

  // Container set up.
  const upperContainer = document.createElement('div');
  upperContainer.className = 'upper-container';
  const lowerContainer = document.createElement('div');
  lowerContainer.className = 'lower-container';

  // Add amulet button.
  const amuletButton = document.createElement('button');
  amuletButton.id = 'equipment-amulet';
  amuletButton.className = 'spell spell-amulet square-button';
  const amuletIcon = document.createElement('span');
  amuletIcon.className = 'ra ra-gem-pendant icon';

  // Add weapon button.
  const weaponButton = document.createElement('button');
  weaponButton.id = 'equipment-weapon';
  weaponButton.className = 'spell spell-weapon square-button';
  const weaponIcon = document.createElement('span');
  weaponIcon.className = 'ra ra-crystal-wand icon';

  // Add armour button.
  const armourButton = document.createElement('button');
  armourButton.id = 'equipment-armour';
  armourButton.className = 'spell spell-armour square-button';
  const armourIcon = document.createElement('span');
  armourIcon.className = 'ra ra-helmet icon';

  // Add trinket button.
  const trinketButton = document.createElement('button');
  trinketButton.id = 'equipment-trinket';
  trinketButton.className = 'spell spell-trinket square-button';
  const trinketIcon = document.createElement('span');
  trinketIcon.className = 'ra ra-ankh icon';

  // Add icons to buttons.
  amuletButton.appendChild(amuletIcon);
  weaponButton.appendChild(weaponIcon);
  trinketButton.appendChild(trinketIcon);
  armourButton.appendChild(armourIcon);

  // Get character image.
  const player = document.createElement('img');
  player.className = 'equipment-player-graphic';
  player.id = 'equipment-player-graphic';
  player.src = 'res/mobs/mage.png';

  // Append elements to containers.
  upperContainer.appendChild(amuletButton);
  upperContainer.appendChild(player);
  upperContainer.appendChild(weaponButton);
  lowerContainer.appendChild(armourButton);
  lowerContainer.appendChild(trinketButton);

  const equipment = document.getElementById('equipment');
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.innerText = 'CHANGE EQUIPMENT';

  equipment.appendChild(title);
  equipment.appendChild(upperContainer);
  equipment.appendChild(lowerContainer);
}

// Update player graphic on equipment modal.
export const updateEquipmentInterface = () => {
  const player = document.getElementById('equipment-player-graphic');
  player.src = Stats.playerGraphic;
}

// Use for initial construction of weapon interface.
const setWeaponInterface = () => {

  const weaponInterface = document.getElementById('weapon-interface');

  const upperContainer = document.createElement('div');
  upperContainer.className = 'upper-container-weapon';
  upperContainer.id = 'upper-container-weapon';

  wizardItems.forEach((weapon) => {

    const weaponGroup = document.createElement('div');
    weaponGroup.className = 'weapon-group';
    weaponGroup.id = weapon.id;

    const name = document.createElement('span');
    name.innerText = weapon.name;
    name.className = 'weapon-group-title';

    const img = document.createElement('img');
    img.src = weapon.img;
    img.className = 'weapon-group-image';

    const stats = document.createElement('div');
    stats.innerHTML = weapon.desc;

    weaponGroup.appendChild(name);
    weaponGroup.appendChild(img);
    weaponGroup.appendChild(stats);
    upperContainer.appendChild(weaponGroup);

  });

  const lowerContainer = document.createElement('div');
  const button = document.createElement('button');
  button.className = 'weapon-interface-button';
  button.id = 'weapon-interface-button';
  button.disabled = true;
  button.innerText = 'SELECT WEAPON';
  lowerContainer.appendChild(button);

  // Append elements before adding logic.  
  weaponInterface.appendChild(upperContainer);
  weaponInterface.appendChild(lowerContainer);

  // Event listeners for each button.
  wizardItems.forEach((weapon) => {
    const item = document.getElementById(weapon.id);
    item.addEventListener('click', () => {
      item.classList.add('weapon-selected');
      SELECTED_WEAPON = weapon.id;

      // TODO: Add button select logic. May need to move modal logic to here for close() function.
      const button = document.getElementById('weapon-interface-button');
      button.disabled = false;
      button.innerText = `Equip ${weapon.name}`;

      const container = document.getElementById('upper-container-weapon');
      Array.from(container.children).forEach((item) => {
        if (item.id != weapon.id) {
          item.classList.remove('weapon-selected');
        }
      });
    });
  });
}

// Use to check if weapon is owned.
export const updateWeaponInterface = () => {
  wizardItems.forEach((weapon) => {
    if (weapon.active == false) {
      const wep = document.getElementById(weapon.id);
      wep.classList.add('weapon-unavailable');
    }
  })
}

const setAmuletInterface = (modal) => {

  const amuletInterface = document.getElementById('amulet-interface');

  const upper = document.createElement('div');
  upper.className = 'item-interface-upper';

  const left = document.createElement('div');
  left.className = 'item-interface-left';
  left.id = 'amulet-left';

  amulets.forEach((item) => {
    const box = document.createElement('div');
    box.className = 'item-box';
    box.id = item.id;
    const img = document.createElement('img');
    img.src = item.src;
    img.className = 'item-img';

    box.appendChild(img);
    left.appendChild(box);
  })

  const right = document.createElement('div');
  right.className = 'item-interface-right';
  right.id = 'amulet-right';

  const img = document.createElement('img');
  img.className = 'item-right-img';
  img.id = 'amulet-item-right-img';

  const name = document.createElement('div');
  name.className = 'item-label';
  name.id = 'amulet-item-label';

  const desc = document.createElement('div');
  desc.className = 'item-desc';
  desc.id = 'amulet-item-desc';

  const lore = document.createElement('div');
  lore.className = 'item-lore';
  lore.id = 'amulet-item-lore';

  right.appendChild(img);
  right.appendChild(name);
  right.appendChild(desc);
  right.appendChild(lore);

  upper.appendChild(left);
  upper.appendChild(right);

  const lower = document.createElement('div');
  const button = document.createElement('button');
  button.className = 'weapon-interface-button';
  button.id = 'amulet-interface-button';
  button.innerText = 'EQUIP RING';

  button.disabled = true;
  button.classList.add('button-disabled');

  lower.appendChild(button);

  amuletInterface.appendChild(upper);
  amuletInterface.appendChild(lower);

  amulets.forEach((amulet) => {
    const item = document.getElementById(amulet.id);
    item.addEventListener('click', () => {
      item.classList.add('item-selected');
      SELECTED_AMULET = amulet.id;

      const button = document.getElementById('amulet-interface-button');
      const newButton = document.createElement('button');
      newButton.className = 'weapon-interface-button';
      newButton.id = 'amulet-interface-button';

      // Checks to see if it is currently equipped.
      if (Stats.playerRing === SELECTED_AMULET) {
        newButton.disabled = true;
        newButton.classList.add('button-disabled');
        newButton.innerText = `${amulet.name} already equipped.`;
      }
      else if (amulet.active === false) {
        newButton.disabled = true;
        newButton.classList.add('button-disabled');
        newButton.innerText = 'Item not owned';
      }
      else {
        newButton.disabled = false;
        newButton.innerText = `Equip ${amulet.name}`;
        newButton.addEventListener('click', () => {
          amulet.action();
          modal.close();
        });
      }

      button.remove();
      lower.appendChild(newButton);

      const img = document.getElementById('amulet-item-right-img');
      img.src = amulet.src;

      const label = document.getElementById('amulet-item-label');
      label.innerText = amulet.name;

      const desc = document.getElementById('amulet-item-desc');
      desc.innerHTML = amulet.desc;

      const lore = document.getElementById('amulet-item-lore');
      lore.innerText = amulet.lore;

      const container = document.getElementById('amulet-left');
      Array.from(container.children).forEach((item) => {
        if (item.id != amulet.id) {
          item.classList.remove('item-selected');
        }
      });

    });
  });
}

export const updateAmuletInterface = () => {
  amulets.forEach((amulet) => {
    if (amulet.active === false) {
      const item = document.getElementById(amulet.id);
      item.classList.add('weapon-unavailable');
    }
  });
  const button = document.getElementById('amulet-interface-button');
  if (SELECTED_AMULET === Stats.playerRing) {
    button.disabled = true;
    button.classList.add('button-disabled');
    button.innerText = `Item already equipped.`;
  } 
  else if (SELECTED_AMULET === null) {
    button.disabled = true;
    button.classList.add('button-disabled');
    button.innerText = 'Select item to equip.';
  }
}

const setArmourInterface = () => {

  const armourInterface = document.getElementById('armour-interface');

  const upper = document.createElement('div');
  upper.className = 'item-interface-upper';

  const left = document.createElement('div');
  left.className = 'item-interface-left';
  left.id = 'armour-left';

  armour.forEach((item) => {
    const box = document.createElement('div');
    box.className = 'item-box';
    box.id = item.id;
    const img = document.createElement('img');
    img.src = item.src;
    img.className = 'item-img';

    box.appendChild(img);
    left.appendChild(box);
  })

  const right = document.createElement('div');
  right.className = 'item-interface-right';
  right.id = 'armour-right';

  const img = document.createElement('img');
  img.className = 'item-right-img';
  img.id = 'armour-item-right-img';

  const name = document.createElement('div');
  name.className = 'item-label';
  name.id = 'armour-item-label';

  const desc = document.createElement('div');
  desc.className = 'item-desc';
  desc.id = 'armour-item-desc';

  const lore = document.createElement('div');
  lore.className = 'item-lore';
  lore.id = 'armour-item-lore';

  right.appendChild(img);
  right.appendChild(name);
  right.appendChild(desc);
  right.appendChild(lore);

  upper.appendChild(left);
  upper.appendChild(right);

  const lower = document.createElement('div');
  const button = document.createElement('button');
  button.className = 'weapon-interface-button';
  button.id = 'armour-interface-button';
  
  button.classList.add('button-disabled');
  button.disabled = true;
  
  button.innerText = 'EQUIP ARMOUR';

  lower.appendChild(button);

  armourInterface.appendChild(upper);
  armourInterface.appendChild(lower);

  armour.forEach((_armour) => {
    const item = document.getElementById(_armour.id);
    item.addEventListener('click', () => {
      item.classList.add('item-selected');
      
      SELECTED_ARMOUR = _armour.id;

      // TODO: Add button select logic. May need to move modal logic to here for close() function.
      const button = document.getElementById('armour-interface-button');
      const newButton = document.createElement('button');
      newButton.className = 'weapon-interface-button';
      newButton.id = 'armour-interface-button';

      if (Stats.playerArmour == SELECTED_ARMOUR) {
        newButton.disabled = true;
        newButton.classList.add('button-disabled');
        newButton.innerText = `${_armour.name} already equipped.`;
      }
      else if (_armour.active == false) {
        newButton.disabled = true;
        newButton.classList.add('button-disabled');
        newButton.innerText = 'Item not owned';
      }
      else {
        newButton.disabled = false;
        newButton.innerText = `Equip ${_armour.name}`;
        newButton.addEventListener('click', () => {
          amulet.action();
          modal.close();
        });
      }

      button.remove();
      lower.appendChild(newButton);

      const img = document.getElementById('armour-item-right-img');
      img.src = _armour.src;

      const label = document.getElementById('armour-item-label');
      label.innerText = _armour.name;

      const desc = document.getElementById('armour-item-desc');
      desc.innerHTML = _armour.desc;

      const lore = document.getElementById('armour-item-lore');
      lore.innerText = _armour.lore;

      const container = document.getElementById('armour-left');
      Array.from(container.children).forEach((item) => {
        if (item.id != _armour.id) {
          item.classList.remove('item-selected');
        }
      });
    });
  });
}

export const updateArmourInterface = () => {
  armour.forEach((_armour) => {
    if (_armour.active == false) {
      const item = document.getElementById(_armour.id);
      item.classList.add('weapon-unavailable');
    }
  });
  const button = document.getElementById('armour-interface-button');
  if (SELECTED_ARMOUR == Stats.playerArmour) {
    button.classList.add('button-disabled');
    button.innerText = `Item already equipped.`;
  } 
  else if (SELECTED_ARMOUR == '') {
    button.classList.add('button-disabled');
    button.innerText = 'Select item to equip.';
  }
}

const setTrinketInterface = () => {

  const trinketInterface = document.getElementById('trinket-interface');

  const upper = document.createElement('div');
  upper.className = 'item-interface-upper';

  const left = document.createElement('div');
  left.className = 'item-interface-left';
  left.id = 'trinket-left';

  trinkets.forEach((item) => {
    const box = document.createElement('div');
    box.className = 'item-box';
    box.id = item.id;
    const img = document.createElement('img');
    img.src = item.src;
    img.className = 'item-img';

    box.appendChild(img);
    left.appendChild(box);
  })

  const right = document.createElement('div');
  right.className = 'item-interface-right';
  right.id = 'trinket-right';

  const img = document.createElement('img');
  img.className = 'item-right-img';
  img.id = 'trinket-item-right-img';

  const name = document.createElement('div');
  name.className = 'item-label';
  name.id = 'trinket-item-label';

  const desc = document.createElement('div');
  desc.className = 'item-desc';
  desc.id = 'trinket-item-desc';

  const lore = document.createElement('div');
  lore.className = 'item-lore';
  lore.id = 'trinket-item-lore';

  right.appendChild(img);
  right.appendChild(name);
  right.appendChild(desc);
  right.appendChild(lore);

  upper.appendChild(left);
  upper.appendChild(right);

  const lower = document.createElement('div');
  const button = document.createElement('button');
  button.className = 'weapon-interface-button';
  button.id = 'trinket-interface-button';
  button.disabled = true;
  button.innerText = 'EQUIP TRINKET';

  lower.appendChild(button);

  trinketInterface.appendChild(upper);
  trinketInterface.appendChild(lower);

  trinkets.forEach((trinket) => {
    const item = document.getElementById(trinket.id);
    item.addEventListener('click', () => {
      item.classList.add('item-selected');
      // SELECTED_AMULET = amulet.id;

      // TODO: Add button select logic. May need to move modal logic to here for close() function.
      const button = document.getElementById('trinket-interface-button');
      button.disabled = false;
      button.innerText = `Equip ${trinket.name}`;

      const img = document.getElementById('trinket-item-right-img');
      img.src = trinket.src;

      const label = document.getElementById('trinket-item-label');
      label.innerText = trinket.name;

      const desc = document.getElementById('trinket-item-desc');
      desc.innerHTML = trinket.desc;

      const lore = document.getElementById('trinket-item-lore');
      lore.innerText = trinket.lore;

      const container = document.getElementById('trinket-left');
      Array.from(container.children).forEach((item) => {
        if (item.id != trinket.id) {
          item.classList.remove('item-selected');
        }
      });
    });
  });
}

const setShopInterface = (modal) => {

  const shopInterface = document.getElementById('shop-interface');

  const upper = document.createElement('div');
  upper.className = 'item-interface-upper';

  const leftContainer = document.createElement('div');
  leftContainer.className = 'item-interface-left-container';

  const left = document.createElement('div');
  left.className = 'item-interface-left';
  left.id = 'shop-left';

  potions.forEach((item) => {
    const box = document.createElement('div');
    box.className = 'item-box';
    box.id = item.id;
    const img = document.createElement('img');
    img.src = item.src;
    img.className = 'item-img';

    box.appendChild(img);
    left.appendChild(box);
  });

  const leftLower = document.createElement('div');
  leftLower.className = 'item-interface-left-lower';
  leftLower.id = 'shop-player-gold';
  leftLower.innerHTML = '<span class="ra ra-ball item-gold"></span> ' + `${Stats.gold}`;

  const right = document.createElement('div');
  right.className = 'item-interface-right';
  right.id = 'shop-right';

  const img = document.createElement('img');
  img.className = 'item-right-img';
  img.id = 'shop-item-right-img';

  const name = document.createElement('div');
  name.className = 'item-label';
  name.id = 'shop-item-label';

  const desc = document.createElement('div');
  desc.className = 'item-desc';
  desc.id = 'shop-item-desc';

  const lore = document.createElement('div');
  lore.className = 'item-lore';
  lore.id = 'shop-item-lore';

  right.appendChild(img);
  right.appendChild(name);
  right.appendChild(desc);
  right.appendChild(lore);

  leftContainer.appendChild(left);
  leftContainer.appendChild(leftLower);

  upper.appendChild(leftContainer);
  upper.appendChild(right);

  const lower = document.createElement('div');
  const button = document.createElement('button');
  button.className = 'weapon-interface-button';
  button.id = 'shop-interface-button';
  button.disabled = true;
  button.innerText = 'BUY POTION';

  lower.appendChild(button);

  shopInterface.appendChild(upper);
  shopInterface.appendChild(lower);

  potions.forEach((potion) => {
    const item = document.getElementById(potion.id);
    item.addEventListener('click', () => {
      item.classList.add('item-selected');
      SELECTED_POTION = potion.id;

      // TODO: Add button select logic. May need to move modal logic to here for close() function.
      const button = document.getElementById('shop-interface-button');
      
      const newButton = document.createElement('button');
      newButton.className = 'weapon-interface-button';
      newButton.id = 'shop-interface-button';
      newButton.disabled = false;
      newButton.innerHTML = 'BUY <span class="ra ra-ball item-gold"></span> ' + `${potion.cost}`;
      newButton.addEventListener('click', () => {
        potion.action();
        modal.close();
      });
      
      button.remove();
      lower.appendChild(newButton);

      const img = document.getElementById('shop-item-right-img');
      img.src = potion.src;

      const label = document.getElementById('shop-item-label');
      label.innerText = potion.name;

      const desc = document.getElementById('shop-item-desc');
      desc.innerHTML = `${potion.desc}`;

      const lore = document.getElementById('shop-item-lore');
      lore.innerText = potion.lore;

      const container = document.getElementById('shop-left');
      Array.from(container.children).forEach((item) => {
        if (item.id != potion.id) {
          item.classList.remove('item-selected');
        }
      });
    });
  });
}

export const updateShopInterface = () => {
  const gold = document.getElementById('shop-player-gold');
  gold.innerHTML = '<span class="ra ra-ball item-gold"></span> ' + `${Stats.gold}`;
  
  potions.forEach((potion) => {
    if (potion.cost > Stats.gold) {
      const item = document.getElementById(potion.id);
      item.classList.add('weapon-unavailable');
    }
  });
}

export const buildInterface = () => {
  // Modal instantiation.
  const weaponModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['button', 'escape'],
    closeLabel: "Close",
    beforeClose: function () {
      return true;
    }
  });
  const amuletModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['button', 'escape'],
    closeLabel: "Close",
    beforeClose: function () {
      return true;
    }
  });
  const equipmentModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'escape'],
    closeLabel: "Close",
    cssClass: ['test'],
    onOpen: function () {},
  });
  const armourModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['button', 'escape'],
    closeLabel: "Close",
    onOpen: function () {},
  });
  const trinketModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['button', 'escape'],
    closeLabel: "Close",
    onOpen: function () {},
  });
  const shopModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['button', 'escape'],
    closeLabel: "Close",
    onOpen: function () {},
  });

  // Build interfaces.
  weaponModal.setContent('<div id="weapon-interface"></div>');
  setWeaponInterface();

  amuletModal.setContent('<div id="amulet-interface"></div>');
  setAmuletInterface(amuletModal);

  equipmentModal.setContent('<div id="equipment"></div>');
  setEquipmentInterface();

  armourModal.setContent('<div id="armour-interface"></div>');
  setArmourInterface();

  trinketModal.setContent('<div id="trinket-interface"></div>');
  setTrinketInterface();

  shopModal.setContent('<div id="shop-interface"></div>');
  setShopInterface(shopModal);

  // Add event listeners.
  document.getElementById('equipment-weapon').addEventListener('click', () => {
    equipmentModal.close();
    updateWeaponInterface();
    weaponModal.open();
  });
  document.getElementById('equipment-amulet').addEventListener('click', () => {
    equipmentModal.close();
    updateAmuletInterface();
    amuletModal.open();
  });
  document.getElementById('equipment-new').addEventListener('click', () => {
    updateEquipmentInterface();
    equipmentModal.open();
  });
  document.getElementById('equipment-amulet').addEventListener('click', () => {
    equipmentModal.close();
    updateAmuletInterface();
    amuletModal.open();
  });
  document.getElementById('equipment-armour').addEventListener('click', () => {
    equipmentModal.close();
    updateArmourInterface();
    armourModal.open();
  });
  document.getElementById('equipment-trinket').addEventListener('click', () => {
    equipmentModal.close();
    
    trinketModal.open();
  });
  document.getElementById('equipment-shop').addEventListener('click', () => {
    updateShopInterface();
    shopModal.open();
  });
}

