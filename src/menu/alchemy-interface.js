import Spells from './wizard-spell-store';

let draggedSpell = null;
let draggedSpellElement = null;

const slots = ['slot-1', 'slot-2', 'slot-3', 'slot-4'];
const spellId = [
  {
    name: 'arcane-blast',
    container: 'spell-1',
  },
  {
    name: 'arcane-blitz',
    container: 'spell-2',
  },
  {
    name: 'arcane-barrage',
    container: 'spell-3',
  },
  {
    name: 'scorch',
    container: 'spell-4',
  },
  {
    name: 'incinerate',
    container: 'spell-5',
  },
  {
    name: 'blaze',
    container: 'spell-6',
  },
  {
    name: 'frostbolt',
    container: 'spell-7',
  },
  {
    name: 'ice-spike',
    container: 'spell-8',
  },
  {
    name: 'flurry',
    container: 'spell-9',
  },
  {
    name: 'prismatic-shield',
    container: 'spell-10',
  },
  {
    name: 'nimbus',
    container: 'spell-11',
  },
  {
    name: 'rune-flux',
    container: 'spell-12',
  },
];

const icon = document.getElementById('spell-icon');
const name = document.getElementById('spell-name');
const type = document.getElementById('spell-type');
const desc = document.getElementById('spell-desc-main');
const info = document.getElementById('spell-desc-info');
const lore = document.getElementById('spell-desc-lore');

const updateSpellDescription = (spellName) => {
  const spell = Spells.getSpell(spellName);

  icon.src = spell.src;
  icon.className = spell.anim;
  name.innerText = spell.name;
  name.className = '';
  name.classList.add('spell-name', spell.colour);
  type.innerText = spell.type;
  desc.innerHTML = spell.desc;

  if (spell.info !== null) {
    info.style.display = 'block';
    info.innerHTML = spell.info;
  } else {
    info.style.display = 'none';
  }
  lore.innerText = spell.lore;
};

// Replaces spell selected visual.
const handleClick = (e) => {
  draggedSpell = e.target.id;
  draggedSpellElement = e.target;
  const selected = document.getElementsByClassName('spell-selected');
  if (selected !== null) {
    Array.from(selected).forEach((el) => {
      el.classList.remove('spell-selected');
    });
  }
  e.target.parentElement.classList.add('spell-selected');
  updateSpellDescription(draggedSpell);
};

const handleDragStart = (e) => {
  draggedSpell = e.target.id;
  draggedSpellElement = e.target;
  e.target.classList.add('mini');
  const dragImage = new Image();
  dragImage.src = `/res/spell/wizard/${draggedSpell}.png`;
  e.dataTransfer.setDragImage(dragImage, 24, 24);
  e.dataTransfer.effectAllowed = 'move';
  handleClick(e);
};

const handleDragOver = (e) => {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';


  return false;
};

const handleDragEnter = (e) => {
  e.target.classList.add('dragover');
};

const handleDragLeave = (e) => {
  e.target.classList.remove('dragover');
};

const handleDrop = (e) => {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  // Remove duplicate spells from other slots.
  const duplicates = document.querySelectorAll('[data-spell]');
  for (let i = 0; i < duplicates.length; i += 1) {
    if (duplicates[i].dataset.spell === draggedSpell) {
      // Assign to duplicate slot, the spell of currently targetted slot.
      duplicates[i].setAttribute('data-spell', e.target.getAttribute('data-spell'));
      duplicates[i].style.backgroundImage = e.target.style.backgroundImage;
    }
  }

  e.target.style.backgroundImage = `url(/res/spell/wizard/${draggedSpell}.png)`;
  e.target.setAttribute('data-spell', draggedSpell);
  e.target.classList.remove('dragover');

  draggedSpellElement.classList.remove('mini');
};

const handleDragEnd = (e) => {
  e.target.classList.remove('dragover');
  draggedSpellElement.classList.remove('mini');
};

// const addSlotEventListener = (slot) => {
//   const s = document.getElementById(slot);
//   s.addEventListener('dragover', handleDragOver);
//   s.addEventListener('dragenter', handleDragEnter);
//   s.addEventListener('dragleave', handleDragLeave);
//   s.addEventListener('drop', handleDrop);
// };

// slots.forEach((slot) => {
//   addSlotEventListener(slot);
// });

// const addSpellEventListener = (spell) => {
//   const s = document.getElementById(spell.name);
//   const c = document.getElementById(spell.container);
//   s.addEventListener('dragstart', handleDragStart);
//   s.addEventListener('dragend', handleDragEnd);
//   c.addEventListener('click', handleClick);
// };

// spellId.forEach((spell) => {
//   addSpellEventListener(spell);
// });

// // Set default spell clicked.
// const scorch = document.getElementById('scorch');
// scorch.click();

const InitializeAlchemyInterface = () => {
  const addSlotEventListener = (slot) => {
    const s = document.getElementById(slot);
    s.addEventListener('dragover', handleDragOver);
    s.addEventListener('dragenter', handleDragEnter);
    s.addEventListener('dragleave', handleDragLeave);
    s.addEventListener('drop', handleDrop);
  };

  slots.forEach((slot) => {
    addSlotEventListener(slot);
  });

  const addSpellEventListener = (spell) => {
    const s = document.getElementById(spell.name);
    const c = document.getElementById(spell.container);
    s.addEventListener('dragstart', handleDragStart);
    s.addEventListener('dragend', handleDragEnd);
    c.addEventListener('click', handleClick);
  };

  spellId.forEach((spell) => {
    addSpellEventListener(spell);
  });

  // Set default spell clicked.
  const scorch = document.getElementById('scorch');
  scorch.click();
};

export default InitializeAlchemyInterface;
