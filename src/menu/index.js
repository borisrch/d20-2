import 'particles.js/particles';

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

// Replaces spell selected visual.
const handleClick = (e) => {
  const selected = document.getElementsByClassName('spell-selected');
  if (selected !== null) {
    Array.from(selected).forEach((el) => {
      el.classList.remove('spell-selected');
    });
  }
  e.target.parentElement.classList.add('spell-selected');
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
  e.target.style.backgroundImage = `url(/res/spell/wizard/${draggedSpell}.png)`;
  e.target.setAttribute('data-spell', draggedSpell);
  e.target.classList.remove('dragover');

  draggedSpellElement.classList.remove('mini');
};

const handleDragEnd = (e) => {
  e.target.classList.remove('dragover');
  draggedSpellElement.classList.remove('mini');
};

const spellScorch = document.getElementById('scorch');
const spell4 = document.getElementById('spell-4');

const spell1 = document.getElementById('spell-1');
const spellArcaneBlast = document.getElementById('arcane-blast');

const slot1 = document.getElementById('slot-1');
slot1.addEventListener('dragover', handleDragOver);
slot1.addEventListener('dragenter', handleDragEnter);
slot1.addEventListener('dragleave', handleDragLeave);

slot1.addEventListener('drop', handleDrop);

spellScorch.addEventListener('dragstart', handleDragStart);
spellScorch.addEventListener('dragend', handleDragEnd);
spell4.addEventListener('click', handleClick);

spellArcaneBlast.addEventListener('dragstart', handleDragStart);
spellArcaneBlast.addEventListener('dragend', handleDragEnd);
spell1.addEventListener('click', handleClick);

// spellScorch.ondragstart = dragStartHandler(event);

// const spellName = document.getElementById('spell-name');
// const spells = [
//   'Scorch',
//   'Incinerate',
//   'Blaze',
//   'Frostbolt',
//   'Ice Spike',
//   'Flurry',
//   'Arcane Blast',
//   'Arcane Blitz',
//   'Arcane Barrage',
//   'Prismatic Shield',
//   'Rune Flux',
//   'Nimbus',
// ];
// let c = 0;

// const change = () => {
//   if (c >= spells.length) {
//     c = 0;
//   }
//   spellName.innerText = spells[c];
//   c += 1;
// };

// setInterval(change, 1000);

const wizardSpells = {
  scorch: {
    name: 'Scorch',
    type: 'Basic',
    desc: 'A fiery blast that scorches even the strongest armour.',
    src: '/res/spell/wizard/scorch.png',
  },
  incinerate: {
    name: 'Incinerate',
    type: 'Basic',
    desc: 'This evocation is notorious for burning numerous other knights to a crisp.',
    src: '',
  },
  arcaneBlast: {
    name: 'Arcane Blast',
    type: 'Basic',
    desc: '',
    src: '/res/spell/wizard/arcane-blast.png',
  },
};
