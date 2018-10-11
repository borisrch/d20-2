import tingle from 'tingle.js';
import 'pretty-checkbox/dist/pretty-checkbox.css';
import '../../css/tingle.min.css';
import {
  Howl,
  Howler
} from 'howler';
import {
  amulets,
  armour,
  trinkets
} from '../equipment-store';

// import platform from '../../res/platform/background-4.png';
// import cloud from '../../res/platform/cloud-3.png';

const settings = [{
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

const click = new Howl({
  src: ['res/audio/click.ogg'],
  preload: true,
  volume: 0.25,
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

  const damageIcon = '<span class="ra ra-sword colour-damage mini-icon"></span>';
  const runicIcon = '<span class="ra ra-crystals colour-runic mini-icon"></span>';
  const armourIcon = '<span class="ra ra-shield colour-ac mini-icon"></span>';
  const manaIcon = '<span class="ra ra-lightning-bolt colour-mana mini-icon"></span>';

  const buildSection2 = function () {

    const statText = document.createElement('div');
    statText.className = 'help-text';

    const damage = document.createElement('div');
    damage.className = 'help-stat-text';
    damage.innerHTML = `
    ${damageIcon} - <b>Damage level</b> affects your basic attacks and spells. For example, if you have 6 ${damageIcon} , your basic attacks will do anywhere from 1-6 damage.
    `;

    const runic = document.createElement('div');
    runic.className = 'help-stat-text';
    runic.innerHTML = `
    ${runicIcon} - <b>Runic level</b> gives your spells more power and bonus effects. For example, the spell <i>Alzur’s Thunder</i> will do 1-8 ${damageIcon} , but will also do additional 1-4 extra ${damageIcon} per level of ${runicIcon}.
    `;

    const armour = document.createElement('div');
    armour.className = 'help-stat-text';
    armour.innerHTML = `
    ${armourIcon} - <b>Armour class</b> represents how hard it will be for enemies to hit you. The higher your ${armourIcon}, the higher enemies will have to roll to be able to hit you (see hit chance).
    `;

    const mana = document.createElement('div');
    mana.className = 'help-stat-text';
    mana.innerHTML = `
    ${manaIcon} - <b>Mana</b> is used as the cost of using your spells. Most classes regenerate 25 ${manaIcon}each turn and have a base maximum of 100 ${manaIcon}.
    `;

    statText.appendChild(damage);
    statText.appendChild(runic);
    statText.appendChild(armour);
    statText.appendChild(mana);

    el.appendChild(statText);

  }

  buildSection2();

  // Section 3
  const gameplay = document.createElement('div');
  gameplay.className = 'help-title';
  gameplay.innerText = 'Gameplay';

  const gameplayIcons = document.createElement('div');
  gameplayIcons.className = 'help-icons';
  gameplayIcons.innerHTML = `
  <span class="ra ra-perspective-dice-five colour-dice help-icon"></span>
  <span class="ra ra-burning-embers colour-embers help-icon"></span>
  <span class="ra ra-wyvern colour-wyvern help-icon"></span>
  <span class="ra ra-player-despair colour-disadvantage help-icon"></span>
  `;

  el.appendChild(gameplay);
  el.appendChild(gameplayIcons);

  const buildSection3 = function () {

    const hitIcon = '<span class="ra ra-on-target colour-wyvern mini-icon"></span>';
    const itemIcon = '<span class="ra ra-flat-hammer colour-item mini-icon"></span>';
    const rageIcon = '<span class="ra ra-player-pyromaniac colour-runic mini-icon"></span>';
    const conditionIcon = '<span class="ra ra-player-despair colour-disadvantage mini-icon"></span>'

    const statText = document.createElement('div');
    statText.className = 'help-text';

    const dice = document.createElement('div');
    dice.className = 'help-stat-text';
    dice.innerHTML = `
    ${hitIcon} - <b>Hit chance</b> determines if your attacks will hit. On basic attack or spell cast, you will roll a number from 1-20. If that number is greater than your foe’s ${armourIcon} , you will land a hit. You then will roll for damage, which depends on the type of ${damageIcon} or ${runicIcon}.
    `;

    const item = document.createElement('div');
    item.className = 'help-stat-text';
    item.innerHTML = `
    ${itemIcon} - <b>Items</b> can affect all sort of stats and gameplay, such as hit chance, maximum mana, health regeneration, and even grant double damage! Items can be very powerful if used in the correct situations. See <b>Item Guide</b> for more on items.
    `;

    const rage = document.createElement('div');
    rage.className = 'help-stat-text';
    rage.innerHTML = `
    ${rageIcon} - <b>Rage</b> allows some monsters to cast their own spells, or do a special attack against you. See <b>Bestiary</b> for more on monsters.
    `;

    const condition = document.createElement('div');
    condition.className = 'help-stat-text';
    condition.innerHTML = `
    ${conditionIcon} - <b>Conditions</b> are buffs or debuffs which can affect your stats for a certain period of time.  Monsters can cast buffs on themselves, and debuffs on you. Examples of conditions are <i>Bleeding</i>, <i>Scared<i/>, <i>Disadvantage</i>.
    `;

    statText.appendChild(dice);
    statText.appendChild(item);
    statText.appendChild(rage);
    statText.appendChild(condition);

    el.appendChild(statText);

  }

  buildSection3();

  const more = document.createElement('div');
  more.className = 'help-title';
  more.innerText = 'More';

  const itemguide = document.createElement('div');
  itemguide.className = 'help-item-guide';
  itemguide.innerText = 'Item Guide';
  itemguide.id = 'help-item-guide';

  el.appendChild(more);
  el.appendChild(itemguide);

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

  return helpModal;
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
    click.play();
    settingsModal.open();
  });

  const disable_music = document.getElementById('settings-mutemusic');
  disable_music.addEventListener('click', () => {
    if (disable_music.checked) {
      click.play();
      backgroundMusic.mute(true);
    } else {
      click.play();
      backgroundMusic.mute(false);
    }
  });

  const contrast_css = document.createElement('style');
  document.body.appendChild(contrast_css);

  const enable_highcontrast = document.getElementById('settings-highcontrast');
  enable_highcontrast.addEventListener('click', () => {
    if (enable_highcontrast.checked) {
      click.play();
      contrast_css.textContent = ` .home-interface {
        filter: contrast(200%);
      }`;
    } else {
      click.play();
      contrast_css.textContent = ``;
    }
  });
}

const mountItemGuideInterface = function () {

  const root = document.getElementById('item-guide-interface');

  const bar = document.createElement('div');
  bar.className = 'item-type-bar';
  bar.id = 'item-type-bar';

  const ringButton = document.createElement('button');
  ringButton.id = 'equipment-amulet';
  ringButton.className = 'spell spell-amulet square-button';
  const ringIcon = document.createElement('span');
  ringIcon.className = 'ra ra-gem-pendant icon';
  ringButton.appendChild(ringIcon);

  const armourButton = document.createElement('button');
  armourButton.id = 'equipment-armour';
  armourButton.className = 'spell spell-armour square-button';
  const armourIcon = document.createElement('span');
  armourIcon.className = 'ra ra-helmet icon';
  armourButton.appendChild(armourIcon);

  const trinketButton = document.createElement('button');
  trinketButton.id = 'equipment-trinket';
  trinketButton.className = 'spell spell-trinket square-button';
  const trinketIcon = document.createElement('span');
  trinketIcon.className = 'ra ra-ankh icon';
  trinketButton.appendChild(trinketIcon);

  bar.appendChild(ringButton);
  bar.appendChild(armourButton);
  bar.appendChild(trinketButton);

  root.appendChild(bar);

  const mountInterface = function (equipment) {

    const equipmentInterface = document.createElement('div');
    equipmentInterface.className = 'equipment-interface';

    const upper = document.createElement('div');
    upper.className = 'item-interface-upper';

    const left = document.createElement('div');
    left.className = 'item-interface-left';
    left.id = 'left';

    equipment.forEach((item) => {
      const box = document.createElement('div');
      box.className = 'item-box';
      box.id = item.id;
      const img = document.createElement('img');
      img.src = item.src;
      img.className = 'item-img';

      box.appendChild(img);
      left.appendChild(box);
    })

    const right = document.createElement('div');
    right.className = 'item-interface-right';
    right.id = 'right';

    const img = document.createElement('img');
    img.className = 'item-right-img';
    img.id = 'item-right-img';

    const name = document.createElement('div');
    name.className = 'item-label';
    name.id = 'item-label';

    const desc = document.createElement('div');
    desc.className = 'item-desc';
    desc.id = 'item-desc';

    const lore = document.createElement('div');
    lore.className = 'item-lore';
    lore.id = 'item-lore';

    right.appendChild(img);
    right.appendChild(name);
    right.appendChild(desc);
    right.appendChild(lore);

    upper.appendChild(left);
    upper.appendChild(right);

    // const lower = document.createElement('div');
    // const button = document.createElement('button');
    // button.className = 'weapon-interface-button';
    // button.id = 'amulet-interface-button';
    // button.innerText = 'EQUIP RING';

    // button.disabled = true;
    // button.classList.add('button-disabled');

    // lower.appendChild(button);

    equipmentInterface.appendChild(upper);
    // amuletInterface.appendChild(lower);

    root.appendChild(equipmentInterface);

    equipment.forEach((_item) => {
      const item = document.getElementById(_item.id);
      item.addEventListener('click', () => {
        item.classList.add('item-selected');

        const img = document.getElementById('item-right-img');
        img.src = _item.src;

        const label = document.getElementById('item-label');
        label.innerText = _item.name;

        const desc = document.getElementById('item-desc');
        desc.innerHTML = _item.desc;

        const lore = document.getElementById('item-lore');
        lore.innerText = _item.lore;

        const container = document.getElementById('left');
        Array.from(container.children).forEach((item) => {
          if (item.id != _item.id) {
            item.classList.remove('item-selected');
          }
        });
      });
    });
  }

  mountInterface(amulets);

  armourButton.addEventListener('click', () => {
    
  });

}

const buildItemGuideInterface = function (modal) {
  const itemModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['button', 'escape', 'overlay'],
    closeLabel: "Close",
    beforeClose: function () {
      return true;
    }
  });
  itemModal.setContent('<div class="item-guide-interface" id="item-guide-interface"></div>');
  mountItemGuideInterface();

  const itemGuide = document.getElementById('help-item-guide');
  itemGuide.addEventListener('click', () => {
    modal.close();
    itemModal.open();
  });
}

const render = function () {
  buildSettingsInterface();
  const helpModal = buildHelpInterface();
  buildItemGuideInterface(helpModal);
  backgroundMusic.play();
}

render();