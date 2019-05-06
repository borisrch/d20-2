let selectedItemType = null;

const typeArmour = document.getElementById('type-armour');
const typeTrinket = document.getElementById('type-trinket');
const typeRing = document.getElementById('type-ring');

const updateItemDescription = () => {

};

const updateItemType = (e) => {
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
  } else if (selectedItemType === 'type-trinket') {
    typeTrinket.src = '/res/interface/armoury/trinket-active.png';
  } else if (selectedItemType === 'type-ring') {
    typeRing.src = '/res/interface/armoury/ring-active.png';
  } else {
    throw new Error(e.target.id);
  }
};

const InitializeArmouryInterface = () => {
  const addItemTypeEventListeners = () => {
    typeArmour.addEventListener('click', updateItemType);
    typeTrinket.addEventListener('click', updateItemType);
    typeRing.addEventListener('click', updateItemType);
  };
  addItemTypeEventListeners();
};

export default InitializeArmouryInterface;
