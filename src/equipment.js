import Stats from './stats';

export const selectWeapon = function(weapon) {
  switch(weapon) {
    case 'Oak Wand':
    Stats.playerRunic = 2;
    Stats.playerHitChanceModifier = 0;
    break;

    case 'Ebony Wand':
    Stats.playerRunic = 3;
    Stats.playerHitChanceModifier = 2;
    break;

    case 'Elder Wand':
    Stats.playerRunic = 4;
    Stats.playerHitChanceModifier = 3;
    break;

    default:
    throw new Error('Error at selectWeapon');
    break;
  }
}

const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';
const manaIcon = '<span class="ra ra-lightning-bolt colour-mana"></span>';

const oak_wand_desc = '<h2>Equip Wand</h2> <b>Oak Wand</b>: +2 to ' + runicIcon + ' . <br>';
const ebony_wand_desc = '<b>Ebony Wand</b>: +2 to hit chance,  +3 to ' + runicIcon + ' . <br>';
const elder_wand_desc = '<b>Elder Wand</b>: +3 to hit chance,  +4 to ' + runicIcon + ' . <br>';

export const wand_desc = [oak_wand_desc, oak_wand_desc + ebony_wand_desc, oak_wand_desc + ebony_wand_desc + elder_wand_desc];

const sapphire_amulet_desc = '<h2>Equip Amulet</h2> <b>Sapphire Amulet</b>: +25 to ' + manaIcon + '.<br>';
const emerald_amulet_desc = '<b>Emerald Amulet</b>: +2 to ' + armourIcon + '.<br>';
const ruby_amulet_desc = '<b>Ruby Amulet</b>: +15% lifesteal. <br>';

export const amulet_desc = [sapphire_amulet_desc, sapphire_amulet_desc + emerald_amulet_desc, sapphire_amulet_desc + emerald_amulet_desc + ruby_amulet_desc];