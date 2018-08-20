import { roll } from './rollattack';
import Stats from './stats';

const ac = '<span class="ra ra-shield colour-ac"></span>';
const damage = '<span class="ra ra-sword colour-damage-tip"></span>';
const runic = '<span class="ra ra-crystals colour-runic-tip"></span>';
const mana = '<span class="ra ra-lightning-bolt colour-mana"></span>';
const hit = '<span class="ra ra-on-target colour-hit"></span>';

export const amulets = [
  {
    name: 'Ferocious Ring',
    id: 'ferocious-ring',
    src: 'res/item/amulet/ferocious-ring.png',
    desc: `+ 3 ${damage}`,
    lore: 'The ring\'s bright ruby color is unmistakable on the battlefield.',
    cost: 50,
    active: true,
  },
  {
    name: 'Guardian Ring',
    id: 'guardian-ring',
    src: 'res/item/amulet/guardian-ring.png',
    desc: `+ 2 ${ac}`,
    lore: 'A glimmering ring that defends its bearer.',
    cost: 50,
    active: true,
  },
  {
    name: 'Arcane Ring',
    id: 'arcane-ring',
    src: 'res/item/amulet/arcane-ring.png',
    desc: `+ 2 ${runic}`,
    lore: 'Its gem was once used to channel void realm magic, this ring pulses with energy.',
    cost: 50,
    active: true,
  },
  {
    name: 'Seers Ring',
    id: 'seers-ring',
    src: 'res/item/amulet/seers-ring.png',
    desc: `+ 50 ${mana}`,
    lore: 'A ring that grants more mana to its bearer.',
    cost: 50,
    active: false,
  },
  {
    name: 'Artemisian Ring',
    id: 'artemis-ring',
    src: 'res/item/amulet/artemis-ring.png',
    desc: `+ 2 ${hit}`,
    lore: 'This ring is considered a good luck charm among the elves.',
    cost: 50,
    active: false,
  },
]

export const armour = [
  {
    name: 'Robe of Circe',
    id: 'circe-armour',
    src: 'res/item/armour/circe-armour.png',
    desc: `Increase to 50 ${mana} regeneration per turn.`,
    lore: 'This elegant garment was once worn by a powerful enchantress.',
    cost: 50,
    active: true,
  },
  {
    name: 'Mantle of the Colossus',
    id: 'colossus-armour',
    src: 'res/item/armour/colossus-armour.png',
    desc: `Increase max health by 50.`,
    lore: 'Reforged armour made from the metal of the fallen Colossus.',
    cost: 50,
    active: true,
  },
  {
    name: 'Valkyrie Armour',
    id: 'valkyrie-armour',
    src: 'res/item/armour/valkyrie-armour.png',
    desc: `Heal for 1d4 per turn.`,
    lore: 'Legendary armour worn by the Valkyries known for its regenerative magic.',
    cost: 50,
    active: true,
  },
  {
    name: 'Daedric Carapace',
    id: 'daedric-armour',
    src: 'res/item/armour/daedric-armour.png',
    desc: `Grants 10% lifesteal on all attacks.`,
    lore: 'This hellish mail favoured by the Daedra for its dark nature.',
    cost: 50,
    active: true,
  },
  {
    name: 'Leviathan Chestplate',
    id: 'leviathan-armour',
    src: 'res/item/armour/leviathan-armour.png',
    desc: `Grants 15% damage reduction from incoming attacks.`,
    lore: 'Powerful armour that defends its wearer from even the most vicious of attacks.',
    cost: 50,
    active: true,
  },
]

