import {
  roll
} from './rollattack';
import {
  endTurn
} from './turn';
import {
  accuracyPotionCondition,
  defensePotionCondition,
  sapphireAmuletCondition,
  runicPotionCondition,
  FEROCIOUS_RING_CONDITION,
  resetRing,
  GUARDIAN_RING_CONDITION,
} from './conditions';
import { log } from './log';
import Stats from './stats';
import { updateStats } from './update';

const ac = '<span class="ra ra-shield colour-ac"></span>';
const damage = '<span class="ra ra-sword colour-damage-tip"></span>';
const runic = '<span class="ra ra-crystals colour-runic-tip"></span>';
const mana = '<span class="ra ra-lightning-bolt colour-mana"></span>';
const hit = '<span class="ra ra-on-target colour-hit"></span>';

export const amulets = [{
    name: 'Ferocious Ring',
    id: 'ferocious-ring',
    src: 'res/item/amulet/ferocious-ring.png',
    desc: `+ 3 ${damage}`,
    lore: 'The ring\'s bright ruby color is unmistakable on the battlefield.',
    cost: 50,
    active: true,
    action: function() {
      resetRing();
      FEROCIOUS_RING_CONDITION.active = true;
      Stats.playerDamage += FEROCIOUS_RING_CONDITION.bonus;
      Stats.playerRing = this.id;
      updateStats();
    }
  },
  {
    name: 'Guardian Ring',
    id: 'guardian-ring',
    src: 'res/item/amulet/guardian-ring.png',
    desc: `+ 2 ${ac}`,
    lore: 'A glimmering ring that defends its bearer.',
    cost: 50,
    active: true,
    action: function() {
      resetRing();
      GUARDIAN_RING_CONDITION.active = true;
      Stats.playerArmour += GUARDIAN_RING_CONDITION.bonus;
      Stats.playerRing = this.id;
      updateStats();
    }
  },
  {
    name: 'Arcane Ring',
    id: 'arcane-ring',
    src: 'res/item/amulet/arcane-ring.png',
    desc: `+ 2 ${runic}`,
    lore: 'Its gem was once used to channel void realm magic, this ring pulses with energy.',
    cost: 50,
    active: false,
    action: function() {
      
    }
  },
  {
    name: 'Seers Ring',
    id: 'seers-ring',
    src: 'res/item/amulet/seers-ring.png',
    desc: `+ 50 ${mana}`,
    lore: 'A ring that grants more mana to its bearer.',
    cost: 50,
    active: false,
    equip: false,
    action: function() {
      
    }
  },
  {
    name: 'Artemisian Ring',
    id: 'artemis-ring',
    src: 'res/item/amulet/artemis-ring.png',
    desc: `+ 2 ${hit}`,
    lore: 'This ring is considered a good luck charm among the elves.',
    cost: 50,
    active: false,
    action: function() {
      
    }
  },
]

export const armour = [{
    name: 'Robe of Circe',
    id: 'circe-armour',
    src: 'res/item/armour/circe-armour.png',
    desc: `Increase to 50 ${mana} regeneration per turn.`,
    lore: 'This elegant garment was once worn by a powerful enchantress.',
    cost: 50,
    active: false,
  },
  {
    name: 'Mantle of the Colossus',
    id: 'colossus-armour',
    src: 'res/item/armour/colossus-armour.png',
    desc: `Increase max health by 50.`,
    lore: 'Reforged armour made from the metal of the fallen Colossus.',
    cost: 50,
    active: false,
  },
  {
    name: 'Valkyrie Armour',
    id: 'valkyrie-armour',
    src: 'res/item/armour/valkyrie-armour.png',
    desc: `Heal for 1d4 per turn.`,
    lore: 'Legendary armour worn by the Valkyries known for its regenerative magic.',
    cost: 50,
    active: false,
  },
  {
    name: 'Daedric Carapace',
    id: 'daedric-armour',
    src: 'res/item/armour/daedric-armour.png',
    desc: `Grants 10% lifesteal on all attacks.`,
    lore: 'This hellish mail favoured by the Daedra for its dark nature.',
    cost: 50,
    active: false,
  },
  {
    name: 'Leviathan Chestplate',
    id: 'leviathan-armour',
    src: 'res/item/armour/leviathan-armour.png',
    desc: `Grants 15% damage reduction from incoming attacks.`,
    lore: 'Powerful armour that defends its wearer from even the most vicious of attacks.',
    cost: 50,
    active: false,
  },
]

