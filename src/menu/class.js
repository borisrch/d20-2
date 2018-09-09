import { 
  wizard,
  ranger
} from './classes';

const addClassPanel = (obj) => {

  const panel = document.createElement('div');
  panel.className = 'class-panel';
  panel.id = obj.id;

  const img = document.createElement('img');
  img.src = obj.src;
  img.className = 'class-background';

  const title = document.createElement('div');
  title.className = 'class-title';
  title.innerText = obj.title;

  const spellContainers = document.createElement('div');
  spellContainers.className = 'class-spells';

  obj.spells.forEach((spell) => {

    const button = document.createElement('div');
    button.className = spell.button;
    button.id = spell.name;

    const icon = document.createElement('span');
    icon.className = spell.icon;

    button.appendChild(icon);
    spellContainers.appendChild(button);
  })

  const description = document.createElement('div');
  description.className = 'class-description';
  description.innerText = obj.desc;

  const stats = document.createElement('div');
  stats.className = 'stat-group';

  obj.stats.forEach((stat) => {

    const icon = document.createElement('span');
    icon.classList.add('stat-icon', 'ra');

    const bar = document.createElement('div');
    bar.className = 'bar';

    const fill = document.createElement('div');
    fill.classList.add('fill');

    if (stat.icon == 'ac') {
      icon.classList.add('ra-shield', 'colour-ac');
      fill.classList.add('fill-ac');
    } else if (stat.icon == 'damage') {
      icon.classList.add('ra-sword', 'colour-damage-tip');
      fill.classList.add('fill-damage');
    } else if (stat.icon == 'runic') {
      icon.classList.add('ra-crystals', 'colour-runic-tip');
      fill.classList.add('fill-runic');
    }

    fill.setAttribute('style', `width: ${stat.fill}%`);

    stats.appendChild(icon);
    bar.appendChild(fill);
    stats.appendChild(bar);

  })

  panel.appendChild(img);
  panel.appendChild(title);
  panel.appendChild(spellContainers);
  panel.appendChild(description);
  panel.appendChild(stats);

  const container = document.getElementById('class-container');
  container.appendChild(panel);
}

export const buildClassPanel = () => {
  const selection = document.getElementById('character-selection');
  const panels = document.createElement('div');
  panels.id = 'class-container';
  panels.className = 'class-container';
  selection.appendChild(panels);
  
  addClassPanel(wizard);
  addClassPanel(ranger);
}