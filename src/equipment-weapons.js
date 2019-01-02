import {
  WIZARD_WEAPON_1,
  WIZARD_WEAPON_2,
  WIZARD_WEAPON_3,
  WIZARD_WEAPON_4,
  WIZARD_WEAPON_5,
  resetWizardWeapon,
} from './conditions';
import Stats from './stats';
import { updateStats } from './update';

const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';
const manaIcon = '<span class="ra ra-lightning-bolt colour-mana"></span>';
const hitIcon = '<span class="ra ra-on-target colour-hit"></span>';

const playerGraphic = document.getElementById('player-graphic');

export const wizardItems = [
  {
    name: 'Mystic Wand',
    id: 'weapon-mystic-wand',
    img: 'res/item/wizard/1.png',
    desc: `${runicIcon} 2 Runic`,
    active: true,
    action() {
      resetWizardWeapon();
      WIZARD_WEAPON_1.active = true;
      Stats.playerDamage += WIZARD_WEAPON_1.stats.damage;
      Stats.playerRunic += WIZARD_WEAPON_1.stats.runic;
      Stats.playerWeapon = this.id;
      playerGraphic.src = '/res/player/wizard/wizard-1-animated.gif';
    },
  },
  {
    name: 'Faerun Staff',
    id: 'weapon-faerun-staff',
    img: 'res/item/wizard/2.png',
    desc: `${runicIcon} 3 Runic <br> ${damageIcon} 2 Damage`,
    active: false,
    action() {
      resetWizardWeapon();
      WIZARD_WEAPON_2.active = true;
      Stats.playerDamage += WIZARD_WEAPON_2.stats.damage;
      Stats.playerRunic += WIZARD_WEAPON_2.stats.runic;
      Stats.playerWeapon = this.id;
      Stats.playerGraphic = this.img;
      playerGraphic.src = '/res/player/wizard/wizard-2.png';
    },
  },
  {
    name: 'Vineblight Staff',
    id: 'weapon-vineblight-staff',
    img: 'res/item/wizard/3.png',
    desc: `${runicIcon} 4 Runic <br> ${damageIcon} 4 Damage <br> ${hitIcon} 1  Hit`,
    active: false,
    action() {
      resetWizardWeapon();
      WIZARD_WEAPON_3.active = true;
      Stats.playerDamage += WIZARD_WEAPON_3.stats.damage;
      Stats.playerRunic += WIZARD_WEAPON_3.stats.runic;
      Stats.playerHitChanceModifier += WIZARD_WEAPON_3.stats.hit;
      Stats.playerWeapon = this.id;
      Stats.playerGraphic = this.img;
      playerGraphic.src = '/res/player/wizard/wizard-3.png';
    },
  },
  {
    name: 'Dragonblood Staff',
    id: 'weapon-dragonblood-staff',
    img: 'res/item/wizard/4.png',
    desc: `${runicIcon} 5 Runic <br> ${damageIcon} 5 Damage <br> ${hitIcon} 2 Hit`,
    active: false,
    action() {
      resetWizardWeapon();
      WIZARD_WEAPON_4.active = true;
      Stats.playerDamage += WIZARD_WEAPON_4.stats.damage;
      Stats.playerRunic += WIZARD_WEAPON_4.stats.runic;
      Stats.playerHitChanceModifier += WIZARD_WEAPON_4.stats.hit;
      Stats.playerWeapon = this.id;
      Stats.playerGraphic = this.img;
      playerGraphic.src = '/res/player/wizard/wizard-4.png';
    },
  },
  {
    name: 'Infinity Staff',
    id: 'weapon-infinity-staff',
    img: 'res/item/wizard/5.png',
    desc: `${runicIcon} 6 Runic <br> ${damageIcon} 6 Damage <br> ${hitIcon} 3 Hit`,
    active: false,
    action() {
      resetWizardWeapon();
      WIZARD_WEAPON_5.active = true;
      Stats.playerDamage += WIZARD_WEAPON_5.stats.damage;
      Stats.playerRunic += WIZARD_WEAPON_5.stats.runic;
      Stats.playerHitChanceModifier += WIZARD_WEAPON_4.stats.hit;
      Stats.playerWeapon = this.id;
      Stats.playerGraphic = this.img;
      playerGraphic.src = '/res/player/wizard/wizard-5.png';
    },
  },
];

export const temp = true;
