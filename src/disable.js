import Stats from './stats';

const q = document.getElementById('q');
const w = document.getElementById('w');
const e = document.getElementById('e');
const r = document.getElementById('r');
const ba = document.getElementById('basic-attack');
const eq = document.getElementById('equipment-new');
const s = document.getElementById('equipment-shop');

export const disable = function () {
  ba.disabled = true;
  q.disabled = true;
  w.disabled = true;
  e.disabled = true;
  r.disabled = true;
  eq.disabled = true;
  s.disabled = true;
};

export const enable = function () {
  ba.disabled = false;

  if (Stats.playerSpells[0].cost > Stats.playerMana) {
    q.classList.add('no-mana');
  } else {
    q.classList.remove('no-mana');
    q.disabled = false;
  }

  if (Stats.playerSpells[1].cost > Stats.playerMana) {
    w.classList.add('no-mana');
  } else {
    w.classList.remove('no-mana');
    w.disabled = false;
  }

  if (Stats.playerSpells[2].cost > Stats.playerMana) {
    e.classList.add('no-mana');
  } else {
    e.classList.remove('no-mana');
    e.disabled = false;
  }

  if (Stats.playerSpells[3].cost > Stats.playerMana) {
    r.classList.add('no-mana');
  } else {
    r.classList.remove('no-mana');
    r.disabled = false;
  }
  
  eq.disabled = false;
  s.disabled = false;
};