export const trinkets = [{
    name: 'Archeron War Boots',
    id: 'archeron-trinket',
    src: 'res/item/trinket/archeron-trinket.png',
    desc: `Increase ${damage} by 4, but decrease ${ac} by 2.`,
    lore: 'The boots will make the wearer have no fear of combat.',
    cost: 50,
    active: false,
  },
  {
    name: 'Achilles Helm',
    id: 'achilles-trinket',
    src: 'res/item/trinket/achilles-trinket.png',
    desc: `Increase ${ac} by 6, but decrease ${hit} by 3.`,
    lore: 'The helmet of a legendary warrior who fell in battle.',
    cost: 50,
    active: false,
  },
  {
    name: 'Asgardian Steel Gauntlet',
    id: 'asgardian-trinket',
    src: 'res/item/trinket/asgardian-trinket.png',
    desc: `Increase ${hit} by 2, but decrease ${ac} by 2.`,
    lore: 'Celestial magic is still remnant from the valkyrie who once wore it.',
    cost: 50,
    active: false,
  },
  {
    name: 'Amulet of the Fates',
    id: 'fates-trinket',
    src: 'res/item/trinket/fates-trinket.png',
    desc: `Your spells will have 100% ${hit}, but have twice the ${mana} cost.`,
    lore: 'A divine amulet used to influence the nature of spells.',
    cost: 50,
    active: false,
  },
  {
    name: 'Black Star',
    id: 'black-trinket',
    src: 'res/item/trinket/black-trinket.png',
    desc: `Gain 1 ${runic} per every 20% of missing health.`,
    lore: 'An enigmatic amulet made from a cracked azure crystal, often used in rituals pertaining to dark magics.',
    cost: 50,
    active: false,
  },
  {
    name: 'Glyph of Elvenkind',
    id: 'elven-trinket',
    src: 'res/item/trinket/elven-trinket.png',
    desc: `Grants a 25% chance to lower enemy ${ac} by 1, down by a maximum of 10.`,
    lore: 'An enchanted glyph worn by the elves to bring good fortune in battle.',
    cost: 50,
    active: false,
  },
  {
    name: 'Book of War',
    id: 'book-trinket',
    src: 'res/item/trinket/book-trinket.png',
    desc: `Grants a 50% chance to be <i>Advantaged</i> when casting spell or attacking.`,
    lore: 'An ancient tome containing the secrets of Kratos.',
    cost: 50,
    active: false,
  },
  {
    name: 'Oblivion Stone',
    id: 'oblivion-trinket',
    src: 'res/item/trinket/oblivion-trinket.png',
    desc: `You will deal double damage, but will also recieve double incoming damage.`,
    lore: 'Rumoured to have been mined from the heart of a dead star, the stone grants the bearer immense power at a mortal cost.',
    cost: 50,
    active: false,
  },
  {
    name: 'Rune of the Void',
    id: 'void-trinket',
    src: 'res/item/trinket/void-trinket.png',
    desc: `Enemies are 10% less likely to use spells.`,
    lore: 'A powerful artifact long ago smuggled out of the Void. Or so many believe.',
    cost: 50,
    active: false,
  },
  {
    name: 'Silverhawk Feather',
    id: 'silverhawk-trinket',
    src: 'res/item/trinket/silverhawk-trinket.png',
    desc: `Gain a 5% chance of casting a spell twice.`,
    lore: 'Holding the magic of the Silverhawk, this mystical feather brings limitless dexterity to those that bear it.',
    cost: 50,
    active: false,
  },
  {
    name: 'Skull of Mystra',
    id: 'mystra-trinket',
    src: 'res/item/trinket/mystra-trinket.png',
    desc: `Increase ${runic} by 4, but decrease ${ac} by 4.`,
    lore: 'An artefact of unknown origin which emanates dark magical power.',
    cost: 50,
    active: false,
  },
  {
    name: 'Warbelt of Radiance',
    id: 'warbelt-trinket',
    src: 'res/item/trinket/warbelt-trinket.png',
    desc: `Passively deal bonus 2 ${damage} on succesful hits.`,
    lore: 'A warbelt that causes damage and a bright burning effect that lays waste to nearby enemies.',
    cost: 50,
    active: false,
  },
]

