import { DEV } from './dev';
import { alzursThunderCondition } from './conditions';

const throwIfMissing = () => { throw new Error('Missing Paramater') };

// Returns result of random 1 to n.
export const roll = function(n) {
  let min = 1;
  let max = Math.floor(n);
  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

// Returns bonus of runic d n
export const bonus = function(runic, n) {
  let b = 0;
  for (let i = 0; i < runic; i++) {
    b = b + roll(n);
  }
  return b;
}

// Returns result of damage or null, considers conditions.
export const attack = function(playerDamage = throwIfMissing(), playerHitChanceModifier = throwIfMissing(), playerDamageModifier = throwIfMissing(), playerMultiplier = throwIfMissing(), monsterArmour = throwIfMissing()) {

  let extra = 0;

  if (alzursThunderCondition.turns > 0) {
    extra = extra + roll(4);
    alzursThunderCondition.turns--;
  }

  if (DEV) {
    console.log('@Attack')
    console.log('Damage: ' + playerDamage + ' HitChance: ' + playerHitChanceModifier + ' DamageMod ' + playerDamageModifier + ' Multiplier: ' + playerMultiplier + ' Armour: ' + monsterArmour);
    console.log('Extra Spell Damage: ' + extra);
  }

  let result = 0;
  let hit = roll(20) + playerHitChanceModifier;  
  if (hit >= monsterArmour) {
    for (let i = 0; i < playerMultiplier; i++) {
      result += roll(playerDamage);
    }
    result += playerDamageModifier;    
    return result + extra;
  }
  return result = null;
}

// Returns result of damage or null, does not consider any conditions.
export const pureAttack = function(playerDamage, playerHitChanceModifier, playerDamageModifier, playerMultiplier, monsterArmour) {

  if (DEV) {
    console.log('@PureAttack');
    console.log('Damage: ' + playerDamage + ' HitChance: ' + playerHitChanceModifier + ' DamageMod ' + playerDamageModifier + ' Multiplier: ' + playerMultiplier + ' Armour: ' + monsterArmour);    
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

// Returns random int. Utility function.
export const getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
