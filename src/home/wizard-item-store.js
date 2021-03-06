import {
  icon,
  text
} from '../icons';

const rings = {
  ferocious: {
    name: 'Ferocious Ring',
    id: 'ferocious-ring',
    src: '/res/item/amulet/ferocious-ring.png',
    desc: `+ ${icon.damage}${text.damage(3)}`,
    lore: 'The ring\'s bright ruby color is unmistakable on the battlefield.',
    cost: 50,
    locked: true,
  },
  guardian: {
    name: 'Guardian Ring',
    id: 'guardian-ring',
    src: '/res/item/amulet/guardian-ring.png',
    desc: `+ ${icon.armour}${text.armour(2)}`,
    lore: 'A glimmering ring that defends its bearer.',
    cost: 50,
    locked: true,
  },
  arcane: {
    name: 'Arcane Ring',
    id: 'arcane-ring',
    src: '/res/item/amulet/arcane-ring.png',
    desc: `+ ${icon.runic}${text.runic(2)}`,
    lore: 'Its gem was once used to channel void realm magic, this ring pulses with energy.',
    cost: 50,
    locked: true,
  },
  seers: {
    name: 'Seers Ring',
    id: 'seers-ring',
    src: '/res/item/amulet/seers-ring.png',
    desc: `+ 50 Mana`,
    lore: 'A ring that grants more mana to its bearer.',
    cost: 50,
    locked: true,
  },
  artemis: {
    name: 'Artemisian Ring',
    id: 'artemis-ring',
    src: '/res/item/amulet/artemis-ring.png',
    desc: `+ 2 hit`,
    lore: 'This ring is considered a good luck charm among the elves.',
    cost: 50,
    locked: true,
  },
};

const armour = {
  circe: {
    name: 'Robe of Circe',
    id: 'circe-armour',
    src: '/res/item/armour/circe-armour.png',
    desc: `Increase to 50 mana regeneration per turn.`,
    lore: 'This elegant garment was once worn by a powerful enchantress.',
    cost: 50,
    locked: true,
  },
  colossus: {
    name: 'Mantle of the Colossus',
    id: 'colossus-armour',
    src: '/res/item/armour/colossus-armour.png',
    desc: `Increase max health by 50.`,
    lore: 'Reforged armour made from the metal of the fallen Colossus.',
    cost: 50,
    locked: true,
  },
  valkyrie: {
    name: 'Valkyrie Armour',
    id: 'valkyrie-armour',
    src: '/res/item/armour/valkyrie-armour.png',
    desc: `Heal for 4 per turn.`,
    lore: 'Legendary armour worn by the Valkyries known for its regenerative magic.',
    cost: 50,
    locked: true,
  },
  daedric: {
    name: 'Daedric Carapace',
    id: 'daedric-armour',
    src: '/res/item/armour/daedric-armour.png',
    desc: `Grants 10% lifesteal on all attacks.`,
    lore: 'This hellish mail favoured by the Daedra for its dark nature.',
    cost: 50,
    locked: true,
  },
  leviathan: {
    name: 'Leviathan Chestplate',
    id: 'leviathan-armour',
    src: '/res/item/armour/leviathan-armour.png',
    desc: `Grants 15% damage reduction from incoming attacks.`,
    lore: 'Powerful armour that defends its wearer from even the most vicious of attacks.',
    cost: 50,
    locked: true,
  },
};

