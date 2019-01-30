import tingle from 'tingle.js';
import { clearLog } from './log';

import Globals from './globals';
import Stats from './stats';

import Goblin from './mobs/goblin';
import Chicken from './mobs/chicken';
import Dwarf from './mobs/dwarf';
import Ent from './mobs/ent';
import Skeleton from './mobs/skeleton';
import Caretaker from './mobs/caretaker';

import { resetMonsterConditions } from './conditions';
import { updateStats } from './update';

const platform = document.getElementById('platform');
const game = document.getElementById('game-interface');
const cloud = document.getElementById('platform-clouds');

const getNextMonster = function (level) {
  switch (level) {
    case 0:
      return Chicken;

    case 1:
      return Goblin;

    case 2:
      return Dwarf;

    case 3:
      return Ent;

    case 4:
      return Skeleton;

    case 5:
      return Caretaker;

    case 6:
      return Caretaker;

    default:
      throw new Error('getNextMonster: Out of monsters');
  }
};

const ui = {
  player: [
    {
      el: 'player-health',
      style: 'light-ui',
    },
    {
      el: 'player-label',
      style: 'light-ui',
    },
    {
      el: 'player-damage',
      style: 'light-ui',
    },
    {
      el: 'player-damage-icon',
      style: 'colour-damage-tip',
    },
    {
      el: 'player-armour',
      style: 'light-ui',
    },
    {
      el: 'player-armour-icon',
      style: 'colour-armour-tip',
    },
    {
      el: 'player-runic',
      style: 'light-ui',
    },
    {
      el: 'player-runic-icon',
      style: 'colour-runic-tip',
    },
    {
      el: 'player-mana',
      style: 'light-ui',
    },
    {
      el: 'player-mana-icon',
      style: 'colour-mana-tip',
    },
    {
      el: 'player-damage',
      style: 'light-ui',
    },
    {
      el: 'player-damage-icon',
      style: 'colour-damage-tip',
    },
  ],
  monster: [
    {
      el: 'monster-health',
      style: 'light-ui',
    },
    {
      el: 'monster-label',
      style: 'light-ui',
    },
    {
      el: 'monster-damage',
      style: 'light-ui',
    },
    {
      el: 'monster-damage-icon',
      style: 'colour-damage-tip',
    },
    {
      el: 'monster-armour',
      style: 'light-ui',
    },
    {
      el: 'monster-armour-icon',
      style: 'colour-armour-tip',
    },
    {
      el: 'monster-rage',
      style: 'light-ui',
    },
    {
      el: 'monster-rage-icon',
      style: 'colour-runic-tip',
    },
  ],
};

class LevelManager {
  setLightInterface() {
    Globals.ui = 'light';

    ui.player.forEach((item) => {
      const el = document.getElementById(item.el);
      el.classList.add(item.style);
    });
    ui.monster.forEach((item) => {
      const el = document.getElementById(item.el);
      el.classList.add(item.style);
    });
  }

  endForest() {
    game.classList.add('animated', 'fadeOutLeft');
    this.modal = new tingle.modal({
      footer: false,
      stickyFooter: false,
      closeMethods: [],
      closeLabel: "Close",
    });
    this.modal.setContent('<div id="level-complete-interface"></div>');
    const el = document.getElementById('level-complete-interface');
    const container = document.createElement('div');
    container.className = 'level-complete-container';
    
    const title = document.createElement('span');
    title.innerHTML = 'Level Complete';
    title.className = 'level-complete-title';

    // const rating = document.createElement('ion-icon');
    // rating.className = '';
    // rating.setAttribute('name', 'star');
    // rating.setAttribute('size', 'large');
    
    const reward = document.createElement('span');
    reward.innerHTML = 'You have unlocked the Faerun Staff.';
    reward.className = 'level-complete-text';
    
    const button = document.createElement('button');
    button.className = 'weapon-interface-button';
    button.id = 'level-complete-interface-button';
    button.innerHTML = 'Advance to next level';
    
    container.appendChild(title);
    // container.appendChild(rating);
    container.appendChild(reward);
    container.appendChild(button);
    el.appendChild(container);

    button.addEventListener('click', () => {
      this.setGraveyard();
      this.modal.close();
    });

    this.modal.open();
  }

  setGraveyard() {
    game.style = '';
    setTimeout(() => {
      clearLog();
      platform.src = 'res/platform/platform-2.png';
      game.classList.remove('level-1');
      game.classList.add('level-2');
      cloud.classList.add('cloud-body', 'cloud-2');
      this.setLightInterface();
    }, 1000);
    setTimeout(() => {
      game.classList.remove('fadeOutLeft');
      game.classList.add('fadeInRight');
    }, 1000);
  }

  refreshPlayerStats() {
    Stats.playerHealth = Stats.playerMaxHealth;
    Stats.playerMana = Stats.playerMaxMana;
  }

  advance() {
    Stats.playerLevel += 1;
    if (Stats.playerLevel > 3 && Stats.playerLevelName === 'forest') {
      Stats.playerLevelName = 'graveyard';
      this.endForest();
    }
    resetMonsterConditions();

    const mob = getNextMonster(Stats.playerLevel);
    Stats.currentMonster = mob;
    Stats.monsterHealth = mob.monsterHealth;
    Stats.monsterDamage = mob.monsterDamage;
    Stats.monsterArmour = mob.monsterArmour;
    Stats.monsterName = mob.name;
    Stats.monsterRage = 0;

    const el = document.getElementById('monster-graphic');
    el.classList.add('animated', 'zoomOut');
    el.src = mob.src;
    setTimeout(() => {
      el.classList.remove('animated', 'zoomOut');
    }, 750);

    updateStats();
  }
}

// do MonsterHealthHelper --> spells.js --> fix mob spawning to quickly on next level advance?

// const advance = function () {
//   Stats.playerLevel += 1;
//   // Level Complete
//   if (Stats.playerLevel > 3 && Stats.playerLevelName === 'forest') {
//     Stats.playerLevelName = 'graveyard';
//     currentMonster = getNextMonster(Stats.playerLevel);
//     lm.endForest();
//   } else {
//     currentMonster = getNextMonster(Stats.playerLevel);
//   }
//   resetMonsterConditions();
//   Stats.currentMonster = currentMonster;
//   Stats.monsterHealth = currentMonster.monsterHealth;
//   Stats.monsterDamage = currentMonster.monsterDamage;
//   Stats.monsterArmour = currentMonster.monsterArmour;
//   Stats.monsterName = currentMonster.name;
//   Stats.monsterRage = 0;

  // const el = document.getElementById('monster-graphic');
  // el.classList.add('animated', 'zoomOut');
  // el.src = currentMonster.src;
  // setTimeout(() => {
  //   el.classList.remove('animated', 'zoomOut');
  // }, 750);

//   updateStats();
// };

export default LevelManager;