export const potions = [
  {
    name: 'Elixir of Fortitude',
    id: 'health-potion',
    src: 'res/item/shop/hp-potion.png',
    desc: `Gain 3d3+1 (10) health.`,
    lore: 'A magical elixir that can quickly mend even the deepest of wounds.',
    cost: 10,
    active: true,
    action: function () {
      const result = roll(5) + roll(5) + roll(5) + roll(5);
      if (Stats.playerHealth + result > 100) {
        Stats.playerHealth = 100;
      } else {
        Stats.playerHealth += result;
      }
      Stats.gold -= this.cost;
      log(`You heal for ${result} health.`, 'ps');
      endTurn();
    }
  },
  {
    name: 'Decoction of Agility',
    id: 'hit-potion',
    src: 'res/item/shop/hit-potion.png',
    desc: `Gain 1d2 + 1 ${hit} for 3 turns.`,
    lore: 'This blend is favoured among the elves.',
    cost: 10,
    active: true,
    action: function () {
      const result = roll(2) + 1;
      accuracyPotionCondition.bonus = result;
      accuracyPotionCondition.turns = 3;
      accuracyPotionCondition.active = true;
      Stats.playerHitChanceModifier += result;
      Stats.gold -= this.cost;
      log(`You drink a ${this.name} and boost hit chance by ${result} for 3 turns!`, 'ps');
      endTurn();
    }
  },
  {
    name: 'Draught of Iron',
    id: 'ac-potion',
    src: 'res/item/shop/ac-potion.png',
    desc: `Gain 2d2 ${ac} for 3 turns.`,
    lore: 'A thick draught capable of giving even the weak a dwarven resilience.',
    cost: 10,
    active: true,
    action: function () {
      const result = roll(2) + roll(2);
      defensePotionCondition.bonusArmour = result;
      defensePotionCondition.turns = 3;
      defensePotionCondition.active = true;
      Stats.playerArmour += result;
      Stats.gold -= this.cost;
      log(`You drink a ${this.name} and boost AC by ${result} for 3 turns!`, 'ps');
      endTurn();
    }
  },
  {
    name: 'Essence of Vigor',
    id: 'mana-potion',
    src: 'res/item/shop/mana-potion.png',
    desc: `Gain 50 ${mana}.`,
    lore: 'Rumoured to have been brewed with a rare herb from the Faerun.',
    cost: 10,
    active: true,
    action: function () {
      const extra = 25;
      if (sapphireAmuletCondition.active == true) {
        Stats.playerMaxMana = 125;
      } else {
        Stats.playerMaxMana = 100;
      }
      if (Stats.playerMana + extra > Stats.playerMaxMana) {
        Stats.playerMana = Stats.playerMaxMana;
      }
      else {
        Stats.playerMana += extra;
      }
      Stats.gold -= this.cost;
      log(`You drink a ${this.name} and gain 50 mana!`, 'ps');
      endTurn();
    }
  },
  {
    name: 'Ichor of Sorcery',
    id: 'runic-potion',
    src: 'res/item/shop/runic-potion.png',
    desc: `Gain 1d2 + 1 ${runic} for 3 turns.`,
    lore: 'A magical brew that can enhance ones magical nature.',
    cost: 10,
    active: true,
    action: function () {
      const result = roll(2) + 1;
      runicPotionCondition.bonus = result;
      runicPotionCondition.turns = 3;
      runicPotionCondition.active = true;
      Stats.playerRunic += result;
      Stats.gold -= this.cost;
      log(`You drink a ${this.name} and boost runic by ${result} for 3 turns!`, 'ps');
      endTurn();
    }
  },
]