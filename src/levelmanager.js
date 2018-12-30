import tingle from 'tingle.js';
import { clearLog } from './log';
import Globals from './globals';

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

  setGraveyard() {
    game.setAttribute('style', '');
    game.classList.add('animated', 'fadeOutLeft');
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
}

export default LevelManager;
