import { DEV } from './dev';

export const roll = function(n) {
  let min = 1;
  let max = Math.floor(n);
  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

export const bonus = function(runic, n) {
  let b = 0;
  for (let i = 0; i < runic; i++) {
    b = b + roll(n);
  }
  return b;
}

export const attack = function(playerDamage, playerHitChanceModifier, playerDamageModifier, playerMultiplier, monsterArmour) {

  if(DEV) {
    console.log('pDamage: ' + playerDamage + ' pHitChance: ' + playerHitChanceModifier + ' pDamageMod ' + playerDamageModifier + ' pMultiplier: ' + playerMultiplier + ' monsterArmour: ' + monsterArmour);
  }

  let result = 0;
  let hit = roll(20) + playerHitChanceModifier;  
  if (hit >= monsterArmour) {
    for (let i = 0; i < playerMultiplier; i++) {
      result += roll(playerDamage);
    }
    result += playerDamageModifier;    
    return result;
  }
  return result = null;
}

export const getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
}