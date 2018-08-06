import Stats from './stats';

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
}