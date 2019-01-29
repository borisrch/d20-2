import tingle from 'tingle.js';
import { clearLog } from './log';
import Globals from './globals';
import { Stats } from './stats';

const platform = document.getElementById('platform');
const game = document.getElementById('game-interface');
const cloud = document.getElementById('platform-clouds');

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
}

export default LevelManager;
