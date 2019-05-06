const icon = {
  runic: '<span class="ra ra-crystals colour-runic"></span>',
  armour: '<span class="ra ra-shield colour-ac"></span>',
  damage: '<span class="ra ra-sword colour-damage"></span>',
  burning: '<span class="ra ra-small-fire colour-condition"></span>',
  frozen: '<span class="ra ra-frost-emblem colour-condition"></span>',
  arcana: '<span class="ra ra-focused-lightning colour-condition"></span>',
};

const text = {
  runic(value) {
    return `<span class="colour-runic">${value}</span>`;
  },
  damage(value) {
    return `<span class="colour-damage">${value}</span>`;
  },
  armour(value) {
    return `<span class="colour-ac">${value}</span>`;
  },
  group(value) {
    return `<span class="colour-condition">${value}</span>`;
  },
  i(value) {
    return `<span class="italic colour-condition">${value}</span>`;
  },
  b(value) {
    return `<span class="bold colour-condition">${value}</span>`;
  },
};

export default { icon, text };
