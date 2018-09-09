const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';
const manaIcon = '<span class="ra ra-lightning-bolt colour-mana"></span>';
const hitIcon = '<span class="ra ra-on-target colour-hit"></span>';

export const wizardItems = [
  {
    name: 'Mystic Wand',
    id: 'weapon-mystic-wand',
    img: 'res/item/wizard/1.png',
    stats: {
      runic: 2,
    },
    desc: `${runicIcon} 2 Runic`,
    active: true,
  },
  {
    name: 'Faerun Staff',
    id: 'weapon-faerun-staff',
    img: 'res/item/wizard/2.png',
    stats: {
      runic: 3,
      damage: 2,
    },
    desc: `${runicIcon} 3 Runic <br> ${damageIcon} 2 Damage`,
    active: true,
  },
  {
    name: 'Vineblight Staff',
    id: 'weapon-vineblight-staff',
    img: 'res/item/wizard/3.png',
    stats: {
      runic: 4,
      damage: 4,
      hit: 1,
    },
    desc: `${runicIcon} 4 Runic <br> ${damageIcon} 4 Damage <br> ${hitIcon} 1  Hit`,
    active: true,
  }, 
  {
    name: 'Dragonblood Staff',
    id: 'weapon-dragonblood-staff',
    img: 'res/item/wizard/4.png',
    stats: {
      runic: 5,
      damage: 5,
      hit: 2,
    },
    desc: `${runicIcon} 5 Runic <br> ${damageIcon} 5 Damage <br> ${hitIcon} 2 Hit`,
    active: true,
  }, 
  {
    name: 'Infinity Staff',
    id: 'weapon-infinity-staff',
    img: 'res/item/wizard/5.png',
    stats: {
      runic: 6,
      damage: 6,
      hit: 3,
    },
    desc: `${runicIcon} 6 Runic <br> ${damageIcon} 6 Damage <br> ${hitIcon} 3 Hit`,
    active: true,
  },
]