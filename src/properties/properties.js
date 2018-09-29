import Stats from '../stats';

const armourIcon = '<span class="ra ra-shield colour-ac"></span>';
const damageIcon = '<span class="ra ra-sword colour-damage-tip"></span>';
const runicIcon = '<span class="ra ra-crystals colour-runic-tip"></span>';
const manaIcon = '<span class="ra ra-lightning-bolt colour-mana-tip"></span>';

export const properties = {
  spells: {
    wizard: {
      q: `<b>Scorch (${manaIcon}75 )</b> - Deal 1-${Stats.playerDamage} ${damageIcon} while ignoring 2 ${armourIcon}. Ignore an additional 1-2 ${armourIcon} per ${runicIcon} level.`,
      w: `<b>Alzur's Thunder (${manaIcon}100 )</b> - Deal 2-8 ${damageIcon} and apply <i>Shocked</i>, which deals bonus 1-4 ${damageIcon} for ${runicIcon} turns.`,
      e: `<b>Anima Surge (${manaIcon}50 )</b> - Deal a total of 1d ${damageIcon} + 1d ${runicIcon} . For every 2 levels of ${runicIcon}, add bonus 1 ${damageIcon}.`,
      r: `<b>Runic Echoes (${manaIcon}25 )</b> - Increase ${armourIcon} by 1-2 per ${runicIcon} level for the next turn.`,
    }
  }
}