import Stats from './stats';

// Spell conditions
export const alzursThunderCondition = {
  turns: 0,
};

export const deathfireGraspCondition = {
  active: false,
  stack: 0,
};

export const runicEchoesCondition = {
  active: false,
  bonusArmour: 0,
};

// Equipment conditions
export const sapphireAmuletCondition = {
  active: false,
};

export const FEROCIOUS_RING_CONDITION = {
  active: false,
  bonus: 3,
};

export const GUARDIAN_RING_CONDITION = {
  active: false,
  bonus: 2,
};

export const ARCANE_RING_CONDITION = {
  active: false,
};

export const SEERS_RING_CONDITION = {
  active: false,
};

export const ARTEMISIAN_RING_CONDITION = {
  active: false,
};

export const resetRing = () => {
  if (FEROCIOUS_RING_CONDITION.active) {
    Stats.playerDamage -= FEROCIOUS_RING_CONDITION.bonus;
  }
  if (GUARDIAN_RING_CONDITION.active) {
    Stats.playerArmour -= GUARDIAN_RING_CONDITION.bonus;
  }
  FEROCIOUS_RING_CONDITION.active = false;
  GUARDIAN_RING_CONDITION.active = false;
  ARCANE_RING_CONDITION.active = false;
  SEERS_RING_CONDITION.active = false;
  ARTEMISIAN_RING_CONDITION.active = false;
};

export const WIZARD_WEAPON_1 = {
  active: false,
  stats: {
    runic: 2,
    damage: 6,
    hit: null,
  },
};

export const WIZARD_WEAPON_2 = {
  active: false,
  stats: {
    runic: 3,
    damage: 8,
    hit: null,
  },
};

export const WIZARD_WEAPON_3 = {
  active: false,
  stats: {
    runic: 4,
    damage: 10,
    hit: 1,
  },
};

export const WIZARD_WEAPON_4 = {
  active: false,
  stats: {
    runic: 5,
    damage: 11,
    hit: 2,
  },
};

export const WIZARD_WEAPON_5 = {
  active: false,
  stats: {
    runic: 6,
    damage: 12,
    hit: 3,
  },
};

export const resetWizardWeapon = () => {
  if (WIZARD_WEAPON_1.active) {
    Stats.playerDamage -= WIZARD_WEAPON_1.stats.damage;
    Stats.playerRunic -= WIZARD_WEAPON_1.stats.runic;
  }
  if (WIZARD_WEAPON_2.active) {
    Stats.playerDamage -= WIZARD_WEAPON_2.stats.damage;
    Stats.playerRunic -= WIZARD_WEAPON_2.stats.runic;
  }
  if (WIZARD_WEAPON_3.active) {
    Stats.playerDamage -= WIZARD_WEAPON_3.stats.damage;
    Stats.playerRunic -= WIZARD_WEAPON_3.stats.runic;
    Stats.playerHitChanceModifier -= WIZARD_WEAPON_3.stats.hit;
  }
  if (WIZARD_WEAPON_4.active) {
    Stats.playerDamage -= WIZARD_WEAPON_4.stats.damage;
    Stats.playerRunic -= WIZARD_WEAPON_4.stats.runic;
    Stats.playerHitChanceModifier -= WIZARD_WEAPON_4.stats.hit;
  }
  if (WIZARD_WEAPON_5.active) {
    Stats.playerDamage -= WIZARD_WEAPON_5.stats.damage;
    Stats.playerRunic -= WIZARD_WEAPON_5.stats.runic;
    Stats.playerHitChanceModifier -= WIZARD_WEAPON_5.stats.hit;
  }

  WIZARD_WEAPON_1.active = false;
  WIZARD_WEAPON_2.active = false;
  WIZARD_WEAPON_3.active = false;
  WIZARD_WEAPON_4.active = false;
  WIZARD_WEAPON_5.active = false;
};

// Potion conditions
export const defensePotionCondition = {
  turns: 0,
  bonusArmour: 0,
  active: false,
};

export const accuracyPotionCondition = {
  turns: 0,
  bonus: 0,
  active: false,
};

export const runicPotionCondition = {
  turns: 0,
  bonus: 0,
  active: false,
};

// Monster spells
export const dwarfTankCondition = {
  active: false,
  bonusArmour: 0,
};

export const playerDisadvantage = {
  active: false,
};

export const monsterDead = {
  active: false,
};

export const skeletonFrightenCondition = {
  active: false,
  turns: 0,
  reduction: 0,
};

export const undeadCondition = {
  active: false,
};

export const resetMonsterConditions = () => {
  alzursThunderCondition.turns = 0;
  dwarfTankCondition.active = false;
};