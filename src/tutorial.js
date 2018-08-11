import introJs from 'intro.js';

const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';
const br = '<br/>';

const steps = [
  {
    el: '.game-interface',
    info: `Welcome to the Wizards Bathtub. ${br} ${br} This tutorial will show you how the game works. You may skip and revisit this tutorial anytime in the options.`,
    step: 1,
    position: null,
  },
  {
    el: '#basic-attack',
    info: `Press this to perform a basic attack. ${br} ${br} Basic attacks do not cost any mana, and will deal damage based on your ${damageIcon} damage stat.`,
    step: 2,
    position: null,
  },
  {
    el: '.spells-interface',
    info: `Each class has unique spells with unique effects. ${br} ${br} Spells cost mana and will be more powerful based on your ${runicIcon} runic stat.`,
    step: 3,
    position: 'top',
  },
  {
    el: '.equipment-interface',
    info: `You can access the equiment interface to change your gear once purchased from the Armoury. ${br} ${br} You can also buy potions from the shop to aid you in combat. Potions purchased will have their effects granted immediately.`,
    step: 4,
    position: null,
  },
  {
    el: '.player-graphic',
    info: 'Wizards Bathtub is turn based. Performing a basic attack, casting a spell, or purchasing a potion will end your turn.',
    step: 5,
    position: null,
  },
  {
    el: '.monster-graphic',
    info: 'After your turn, it will be the monsters turn. Monsters will have an arsenal of spells and quirks to attack you with, so be prepared!',
    step: 6,
    position: null,
  },
  {
    el: '.achievement-interface',
    info: 'You may view your achievements, trophies and options here.',
    step: 7,
    position: null,
  },
];

export const runTutorial = () => {
  let active = true;

  steps.forEach((step) => {
    $(step.el).attr('data-intro', step.info);
    $(step.el).attr('data-step', step.step);

    if(step.position !== null) {
      $(step.el).attr('data-position', step.position);
    }
  });
  
  const intro = introJs();
  intro.setOption('showBullets', false);
  intro.setOption('showProgress', true);
  intro.start();
}