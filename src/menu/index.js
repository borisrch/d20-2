import 'particles.js/particles';

const particlesJS = window.particlesJS;

particlesJS.load('torch-1', 'src/menu/particles/torch.json', () => {});

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
    this.armoury.classList.add('hide');
    main.classList.remove('darken');
  }

  isArmouryVisible() {
    return this.armouryVisible;
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

const spellName = document.getElementById('spell-name');
const spells = [
  'Scorch',
  'Incinerate',
  'Blaze',
  'Frostbolt',
  'Ice Spike',
  'Flurry',
  'Arcane Blast',
  'Arcane Blitz',
  'Arcane Barrage',
  'Prismatic Shield',
  'Rune Flux',
  'Nimbus',
];
let c = 0;

const change = () => {
  if (c >= spells.length) {
    c = 0;
  }
  spellName.innerText = spells[c];
  c += 1;
};

setInterval(change, 1000);
