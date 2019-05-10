import 'particles.js/particles';
import * as PIXI from 'pixi.js';

import InitializeAlchemyInterface from './alchemy-interface';
import InitializeArmouryInterface from './armoury-interface';


const app = new PIXI.Application({
  width: 1280, height: 720, backgroundColor: 0x1099bb, resizeTo: document.getElementById('main-interface'),
});
document.getElementById('main-bg').appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

const texture = PIXI.Texture.from('/res/platform/palace-lg.png');
const background = new PIXI.Sprite(texture);
container.addChild(background);
background.interactive = true;

const easeInOutQuart = (t) => { 
  return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
};

const easeOut = progress => Math.pow(--progress, 5) + 1;

const particlesJS = window.particlesJS;
particlesJS.load('torch-1', '/src/home/particles/torch.json');

let currentPosition = 0;
let cameraLevel = 1;
let buffer = false;
const bufferDuration = 500;

// max 3 items
let bufferQueue = [];

let mainFocus = true;

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

const reduceBrightness = () => {
  const time = {
    start: performance.now(),
    total: 1000,
  };
  const endBrightness = 0.25;
  const startBrightness = 1;
  const targetBrightness = startBrightness - endBrightness;
  const filter = new PIXI.filters.ColorMatrixFilter();

  const transition = (delta) => {
    time.elapsed = performance.now() - time.start;
    const progress = Math.min((time.elapsed / time.total), 1);
    const easing = easeOut(progress);
    const d = 1 - (easing * targetBrightness);
    filter.brightness(d);
    container.filters = [filter];
    if (d <= endBrightness) {
      app.ticker.remove(transition);
    }
  };
  app.ticker.add(transition);
};

