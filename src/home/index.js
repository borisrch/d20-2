import 'particles.js/particles';
import * as PIXI from 'pixi.js';

import InitializeAlchemyInterface from './alchemy-interface';
import InitializeArmouryInterface from './armoury-interface';

// Playground Begin
const app = new PIXI.Application({
  width: 1280, height: 720, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

// Create a new texture
const texture = PIXI.Texture.from('/res/platform/palace-lg.png');
const background = new PIXI.Sprite(texture);
container.addChild(background);
background.interactive = true;

const easeInOutQuart = (t) => { 
  return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
};

const easeOut = progress => Math.pow(--progress, 5) + 1;

// Move container to the center
// container.x = app.screen.width / 2;
// container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
// container.pivot.x = container.width / 2;
// container.pivot.y = container.height / 2;

// Listen for animate update
// app.ticker.add((delta) => {
//   // rotate the container!
//   // use delta to create frame-independent transform
//   container.rotation -= 0.01 * delta;
// });

// Playground End

const particlesJS = window.particlesJS;

particlesJS.load('torch-1', '/src/home/particles/torch.json');

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
    particlesJS.load('alchemist-bubble', '/src/home/particles/bubbles.json', () => {});
    particlesJS.load('alchemist-cauldron', '/src/home/particles/cauldron.json', () => {});
    particlesJS.load('alchemist-desk', '/src/home/particles/desk.json', () => {});
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
    particlesJS.load('furnace-embers', '/src/home/particles/embers.json', () => {});
    particlesJS.load('furnace-flame', '/src/home/particles/flames.json', () => {});
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
    particlesJS.load('torch-1', '/src/home/particles/torch.json');
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

          const time = {
            start: performance.now(),
            total: 1000,
          };
          const finalPosition = 590;
          const basePosition = container.x;

          const moveCameraRight = (delta) => {
            time.elapsed = performance.now() - time.start;
            const progress = Math.min((time.elapsed / time.total), 1);
            const easing = easeOut(progress);
            const position = easing * finalPosition;
            container.x = -position + basePosition;
            // container.setTransform(-position);
            if (position === finalPosition) {
              app.ticker.remove(moveCameraRight);
            }
          };

          app.ticker.add(moveCameraRight);

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
InitializeArmouryInterface();
