import { icon, text } from '../icons';

const spells = {
  scorch: {
    name: 'Scorch',
    colour: 'orange',
    type: 'Basic',
    desc: `Deal ${icon.damage}${text.damage(4)} damage whilst ignoring ${icon.runic}${text.runic(2)} armour.`,
    info: null,
    lore: 'A fiery blast that scorches even the strongest armour.',
    src: '/res/spell/wizard/scorch.png',
    anim: 'fire-spell',
  },
  incinerate: {
    name: 'Incinerate',
    colour: 'orange',
    type: 'Threshold',
    desc: `Deal ${icon.damage}${text.damage(4)} and inflicts target with ${text.i('Burning')} for ${icon.runic}${text.runic(2)} turns.`,
    info: `${icon.burning} ${text.b('Burning')} - deals ${icon.runic}${text.runic(2)} damage per turn.`,
    lore: 'This evocation is notorious for burning numerous other knights to a crisp.',
    src: '/res/spell/wizard/incinerate.png',
    anim: 'fire-spell',
  },
  blaze: {
    name: 'Blaze',
    colour: 'orange',
    type: 'Ultimate',
    desc: `Deal ${icon.damage}${text.damage(4)}${text.group(' + 4')} damage and burn off ${icon.runic}${text.runic(2)} armour class.`,
    info: null,
    lore: 'A spell that focuses the sun’s energies, degrading the effectiveness of armour.',
    src: '/res/spell/wizard/blaze.png',
    anim: 'fire-spell',
  },
  arcaneBlast: {
    name: 'Arcane Blast',
    colour: 'fusia',
    type: 'Basic',
    desc: `Deal a total of ${text.group(`${icon.damage}${text.damage(4)} + ${icon.runic}${text.runic(2)}`)} damage.`,
    info: null,
    lore: 'Unstable arcane energy bursts from one plane to the other.',
    src: '/res/spell/wizard/arcane-blast.png',
    anim: 'arcane-spell',
  },
  arcaneBlitz: {
    name: 'Arcane Blitz',
    colour: 'fusia',
    type: 'Threshold',
    desc: `Deal ${icon.runic}${text.runic(2)} damage. Applies 1 stack of ${text.i('Arcana')} to target.`,
    info: `${icon.arcana} ${text.b('Arcana')} - Arcane spells consume ${text.i('Arcana')} stacks to deal bonus ${text.group('4')} damage per stack.`,
    lore: 'Each blitz of arcane power strikes its target more quickly than the last.',
    src: '/res/spell/wizard/arcane-blitz.png',
    anim: 'arcane-spell',
  },
  arcaneBarrage: {
    name: 'Arcane Barrage',
    colour: 'fusia',
    type: 'Ultimate',
    desc: `Applies 2 stacks of ${text.i('Arcana')} to target.`,
    info: `${icon.arcana} ${text.b('Arcana')} - Arcane spells consume ${text.i('Arcana')} stacks to deal bonus ${text.group('4')} damage per stack.`,
    lore: 'Masters are capable of releasing a barrage of unrelenting power upon their enemies.',
    src: '/res/spell/wizard/arcane-barrage.png',
    anim: 'arcane-spell',
  },
  frostbolt: {
    name: 'Frostbolt',
    colour: 'cyan',
    type: 'Basic',
    desc: `Deal ${icon.damage}${text.damage(4)} damage and have ${text.group(`20 + ${icon.runic}${text.runic('2')}%`)} chance to apply ${text.i('Frozen')} for 1 turn.`,
    info: `${icon.frozen} ${text.b('Frozen')} - Target is stunned and will not perform an attack this turn.`,
    lore: 'Even the simplest of ice manipulation can be bitterly cold.',
    src: '/res/spell/wizard/frostbolt.png',
    anim: 'ice-spell',
  },
  iceSpike: {
    name: 'Ice Spike',
    colour: 'cyan',
    type: 'Threshold',
    desc: `Deal ${icon.damage}${text.damage(2)} damage. Ice Spike damage is doubled against ${text.i('Frozen')} targets.`,
    info: null,
    lore: 'Imprison your foes in razor-sharp spikes of ice.',
    src: '/res/spell/wizard/ice-spike.png',
    anim: 'ice-spell',
  },
  flurry: {
    name: 'Flurry',
    colour: 'cyan',
    type: 'Ultimate',
    desc: `Applies ${text.i('Frozen')} to target for 1 turn.`,
    info: `${icon.frozen} ${text.b('Frozen')} - Target is stunned and will not perform an attack this turn.`,
    lore: 'Conjure frozen and flurry winds to chill the field of battle.',
    src: '/res/spell/wizard/flurry.png',
    anim: 'ice-spell',
  },
  prismaticShield: {
    name: 'Prismatic',
    colour: 'mint',
    type: 'Basic',
    desc: `Increase armour class by ${icon.runic}${text.runic('2')}${text.group(' + 2')} for 2 turns.`,
    info: null,
    lore: 'This enchantment grants protection from dark energies.',
    src: '/res/spell/wizard/prismatic-shield.png',
    anim: 'prismatic-spell',
  },
  runeFlux: {
    name: 'Rune Flux',
    colour: 'mint',
    type: 'Ultimate',
    desc: `Increase runic by ${icon.runic}${text.runic('2')} for 3 turns.`,
    info: null,
    lore: 'Conjures an astral rune that crackles with power while raw energy leaks out.',
    src: '/res/spell/wizard/rune-flux.png',
    anim: 'rune-flux-spell',
  },
  nimbus: {
    name: 'Nimbus',
    colour: 'mint',
    type: 'Ultimate',
    desc: `Increase armour class by ${icon.runic}${text.runic('2')} for 2 turns and heal for ${icon.runic}${text.runic('2')}${text.group(' + 4')} health.`,
    info: null,
    lore: 'Summons a cosmic ward that heals and protects those powerful enough to seek its aid.',
    src: '/res/spell/wizard/nimbus.png',
    anim: 'nimbus-spell',
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
