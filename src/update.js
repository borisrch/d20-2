import tippy from 'tippy.js';
import Stats from './stats';
import { properties } from './properties/properties';

const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';
const manaIcon = '<span class="ra ra-lightning-bolt colour-mana-tip"></span>';

export const updateStats = function () {
  $('.player-health').text(Stats.playerHealth);
  $('.player-damage').text(Stats.playerDamage);
  $('.player-armour').text(Stats.playerArmour);
  $('.player-runic').text(Stats.playerRunic);
  $('.player-mana').text(Stats.playerMana);

  $('.monster-health').text(Stats.monsterHealth);
  $('.monster-armour').text(Stats.monsterArmour);
  $('.monster-damage').text(Stats.monsterDamage);
  $('.monster-rage').text(Stats.monsterRage);
  $('.monster-label').text(Stats.monsterName);

  updateSpells();

}

const updateSpells = function() {

  const b = document.getElementById('basic-attack');
  b._tippy.setContent(`<b>Basic Attack</b> - Deal 1-${Stats.playerDamage} ${damageIcon} .`);

  const q = document.getElementById('q');
  q._tippy.setContent(`<b>Scorch (${manaIcon}75 )</b> - Deal 1-${Stats.playerDamage} ${damageIcon} while ignoring 2 ${armourIcon}.<br/>Ignore an additional 1-2 ${armourIcon} per ${runicIcon} level.`);

  const w = document.getElementById('w');
  w._tippy.setContent(`<b>Alzur's Thunder (${manaIcon}100 )</b> - Deal 2-8 ${damageIcon} and apply <i>Shocked</i>, which deals bonus 1-4 ${damageIcon} for ${runicIcon} turns.`);

  const e = document.getElementById('e');
  e._tippy.setContent(`<b>Anima Surge (${manaIcon}50 )</b> - Deal 1-${Stats.playerDamage} ${damageIcon} and 1-${Stats.playerRunic} ${runicIcon} .<br/>Add bonus 1 ${damageIcon} per ${runicIcon} level.`);

  const r = document.getElementById('r');
  r._tippy.setContent(`<b>Runic Echoes (${manaIcon}25 )</b> - Increase ${armourIcon} by 1-2 per ${runicIcon} level for the next turn.`);
  
}