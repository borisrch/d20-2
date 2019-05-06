import 'particles.js/particles';
import InitializeAlchemyInterface from './alchemy-interface';

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
    this.equipment = document.getElementById('equipment-interface');
    this.equipmentVisible = false;
    this.currentlyActive = 'main';
  }

  showAlchemyInterface() {
    this.alchemyVisible = true;
    this.currentlyActive = 'alchemy';
    mainFocus = false;
    this.alchemy.classList.remove('hide');
    main.classList.add('darken');
    particlesJS.load('alchemist-bubble', 'src/menu/particles/bubbles.json', () => {});
    particlesJS.load('alchemist-cauldron', 'src/menu/particles/cauldron.json', () => {});
    particlesJS.load('alchemist-desk', 'src/menu/particles/desk.json', () => {});
  }

  // hideAlchemyInterface() {
  //   this.alchemyVisible = false;
  //   mainFocus = true;
  //   this.clearParticles();
  //   this.alchemy.classList.add('hide');
  //   main.classList.remove('darken');
  // }

  isAlchemyVisible() {
    return this.alchemyVisible;
  }

  showArmouryInterface() {
    this.armouryVisible = true;
    this.currentlyActive = 'armoury';
    mainFocus = false;
    this.armoury.classList.remove('hide');
    main.classList.add('darken');
    particlesJS.load('furnace-embers', 'src/menu/particles/embers.json', () => {});
    particlesJS.load('furnace-flame', 'src/menu/particles/flames.json', () => {});
  }

  isArmouryVisible() {
    return this.armouryVisible;
  }

  showEquipmentInterface() {
    this.equipmentVisible = true;
    this.currentlyActive = 'equipment';
    mainFocus = false;
    this.equipment.classList.remove('hide');
    main.classList.add('darken');
  }

  isEquipmentVisible() {
    return this.equipmentVisible;
  }

  hideInterfaces() {
    if (this.isEquipmentVisible()) {
      this.equipment.classList.add('hide');
      this.equipmentVisible = false;
    } else if (this.isAlchemyVisible()) {
      this.alchemy.classList.add('hide');
      this.alchemyVisible = false;
    } else if (this.isArmouryVisible()) {
      this.armoury.classList.add('hide');
      this.armouryVisible = false;
    }
    this.currentlyActive = 'main';
    mainFocus = true;
    this.clearParticles();
    main.classList.remove('darken');
  }

  getCurrentlyActive() {
    return this.currentlyActive;
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
    switch (event.key) {
      case 'ArrowLeft':
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
        UIM.hideInterfaces();
        buffer = false;
        break;

      case 'a':
        if (UIM.isAlchemyVisible() || UIM.isEquipmentVisible()) {
          buffer = false;
          break;
        }
        if (UIM.isArmouryVisible()) {
          UIM.hideInterfaces();
        } else {
          UIM.showArmouryInterface();
        }
        buffer = false;
        break;

      case 'z':
        if (UIM.isArmouryVisible() || UIM.isEquipmentVisible()) {
          buffer = false;
          break;
        }
        if (UIM.isAlchemyVisible()) {
          UIM.hideInterfaces();
        } else {
          UIM.showAlchemyInterface();
        }
        buffer = false;
        break;

      case 'x':
        if (UIM.isAlchemyVisible() || UIM.isArmouryVisible()) {
          buffer = false;
          break;
        }
        if (UIM.isEquipmentVisible()) {
          UIM.hideInterfaces();
        } else {
          UIM.showEquipmentInterface();
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

InitializeAlchemyInterface();

let selectedItemType = null;

const typeArmour = document.getElementById('type-armour');
const typeTrinket = document.getElementById('type-trinket');
const typeRing = document.getElementById('type-ring');

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

typeArmour.addEventListener('click', updateItemType);
typeTrinket.addEventListener('click', updateItemType);
typeRing.addEventListener('click', updateItemType);
