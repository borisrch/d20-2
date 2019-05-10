/* eslint-disable no-restricted-syntax */
import Items from './wizard-item-store';

let selectedItemType = null;

const typeArmour = document.getElementById('type-armour');
const typeTrinket = document.getElementById('type-trinket');
const typeRing = document.getElementById('type-ring');

const itemName = document.getElementById('item-name');
const itemIcon = document.getElementById('item-icon');
const itemDesc = document.getElementById('item-desc-main');
const itemLore = document.getElementById('item-desc-lore');

const grid = document.getElementById('item-grid');

const updateItemDescription = (e) => {
  const selected = document.querySelector('.item-selected');
  if (selected !== null) {
    selected.classList.remove('item-selected');
  }
  e.target.parentElement.classList.add('item-selected');

  const item = Items.getItem(e.target.id);
  itemIcon.src = item.src;
  itemName.innerText = item.name;
  itemDesc.innerHTML = item.desc;
  itemLore.innerText = item.lore;
};

const removeItems = () => {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
};

const setItemsFromArray = (items) => {
  removeItems();
  let count = 1;
  // eslint-disable-next-line guard-for-in
  for (let i in items) {
    // max items = 12.
    if (count > 12) {
      throw new Error('Too many items.');
    }
    const container = document.createElement('div');
    container.classList.add('item', `item-${count}`);
    container.id = `item-${count}`;
    const image = document.createElement('img');
    image.src = items[i].src;
    image.id = items[i].id;
    image.draggable = false;
    image.classList.add('item-size');
    image.addEventListener('click', updateItemDescription);

    container.appendChild(image);
    grid.appendChild(container);
    // select 1st item.
    if (count === 1) {
      image.click();
    }
    count += 1;
  }
};

const updateItemType = (e) => {
  if (selectedItemType === e.target.id) {
    return;
  }
  selectedItemType = e.target.id;

  typeArmour.parentElement.classList.remove('type-selected');
  typeArmour.src = '/res/interface/armoury/armour.png';

  typeTrinket.parentElement.classList.remove('type-selected');
  typeTrinket.src = '/res/interface/armoury/trinket.png';

  typeRing.parentElement.classList.remove('type-selected');
  typeRing.src = '/res/interface/armoury/ring.png';

  e.target.parentElement.classList.add('type-selected');

  if (selectedItemType === 'type-armour') {
    typeArmour.src = '/res/interface/armoury/armour-active.png';
    setItemsFromArray(Items.armour);
  } else if (selectedItemType === 'type-trinket') {
    typeTrinket.src = '/res/interface/armoury/trinket-active.png';
    setItemsFromArray(Items.trinkets);
  } else if (selectedItemType === 'type-ring') {
    typeRing.src = '/res/interface/armoury/ring-active.png';
    setItemsFromArray(Items.rings);
  } else {
    throw new Error(e.target.id);
  }
};

const InitializeArmouryInterface = () => {
  const addItemTypeEventListeners = () => {
    typeArmour.addEventListener('click', updateItemType);
    typeTrinket.addEventListener('click', updateItemType);
    typeRing.addEventListener('click', updateItemType);
    typeArmour.click();
  };
  addItemTypeEventListeners();
};

export default InitializeArmouryInterface;