const trinkets = {
  archeron: {
    name: 'Archeron War Boots',
    id: 'archeron-trinket',
    src: '/res/item/trinket/archeron-trinket.png',
    desc: `Increase ${icon.damage}${text.damage(4)}, but decrease ${icon.armour}${text.armour(2)}.`,
    lore: 'The boots will make the wearer have no fear of combat.',
    cost: 50,
    locked: true,
  },
  achilles: {
    name: 'Achilles Helm',
    id: 'achilles-trinket',
    src: '/res/item/trinket/achilles-trinket.png',
    desc: `Increase ${icon.armour}${text.armour(6)}, but decrease hit by 3.`,
    lore: 'The helmet of a legendary warrior who fell in battle.',
    cost: 50,
    locked: true,
  },
  asgardian: {
    name: 'Asgardian Steel Gauntlet',
    id: 'asgardian-trinket',
    src: '/res/item/trinket/asgardian-trinket.png',
    desc: `Increase hit by 2, but decrease ${icon.armour}${text.armour(2)}.`,
    lore: 'Celestial magic is still remnant from the valkyrie who once wore it.',
    cost: 50,
    locked: true,
  },
  fates: {
    name: 'Amulet of the Fates',
    id: 'fates-trinket',
    src: '/res/item/trinket/fates-trinket.png',
    desc: `Your spells will have 100% hit, but have twice the mana cost.`,
    lore: 'A divine amulet used to influence the nature of spells.',
    cost: 50,
    locked: true,
  },
  black: {
    name: 'Black Star',
    id: 'black-trinket',
    src: '/res/item/trinket/black-trinket.png',
    desc: `Gain ${icon.runic}${text.runic(1)} per every 20% of missing health.`,
    lore: 'An enigmatic amulet made from a cracked azure crystal, often used in rituals pertaining to dark magics.',
    cost: 50,
    locked: true,
  },
  elven: {
    name: 'Glyph of Elvenkind',
    id: 'elven-trinket',
    src: '/res/item/trinket/elven-trinket.png',
    desc: `Grants a 25% chance to lower enemy ${icon.armour}${text.armour(1)}, down by a maximum of 10.`,
    lore: 'An enchanted glyph worn by the elves to bring good fortune in battle.',
    cost: 50,
    locked: true,
  },
  book: {
    name: 'Book of War',
    id: 'book-trinket',
    src: '/res/item/trinket/book-trinket.png',
    desc: `Grants a 50% chance to be <i>Advantaged</i> when casting spell or attacking.`,
    lore: 'An ancient tome containing the secrets of Kratos.',
    cost: 50,
    locked: true,
  },
  oblivion: {
    name: 'Oblivion Stone',
    id: 'oblivion-trinket',
    src: '/res/item/trinket/oblivion-trinket.png',
    desc: `You will deal double damage, but will also recieve double incoming damage.`,
    lore: 'Rumoured to have been mined from the heart of a dead star, the stone grants the bearer immense power at a mortal cost.',
    cost: 50,
    locked: true,
  },
  void: {
    name: 'Rune of the Void',
    id: 'void-trinket',
    src: '/res/item/trinket/void-trinket.png',
    desc: `Enemies are 10% less likely to use spells.`,
    lore: 'A powerful artifact long ago smuggled out of the Void. Or so many believe.',
    cost: 50,
    locked: true,
  },
  silverhawk: {
    name: 'Silverhawk Feather',
    id: 'silverhawk-trinket',
    src: '/res/item/trinket/silverhawk-trinket.png',
    desc: `Gain a 5% chance of casting a spell twice.`,
    lore: 'Holding the magic of the Silverhawk, this mystical feather brings limitless dexterity to those that bear it.',
    cost: 50,
    locked: true,
  },
  mystra: {
    name: 'Skull of Mystra',
    id: 'mystra-trinket',
    src: '/res/item/trinket/mystra-trinket.png',
    desc: `Increase ${icon.runic}${text.runic(4)} by 4, but decrease ${icon.armour}${text.armour(4)}.`,
    lore: 'An artefact of unknown origin which emanates dark magical power.',
    cost: 50,
    locked: true,
  },
  warbelt: {
    name: 'Warbelt of Radiance',
    id: 'warbelt-trinket',
    src: '/res/item/trinket/warbelt-trinket.png',
    desc: `Passively deal bonus ${icon.damage}${text.damage(2)} on succesful hits.`,
    lore: 'A warbelt that causes damage and a bright burning effect that lays waste to nearby enemies.',
    cost: 50,
    locked: true,
  },
};

const items = {
  rings,
  armour,
  trinkets,
  getItem(name) {
    switch (name) {
      case 'ferocious-ring':
        return rings.ferocious;
      case 'guardian-ring':
        return rings.guardian;
      case 'arcane-ring':
        return rings.arcane;
      case 'seers-ring':
        return rings.seers;
      case 'artemis-ring':
        return rings.artemis;
      case 'circe-armour':
        return armour.circe;
      case 'colossus-armour':
        return armour.colossus;
      case 'valkyrie-armour':
        return armour.valkyrie;
      case 'daedric-armour':
        return armour.daedric;
      case 'leviathan-armour':
        return armour.leviathan;
      case 'archeron-trinket':
        return trinkets.archeron;
      case 'achilles-trinket':
        return trinkets.achilles;
      case 'asgardian-trinket':
        return trinkets.asgardian;
      case 'fates-trinket':
        return trinkets.fates;
      case 'black-trinket':
        return trinkets.black;
      case 'elven-trinket':
        return trinkets.elven;
      case 'book-trinket':
        return trinkets.book;
      case 'oblivion-trinket':
        return trinkets.oblivion;
      case 'void-trinket':
        return trinkets.void;
      case 'silverhawk-trinket':
        return trinkets.silverhawk;
      case 'mystra-trinket':
        return trinkets.mystra;
      case 'warbelt-trinket':
        return trinkets.warbelt;
      default:
        throw new TypeError('Item not found');
    }
  },
};

export default items;