export const trinkets = [
  {
    name: 'Archeron War Boots',
    id: 'archeron-trinket',
    src: 'res/item/trinket/archeron-trinket.png',
    desc: `Increase ${damage} by 20%, but decrease ${ac} by 10%.`,
    lore: 'Powerful armour that defends its wearer from even the most vicious of attacks.',
    cost: 50,
    active: true,
  },
  {
    name: 'Achilles Helm',
    id: 'achilles-trinket',
    src: 'res/item/trinket/achilles-trinket.png',
    desc: `Increase ${ac} by 50%, but decrease ${hit} by 25%.`,
    lore: 'Powerful armour that defends its wearer from even the most vicious of attacks.',
    cost: 50,
    active: true,
  },
  {
    name: 'Asgardian Steel Gauntlet',
    id: 'asgardian-trinket',
    src: 'res/item/trinket/asgardian-trinket.png',
    desc: `Increase ${hit} by 20%, but decrease ${ac} by 10%.`,
    lore: 'Powerful armour that defends its wearer from even the most vicious of attacks.',
    cost: 50,
    active: true,
  },
  {
    name: 'Amulet of the Fates',
    id: 'fates-trinket',
    src: 'res/item/trinket/fates-trinket.png',
    desc: `Your spells will have 100% ${hit}, but have twice the ${mana} cost.`,
    lore: 'Powerful armour that defends its wearer from even the most vicious of attacks.',
    cost: 50,
    active: true,
  },
  {
    name: 'Oblivion Stone',
    id: 'oblivion-trinket',
    src: 'res/item/trinket/oblivion-trinket.png',
    desc: `You will deal double damage, but will also recieve double incoming damage.`,
    lore: 'Powerful armour that defends its wearer from even the most vicious of attacks.',
    cost: 50,
    active: true,
  },
  {
    name: 'Silverhawk Feather',
    id: 'silverhawk-trinket',
    src: 'res/item/trinket/silverhawk-trinket.png',
    desc: `Gain a 5% chance of casting a spell twice.`,
    lore: 'Powerful armour that defends its wearer from even the most vicious of attacks.',
    cost: 50,
    active: true,
  },
  {
    name: 'Skull of Mystra',
    id: 'mystra-trinket',
    src: 'res/item/trinket/mystra-trinket.png',
    desc: `Increase ${runic} by 20%, but decrease ${ac} by 20%.`,
    lore: 'Powerful armour that defends its wearer from even the most vicious of attacks.',
    cost: 50,
    active: true,
  },
  {
    name: 'Warbelt of Radiance',
    id: 'warbelt-trinket',
    src: 'res/item/trinket/warbelt-trinket.png',
    desc: `Passively deal bonus 2 ${damage} on succesful hits.`,
    lore: 'A divine warbelt that causes damage and a bright burning effect that lays waste to nearby enemies.',
    cost: 50,
    active: true,
  },
]

export const potions = [
  {
    name: 'Elixir of Fortitude',
    id: 'health-potion',
    src: 'res/item/shop/hp-potion.png',
    desc: `Gain 2d5 health.`,
    lore: 'A magical elixir that can quickly mend even the deepest of wounds.',
    cost: 10,
    active: true,
    action: function() {
      const result = roll(5) + roll(5);
      if (Stats.playerHealth + result > 100) {
        Stats.playerHealth = 100;
      }
      else {
        Stats.playerHealth += result;
      }
      console.log(Stats.gold);
      Stats.gold -= this.cost;
      console.log(Stats.gold);
    }
  },
  {
    name: 'Decoction of Agility',
    id: 'hit-potion',
    src: 'res/item/shop/hit-potion.png',
    desc: `Gain 1d2 ${hit} for 3 turns.`,
    lore: 'This blend is favoured among the elves.',
    cost: 20,
    active: true,
    action: function() {

    }
  },
  {
    name: 'Draught of Iron',
    id: 'ac-potion',
    src: 'res/item/shop/ac-potion.png',
    desc: `Gain 1d2 ${ac} for 3 turns.`,
    lore: 'A thick draught capable of giving even the weak a dwarven resilience.',
    cost: 50,
    active: true,
    action: function() {
      
    }
  },
  {
    name: 'Essence of Vigor',
    id: 'mana-potion',
    src: 'res/item/shop/mana-potion.png',
    desc: `Gain bonus 50 ${mana}.`,
    lore: 'Rumoured to have been brewed with a rare herb from the Faerun.',
    cost: 500,
    active: true,
    action: function() {
      
    }
  },
  {
    name: 'Ichor of Sorcery',
    id: 'runic-potion',
    src: 'res/item/shop/runic-potion.png',
    desc: `Gain 1d2 ${runic} for 3 turns.`,
    lore: 'A magical brew that can enhance ones magical nature.',
    cost: 1000,
    active: true,
    action: function() {
      
    }
  },
]