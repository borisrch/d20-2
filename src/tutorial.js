import tippy from 'tippy.js';

const pointer = '<span class="tutorial"></span>';

const tutorial = [
  `${pointer} Perform a Basic Attack!`,
  'Try cast a spell! Each one is different.',
  'Change your equipment! Equipment gives better stats.',
  'Buy a potion from the shop!',
  'View your trophies and achievements. Try collect them all!'
]

export const a = () => {
  const el = document.querySelector('.basic-container');
  el.setAttribute('title', tutorial[0]);
  
  const tip = tippy('.basic-container', {
    animation: 'shift-toward',
    duration: [600, 300],
    inertia: true,
    placement: 'bottom',
    theme: 'light',
  });

  el._tippy.show();

  $('#basic-attack').click(() => {
    el._tippy.hide();
    el._tippy.disable();
    b();
  });

  setTimeout(() => {
    el._tippy.hide();
    el._tippy.disable();
  }, 7000);
}

const b = () => {
  const el = document.querySelector('.spells-interface');
  el.setAttribute('title', tutorial[1]);

  const tip = tippy('.spells-interface', {
    animation: 'shift-toward',
    duration: [600, 300],
    inertia: true,
    placement: 'bottom',
    theme: 'light',
  });
  el._tippy.enable();  
  el._tippy.show();
  el._tippy.show();
}