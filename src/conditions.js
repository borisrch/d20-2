import Stats from './stats';

// Spell conditions
export const alzursThunderCondition = {
  turns: 0,
}

export const deathfireGraspCondition = {
  active: false,
  stack: 0,
}

export const runicEchoesCondition = {
  active: false,
  bonusArmour: 0,
}

export const resetMonsterConditions = () => {
  alzursThunderCondition.turns = 0;
}

// Equipment conditions
export const sapphireAmuletCondition = {
  active: false
}

export const FEROCIOUS_RING_CONDITION = {
  active: false,
  bonus: 3,
}

export const GUARDIAN_RING_CONDITION = {
  active: false,
  bonus: 2,
}

export const ARCANE_RING_CONDITION = {
  active: false,
}

export const SEERS_RING_CONDITION = {
  active: false,
}

export const ARTEMISIAN_RING_CONDITION = {
  active: false,
}

export const resetRing = () => {

  if (FEROCIOUS_RING_CONDITION.active) {
    Stats.playerDamage = Stats.playerDamage - FEROCIOUS_RING_CONDITION.bonus;
  }
  if (GUARDIAN_RING_CONDITION.active) {
    Stats.playerArmour = Stats.playerArmour - GUARDIAN_RING_CONDITION.bonus;
  }

  FEROCIOUS_RING_CONDITION.active = false;
  GUARDIAN_RING_CONDITION.active = false;
  ARCANE_RING_CONDITION.active = false;
  SEERS_RING_CONDITION.active = false;
  ARTEMISIAN_RING_CONDITION.active = false;

}

// Potion conditions
export const defensePotionCondition = {
  turns: 0,
  bonusArmour: 0,
  active: false,
}

export const accuracyPotionCondition = {
  turns: 0,
  bonus: 0,
  active: false,
}

export const runicPotionCondition = {
  turns: 0,
  bonus: 0,
  active: false,
}

// Monster spells
export const dwarfTankCondition = {
  active: false,
  bonusArmour: 0,
}

export const playerDisadvantage = {
  active: false,
}

export const monsterDead = {
  active: false,
}

export const skeletonFrightenCondition = {
  active: false,
  turns: 0,
  reduction: 0,
}

export const undeadCondition = {
  active: false,
}