const increaseBrightness = () => {
  console.log('increase brightness::');
  const time = {
    start: performance.now(),
    total: 1000,
  };
  const endBrightness = 1;
  const startBrightness = 0.25;
  const targetBrightness = 0.75;
  const filter = new PIXI.filters.ColorMatrixFilter();
  const transition = (delta) => {
    time.elapsed = performance.now() - time.start;
    const progress = Math.min((time.elapsed / time.total), 1);
    const easing = easeOut(progress);
    const d = startBrightness + (easing * targetBrightness);
    filter.brightness(d);
    container.filters = [filter];
    console.log(d);
    if (d >= endBrightness) {
      app.ticker.remove(transition);
    }
  };
  app.ticker.add(transition);
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
    reduceBrightness();
    particlesJS.load('alchemist-bubble', '/src/home/particles/bubbles.json', () => {});
    particlesJS.load('alchemist-cauldron', '/src/home/particles/cauldron.json', () => {});
    particlesJS.load('alchemist-desk', '/src/home/particles/desk.json', () => {});
  }

  isAlchemyVisible() {
    return this.alchemyVisible;
  }

  showArmouryInterface() {
    this.armouryVisible = true;
    this.currentlyActive = 'armoury';
    mainFocus = false;
    particlesJS.load('furnace-embers', '/src/home/particles/embers.json', () => {});
    particlesJS.load('furnace-flame', '/src/home/particles/flames.json', () => {});
    this.armoury.classList.remove('hide');
    reduceBrightness();
  }

  isArmouryVisible() {
    return this.armouryVisible;
  }

  showEquipmentInterface() {
    this.equipmentVisible = true;
    this.currentlyActive = 'equipment';
    mainFocus = false;
    this.equipment.classList.remove('hide');
    reduceBrightness();
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
    console.log('hiding interfaces');
    increaseBrightness();
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

const moveCameraRight = () => {
  const time = {
    start: performance.now(),
    total: bufferDuration,
  };
  const endPosition = 590;
  const startPosition = container.x;
  const move = (delta) => {
    time.elapsed = performance.now() - time.start;
    const progress = Math.min((time.elapsed / time.total), 1);
    const easing = easeOut(progress);
    const position = easing * endPosition;
    container.x = -position + startPosition;
    if (position === endPosition) {
      app.ticker.remove(move);
    }
  };

  app.ticker.add(move);
};

const moveCameraRightCommand = () => {
  // if (!mainFocus) {
  //   buffer = true;
  //   return;
  // }
  buffer = true;
  if (cameraLevel < 3) {
    currentPosition += 590;
    cameraLevel += 1;
    moveCameraRight();
    setLevelColour(cameraLevel);
    setTimeout(() => {
      buffer = false;
    }, bufferDuration);
  } else {
    buffer = false;
  }
};

const moveCameraLeft = () => {
  const time = {
    start: performance.now(),
    total: bufferDuration,
  };
  const endPosition = 590;
  const startPosition = container.x;
  console.log('Base position: ', startPosition);
  const move = (delta) => {
    time.elapsed = performance.now() - time.start;
    const progress = Math.min((time.elapsed / time.total), 1);
    const easing = easeOut(progress);
    const position = easing * endPosition;
    container.x = position + startPosition;
    if (position === endPosition) {
      console.log('final position: ', container.x);
      app.ticker.remove(move);
    }
  };

  app.ticker.add(move);
};

const moveCameraLeftCommand = () => {
  buffer = true;
  // CameraLevel is mapped to 1 when container.x = 0;
  if ((cameraLevel - 1) !== 0) {
    currentPosition -= 590;
    cameraLevel -= 1;
    moveCameraLeft();
    setLevelColour(cameraLevel);
    setTimeout(() => {
      buffer = false;
    }, bufferDuration);
  } else {
    buffer = false;
  }
};

const handleAlchemyInterfaceCommand = () => {
  if (UIM.getCurrentlyActive() !== 'main') {
    UIM.hideInterfaces();
  } else {
    UIM.showAlchemyInterface();
  }
};

const handleArmouryInterfaceCommand = () => {
  if (UIM.getCurrentlyActive() !== 'main') {
    UIM.hideInterfaces();
  } else {
    UIM.showArmouryInterface();
  }
};

const handleEquipmentInterfaceCommand = () => {
  if (UIM.getCurrentlyActive() !== 'main') {
    UIM.hideInterfaces();
  } else {
    UIM.showEquipmentInterface();
  }
};

const inputProperties = {
  moveRight: {
    key: 'ArrowRight',
    command: moveCameraRightCommand,
  },
  moveLeft: {
    key: 'ArrowLeft',
    command: moveCameraLeftCommand,
  },
  toggleAlchemy: {
    key: 'a',
    command: handleAlchemyInterfaceCommand,
  },
  toggleArmoury: {
    key: 'z',
    command: handleArmouryInterfaceCommand,
  },
  toggleEquipment: {
    key: 's',
    command: handleEquipmentInterfaceCommand,
  },
};


const inputHandler = (e) => {
  if (e.key === inputProperties.moveRight.key) {
    if (!buffer) {
      inputProperties.moveRight.command();
    }
  } else if (e.key === inputProperties.moveLeft.key) {
    if (!buffer) {
      inputProperties.moveLeft.command();
    }
  } else if (e.key === inputProperties.toggleAlchemy.key) {
    inputProperties.toggleAlchemy.command();
  } else if (e.key === inputProperties.toggleArmoury.key) {
    inputProperties.toggleArmoury.command();
  } else if (e.key === inputProperties.toggleEquipment.key) {
    inputProperties.toggleEquipment.command();
  } else if (e.key === 'Escape') {
    UIM.hideInterfaces();
  }
};

document.addEventListener('keydown', inputHandler);

// document.addEventListener('keydown', () => {
//   // const torches = document.getElementById('main-container');
//   const threshold = 590;
//   if (!buffer) {
//     buffer = true;
//     switch (event.key) {
//       case 'ArrowLeft':
//         if (!mainFocus) {
//           buffer = false;
//           break;
//         }
//         if (currentPosition !== 0) {
//           currentPosition += threshold;
//           cameraLevel -= 1;
//           // torches.style.left = currentPosition + 'px';
//           // main.style.left = currentPosition + 'px';

//           moveCameraLeft();

//           setLevelColour(cameraLevel);
//           setTimeout(() => { buffer = false; }, bufferDuration);
//         } else {
//           buffer = false;
//         }
//         break;
//       case 'ArrowRight':
//         moveCameraRightCommand();
//         break;
//       case "ArrowUp":
//         buffer = false;
//         break;
//       case "ArrowDown":
//         buffer = false;
//         break;
//       case 'Escape':
//         UIM.hideInterfaces();
//         buffer = false;
//         break;

//       case 'a':
//         if (UIM.isAlchemyVisible() || UIM.isEquipmentVisible()) {
//           buffer = false;
//           break;
//         }
//         if (UIM.isArmouryVisible()) {
//           UIM.hideInterfaces();
//         } else {
//           UIM.showArmouryInterface();
//         }
//         buffer = false;
//         break;

//       case 'z':
//         if (UIM.isArmouryVisible() || UIM.isEquipmentVisible()) {
//           buffer = false;
//           break;
//         }
//         if (UIM.isAlchemyVisible()) {
//           UIM.hideInterfaces();
//         } else {
//           UIM.showAlchemyInterface();
//         }
//         buffer = false;
//         break;

//       case 'x':
//         if (UIM.isAlchemyVisible() || UIM.isArmouryVisible()) {
//           buffer = false;
//           break;
//         }
//         if (UIM.isEquipmentVisible()) {
//           UIM.hideInterfaces();
//         } else {
//           UIM.showEquipmentInterface();
//         }
//         buffer = false;
//         break;

//       default:
//         buffer = false;
//         break;
//     }
//   }
// });



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

