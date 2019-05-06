import MersenneTwister from 'mersenne-twister';
import { DEV } from './dev';
import { alzursThunderCondition, playerDisadvantage } from './conditions';


const throwIfMissing = () => { throw new Error('Missing Paramater'); };

const generator = new MersenneTwister();

// Returns result of random 1 to n.
export const roll = function (n) {
  const min = 1;
  const max = Math.floor(n);
  const rand = generator.random();
  const result = Math.floor(rand * (max - min + 1)) + min;
  return result;
};

// Returns bonus of runic d n
export const bonus = function (runic, n) {
  let b = 0;
  for (let i = 0; i < runic; i += 1) {
    b += roll(n);
  }
  return b;
};

// Returns result of damage or null, considers conditions.
export const attack = function (playerDamage = throwIfMissing(), playerHitChanceModifier = throwIfMissing(), playerDamageModifier = throwIfMissing(), playerMultiplier = throwIfMissing(), monsterArmour = throwIfMissing()) {

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

  if (playerDisadvantage.active === true) {
    const hitSecond = roll(20) + playerHitChanceModifier;

    if (DEV) {
      console.log(`Disadvantaged - hit: ${hit}, hitSecond: ${hitSecond}`);
    }

    if (hitSecond < hit) {
      hit = hitSecond;
    }
    playerDisadvantage.active = false;
  }

  if (hit >= monsterArmour) {
    for (let i = 0; i < playerMultiplier; i += 1) {
      result += roll(playerDamage);
    }
    result += playerDamageModifier;
    return result + extra;
  }
  return result = null;
};

// Returns result of damage or null, does not consider any conditions.
export const pureAttack = function (
  damage = throwIfMissing(),
  hitchance = throwIfMissing(),
  modifier = throwIfMissing(),
  multiplier = throwIfMissing(),
  armour = throwIfMissing(),
) {
  let result = 0;
  const hit = roll(20) + hitchance;
  if (hit >= armour) {
    for (let i = 0; i < multiplier; i += 1) {
      result += roll(damage);
    }
    result += modifier;
    return result;
  }
  return result = null;
};