const icons = {
  runic: '<span class="ra ra-crystals colour-runic"></span>',
  armour: '<span class="ra ra-shield colour-ac"></span>',
  damage: '<span class="ra ra-sword colour-damage"></span>',
};

const spells = {
  scorch: {
    name: 'Scorch',
    colour: 'orange',
    type: 'Basic',
    desc: `Deal 1d4${icons.damage} damage whilst ignoring 1d2${icons.runic} armour.`,
    lore: 'A fiery blast that scorches even the strongest armour.',
    src: '/res/spell/wizard/scorch.png',
  },
  incinerate: {
    name: 'Incinerate',
    colour: 'orange',
    type: 'Threshold',
    desc: `Deal 1d4${icons.damage} and inflicts target with Burning for 2${icons.runic} turns.`,
    lore: 'This evocation is notorious for burning numerous other knights to a crisp.',
    src: '/res/spell/wizard/incinerate.png',
  },
  blaze: {
    name: 'Incinerate',
    colour: 'orange',
    type: 'Ultimate',
    desc: `Deal 1d4${icons.damage} + 2 and burn off 1 ${icons.armour} armour class.`,
    lore: 'A spell that focuses the sun’s energies, degrading the effectiveness of armour.',
    src: '/res/spell/wizard/blaze.png',
  },
  arcaneBlast: {
    name: 'Arcane Blast',
    colour: 'fusia',
    type: 'Basic',
    desc: `Deal 1d2${icons.runic} damage. Applies 1 stack of Arcana to target.`,
    lore: 'Unstable arcane energy bursts from one plane to the other, disintegrating anything it touches.',
    src: '/res/spell/wizard/arcane-blast.png',
  },
  arcaneBlitz: {
    name: 'Arcane Blitz',
    colour: 'fusia',
    type: 'Threshold',
    desc: `Applies 2 stacks of Arcana to target.`,
    lore: 'Each blitz of arcane power strikes its target more quickly than the last.',
    src: '/res/spell/wizard/arcane-blitz.png',
  },
  arcaneBarrage: {
    name: 'Arcane Blitz',
    colour: 'fusia',
    type: 'Ultimate',
    desc: `Deal a total of (1d4${icons.damage} + 1d2${icons.runic}) damage.`,
    lore: 'Those who master the arcane are capable of releasing a barrage of unrelenting power upon their enemies.',
    src: '/res/spell/wizard/arcane-barrage.png',
  },
  frostbolt: {
    name: 'Frostbolt',
    colour: 'cyan',
    type: 'Basic',
    desc: `Deal 1d4${icons.damage} and have  (20 + 2${icons.runic})% chance to apply Frozen for 1 turn.`,
    lore: 'Even the simplest of ice manipulation can be bitterly cold.',
    src: '/res/spell/wizard/frostbolt.png',
  },
  iceSpike: {
    name: 'Ice Spike',
    colour: 'cyan',
    type: 'Threshold',
    desc: `Deals 1d ${icons.damage} + 2. Ice Spike damage is doubled against Frozen targets.`,
    lore: 'Imprison your foes in razor-sharp spikes of ice.',
    src: '/res/spell/wizard/ice-spike.png',
  },
  flurry: {
    name: 'Flurry',
    colour: 'cyan',
    type: 'Ultimate',
    desc: 'Applies Frozen to target for 1 turn.',
    lore: 'Conjure frozen and flurry winds to chill the field of battle.',
    src: '/res/spell/wizard/flurry.png',
  },
  prismaticShield: {
    name: 'Prismatic Shield',
    colour: 'mint',
    type: 'Basic',
    desc: `Increase armour class by (1d2${icons.runic} + 2) for 2 turns.`,
    lore: 'This enchantment grants protection from dark energies.',
    src: '/res/spell/wizard/prismatic-shield.png',
  },
  runeFlux: {
    name: 'Rune Flux',
    colour: 'mint',
    type: 'Ultimate',
    desc: `Increase runic by 1d2${icons.runic} for 3 turns.`,
    lore: 'Conjures an astral rune that crackles with power while raw energy leaks out.',
    src: '/res/spell/wizard/rune-flux.png',
  },
  nimbus: {
    name: 'Nimbus',
    colour: 'mint',
    type: 'Ultimate',
    desc: `Increase armour class by 1d2${icons.runic} for 2 turns and heal for (1d2${icons.runic} + 4) health.`,
    lore: 'Summons a cosmic ward that heals and protects those powerful enough to seek its aid.',
    src: '/res/spell/wizard/nimbus.png',
  },
  getSpell(name) {
    switch (name) {
      case 'scorch':
        return this.scorch;
      case 'incinerate':
        return this.incinerate;
      case 'blaze':
        return this.blaze;
      case 'arcane-blitz':
        return this.arcaneBlitz;
      case 'arcane-blast':
        return this.arcaneBlast;
      case 'arcane-barrage':
        return this.arcaneBarrage;
      case 'frostbolt':
        return this.frostbolt;
      case 'ice-spike':
        return this.iceSpike;
      case 'flurry':
        return this.flurry;
      case 'prismatic-shield':
        return this.prismaticShield;
      case 'rune-flux':
        return this.runeFlux;
      case 'nimbus':
        return this.nimbus;
      default:
        throw new TypeError(`Spell ${name} not defined.`);
    }
  },
};

export default spells;
