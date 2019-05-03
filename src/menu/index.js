import 'particles.js/particles';
import Spells from './wizard-spell-store';

const particlesJS = window.particlesJS;

particlesJS.load('torch-1', 'src/menu/particles/torch.json');

let currentPosition = 0;
let cameraLevel = 1;
let buffer = false;
const bufferDuration = 350;

let mainFocus = true;

const main = document.getElementById('main-bg');
const alchemistIcon = document.getElementById('alchemist-icon');
const armouryIcon = document.getElementById('armoury-icon');

const setLevelColour = (level) => {
  const el = document.getElementById('level-name');
  el.className = 'level-desc center';
  switch (level) {
    case 1:
      el.classList.add('orange');
      el.innerText = 'Elysium';
      break;
    case 2:
      el.classList.add('cyan');
      el.innerText = 'Viladir';
      break;
    case 3:
      el.classList.add('magenta');
      el.innerText = 'Minethys';
      break;
    default:
      throw new Error();
  }
};

class UIManager {
  constructor() {
    this.alchemy = document.getElementById('alchemist-interface');
    this.alchemyVisible = false;
    this.armoury = document.getElementById('armoury-interface');
    this.armouryVisible = false;
  }

  showAlchemyInterface() {
    this.alchemyVisible = true;
    mainFocus = false;
    this.alchemy.classList.remove('hide');
    main.classList.add('darken');
    particlesJS.load('alchemist-bubble', 'src/menu/particles/bubbles.json', () => {});
    particlesJS.load('alchemist-cauldron', 'src/menu/particles/cauldron.json', () => {});
    particlesJS.load('alchemist-desk', 'src/menu/particles/desk.json', () => {});
  }

  hideAlchemyInterface() {
    this.alchemyVisible = false;
    mainFocus = true;
    this.clearParticles();
    this.alchemy.classList.add('hide');
    main.classList.remove('darken');
  }

  isAlchemyVisible() {
    return this.alchemyVisible;
  }

  showArmouryInterface() {
    this.armouryVisible = true;
    mainFocus = false;
    this.armoury.classList.remove('hide');
    main.classList.add('darken');
    particlesJS.load('furnace-embers', 'src/menu/particles/embers.json', () => {});
    particlesJS.load('furnace-flame', 'src/menu/particles/flames.json', () => {});
  }

  hideArmouryInterface() {
    this.armouryVisible = false;
    mainFocus = true;
    this.clearParticles();
    this.armoury.classList.add('hide');
    main.classList.remove('darken');
  }

  isArmouryVisible() {
    return this.armouryVisible;
  }

  clearParticles() {
    window['pJSDom'] = [];
    particlesJS.load('torch-1', 'src/menu/particles/torch.json');
  }
}

const UIM = new UIManager();

document.addEventListener('keydown', () => {

  const torches = document.getElementById('main-container');

  const threshold = 590;

  if (!buffer) {
    buffer = true;
    console.log(event.key);
    switch (event.key) {
      case "ArrowLeft":
        if (!mainFocus) {
          buffer = false;
          break;
        }
        if (currentPosition !== 0) {
          currentPosition += threshold;
          cameraLevel -= 1;
          torches.style.left = currentPosition + 'px';
          main.style.left = currentPosition + 'px';
          setLevelColour(cameraLevel);
          setTimeout(() => { buffer = false; }, bufferDuration);
        } else {
          buffer = false;
        }
        break;
      case "ArrowRight":
        if (!mainFocus) {
          buffer = false;
          break;
        }
        if (cameraLevel < 3) {
          currentPosition -= threshold;
          cameraLevel += 1;
          torches.style.left = currentPosition + 'px';
          main.style.left = currentPosition + 'px';
          setLevelColour(cameraLevel);
          setTimeout(() => { buffer = false; }, bufferDuration);
        } else {
          console.log(cameraLevel);
          buffer = false;
        }
        break;
      case "ArrowUp":
        buffer = false;
        break;
      case "ArrowDown":
        buffer = false;
        break;
      case 'Escape':
        if (UIM.isAlchemyVisible()) {
          UIM.hideAlchemyInterface();
        } else if (UIM.isArmouryVisible()) {
          UIM.hideArmouryInterface();
        }
        buffer = false;
        break;

      case 'a':
        if (UIM.isAlchemyVisible()) {
          buffer = false;
          break;
        }
        if (UIM.isArmouryVisible()) {
          UIM.hideArmouryInterface();
        } else {
          UIM.showArmouryInterface();
        }
        buffer = false;
        break;

      case 'z':
        if (UIM.isArmouryVisible()) {
          buffer = false;
          break;
        }
        if (UIM.isAlchemyVisible()) {
          UIM.hideAlchemyInterface();
        } else {
          UIM.showAlchemyInterface();
        }
        buffer = false;
        break;

      default:
        buffer = false;
        break;
    }
  }
});

alchemistIcon.addEventListener('click', () => {
  if (UIM.isAlchemyVisible()) {
    UIM.hideAlchemyInterface();
  } else {
    UIM.showAlchemyInterface();
  }
});

armouryIcon.addEventListener('click', () => {
  if (UIM.isArmouryVisible()) {
    UIM.hideArmouryInterface();
  } else {
    UIM.showArmouryInterface();
  }
});

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

const changeDescription = (spellName) => {
  const spell = Spells.getSpell(spellName);

  const icon = document.getElementById('spell-icon');
  icon.src = spell.src;

  const name = document.getElementById('spell-name');
  name.innerText = spell.name;
  name.className = '';
  name.classList.add('spell-name', spell.colour);

  const type = document.getElementById('spell-type');
  type.innerText = spell.type;

  const desc = document.getElementById('spell-desc-main');
  desc.innerHTML = spell.desc;

  const info = document.getElementById('spell-desc-info');
  if (spell.info !== null) {
    info.style.display = 'block';
    info.innerHTML = spell.info;
  } else {
    info.style.display = 'none';
  }

  const lore = document.getElementById('spell-desc-lore');
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
  changeDescription(draggedSpell);
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
  Array.from(duplicates).forEach((el) => {
    if (el.getAttribute('data-spell') === draggedSpell) {
      el.removeAttribute('data-spell');
      el.style.backgroundImage = '';
    }
  });

  e.target.style.backgroundImage = `url(/res/spell/wizard/${draggedSpell}.png)`;
  e.target.setAttribute('data-spell', draggedSpell);
  e.target.classList.remove('dragover');

  draggedSpellElement.classList.remove('mini');
};

const handleDragEnd = (e) => {
  e.target.classList.remove('dragover');
  draggedSpellElement.classList.remove('mini');
};

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
