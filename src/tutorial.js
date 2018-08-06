import introJs from 'intro.js';

const steps = [
  {
    el: '#basic-attack',
    info: 'Try perform a basic attack.',
    step: 1,
  },
  {
    el: '.ability-interface',
    info: 'Try casting a spell! Each class has different spells with different effects.',
    step: 2,
  },
  {
    el: '.equipment-interface',
    info: 'Potions purchased from the shop will be used immediately, but cost a turn.',
    step: 3,
  },
];

export const runTutorial = () => {
  let active = true;

  steps.forEach((step) => {
    $(step.el).attr('data-intro', step.info);
    $(step.el).attr('data-step', step.step);
  });
  introJs().setOption('overlayOpacity', '0.25');
  introJs().start();
}