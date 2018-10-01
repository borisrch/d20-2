import tingle from 'tingle.js';
import 'pretty-checkbox/dist/pretty-checkbox.css';
import '../../css/tingle.min.css';
import {
  Howl,
  Howler
} from 'howler';

// import platform from '../../res/platform/background-4.png';
// import cloud from '../../res/platform/cloud-3.png';

const settings = [
  {
    label: 'Enable High Contrast Mode',
    id: 'settings-highcontrast',
    default: false,
  },
  {
    label: 'Mute Background Music',
    id: 'settings-mutemusic',
    default: false,
  }
];


const backgroundMusic = new Howl({
  src: ['res/audio/home.mp3'],
  preload: true,
  autoplay: true,
  loop: true,
  volume: 0.5,
});


const setWeaponInterface = function () {
  const el = document.getElementById('settings-interface');

  settings.forEach((setting) => {
    const label = document.createElement('div');
    label.className = 'settings-label';
    label.innerText = setting.label;

    const outer = document.createElement('div');
    outer.classList.add('pretty', 'p-switch', 'p-slim');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = setting.id;
    checkbox.checked = setting.default;

    const state = document.createElement('div');
    state.classList.add('state', 'p-primary');

    const labelInner = document.createElement('label');

    state.appendChild(labelInner);
    outer.appendChild(checkbox);
    outer.appendChild(state);

    el.appendChild(label);
    el.appendChild(outer);

  });

  // Add listener

  // Add localStorage update

}

const setHelpInterface = function () {

  const el = document.getElementById('help-interface');

  // Section 1
  const img = document.createElement('img');
  img.src = 'res/common/intro.png';
  img.className = 'help-image';

  const intro = document.createElement('div');
  intro.className = 'help-title';
  intro.innerText = 'Intro';

  const introText = document.createElement('div');
  introText.className = 'help-text';
  introText.innerText = `Stride is a turn-based RPG where the hero battles against a variety of mobs. Classes define the hero's skillset, where each class has unqiue spells, stats, and weapons.`;

  el.appendChild(img);
  el.appendChild(intro);
  el.appendChild(introText);

  // Section 2
  const stats = document.createElement('div');
  stats.className = 'help-title';
  stats.innerText = 'Stats';

  const statIcons = document.createElement('div');
  statIcons.className = 'help-icons';
  statIcons.innerHTML = `
  <span class="ra ra-sword colour-damage help-icon"></span>
  <span class="ra ra-crystals colour-runic help-icon"></span>
  <span class="ra ra-shield colour-ac help-icon"></span>
  <span class="ra ra-lightning-bolt colour-mana help-icon"></span>
  `;

  el.appendChild(stats);
  el.appendChild(statIcons);

  const buildSection2 = function () {

    const damageIcon = '<span class="ra ra-sword colour-damage mini-icon"></span>';
    const runicIcon = '<span class="ra ra-crystals colour-runic mini-icon"></span>';
    const armourIcon = '<span class="ra ra-shield colour-ac mini-icon"></span>';
    const manaIcon = '<span class="ra ra-lightning-bolt colour-mana mini-icon"></span>'

    const statText = document.createElement('div');
    statText.className = 'help-text';
  
    const damage = document.createElement('div');
    damage.className = 'help-stat-text';
    damage.innerHTML = `
    ${damageIcon} - <b>Damage</b> affects your basic attacks and spells. For example, if you have 6 ${damageIcon} , your basic attacks will do anywhere from 1-6 ${damageIcon}.
    `;
  
    const runic = document.createElement('div');
    runic.className = 'help-stat-text';
    runic.innerHTML = `
    ${runicIcon} - <b>Runic</b> gives your spells more power and bonus effects. For example, the spell <i>Alzur’s Thunder</i> will do 1-8 ${damageIcon} , but will also do additional 1-4 extra ${damageIcon} per level of ${runicIcon}.
    `;

    const armour = document.createElement('div');
    armour.className = 'help-stat-text';
    armour.innerHTML = `
    ${armourIcon} - <b>Armour</b> represents how hard it will be for enemies to hit you. The higher your ${armourIcon}, the higher enemies will have to roll to be able to hit you (see hit chance).
    `;

    const mana = document.createElement('div');
    mana.className = 'help-stat-text';
    mana.innerHTML = `
    ${manaIcon} - <b>Mana</b> is used to represent the cost of your spells. Most classes regenerate 25 ${manaIcon} each turn and have a base maximum of 100 ${manaIcon}.
    `;
    
    statText.appendChild(damage);
    statText.appendChild(runic);
    statText.appendChild(armour);
    statText.appendChild(mana);
  
    el.appendChild(statText);

  }

  buildSection2();
}

const buildHelpInterface = function () {
  const helpModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['button', 'escape', 'overlay'],
    closeLabel: "Close",
    beforeClose: function () {
      return true;
    }
  });
  helpModal.setContent('<div class="help-interface" id="help-interface"></div>');
  setHelpInterface();

  const help = document.getElementById('help');
  help.addEventListener('click', () => {
    helpModal.open();
  });
}

const buildSettingsInterface = function () {
  const settingsModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['button', 'escape', 'overlay'],
    closeLabel: "Close",
    beforeClose: function () {
      return true;
    }
  });
  settingsModal.setContent('<div class="settings-interface" id="settings-interface"></div>');
  setWeaponInterface();

  const settings = document.getElementById('settings');
  settings.addEventListener('click', () => {
    settingsModal.open();
  });

  const disable_music = document.getElementById('settings-mutemusic');
  disable_music.addEventListener('click', () => {
    if (disable_music.checked) {
      backgroundMusic.mute(true);
    }
    else {
      backgroundMusic.mute(false);
    }
  });

  const contrast_css = document.createElement('style');
  document.body.appendChild(contrast_css);

  const enable_highcontrast = document.getElementById('settings-highcontrast');
  enable_highcontrast.addEventListener('click', () => {
    if (enable_highcontrast.checked) {
      contrast_css.textContent = ` .home-interface {
        filter: contrast(200%);
      }`;
    } else {
      contrast_css.textContent = ``;
    }
  });
}

buildSettingsInterface();
buildHelpInterface();
backgroundMusic.play();