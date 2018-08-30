import Stats from './stats';
import { disable, enable } from './disable';
import {
  alzursThunderCondition,
  deathfireGraspCondition,
  runicEchoesCondition,
  sapphireAmuletCondition,
  dwarfTankCondition,
  monsterDead,
  playerDisadvantage,
  defensePotionCondition,
  accuracyPotionCondition,
  runicPotionCondition
} from './conditions';
import { updateStats } from './update';

export const endTurn = (result) => {
  if (result) {
    $('.monster-health').addClass('animated jello');
  }

  if (runicEchoesCondition.active === true || defensePotionCondition.active === true) {
    $('.player-armour').addClass('colour-mana-add');
  }

  if (dwarfTankCondition.active == true) {
    dwarfTankCondition.active = false;
    Stats.monsterArmour = Stats.monsterArmour - dwarfTankCondition.bonusArmour;
  }
  
  $('.player-graphic').addClass('poke-right');

  if (monsterDead.active == true) {
    $('.monster-graphic').addClass('spawn');
    monsterDead.active = false;
  } else {
    $('.monster-graphic').addClass('monster-flail');
  }  

  if (sapphireAmuletCondition.active == true) {
    Stats.playerMaxMana = 125;
  } else {
    Stats.playerMaxMana = 100;
  }
  
  if (Stats.playerMana + 25 >= Stats.playerMaxMana) {
    Stats.playerMana = Stats.playerMaxMana;
  } else {
    Stats.playerMana = Stats.playerMana + 25;
    $('.player-mana').addClass('colour-mana-add');
  }

  updateStats();

  disable();

  // Remove animation classes.

  setTimeout(() => {
    $('.monster-health').removeClass('animated jello');
  }, 500);

  setTimeout(() => {
    $('.player-graphic').removeClass('poke-right');
    $('.monster-graphic').removeClass('monster-flail');
    $('.monster-graphic').removeClass('spawn');
  }, 500);

  setTimeout(() => {
    $('.player-mana').removeClass('colour-mana-add');
    $('.player-armour').removeClass('colour-mana-add');
  }, 1000);

  let currentMonster = Stats.currentMonster;

  setTimeout(() => {
    currentMonster.turn();         
  }, 1500);
}

export const endTurnMonster = function(result) {
  if (result) {
    $('.player-health').addClass('animated jello');
  }

  if(Stats.monsterRage > 0) {
    $('.monster-rage').addClass('colour-rage-add');
  }
  
  if (dwarfTankCondition.active == true) {
    $('.monster-armour').addClass('colour-rage-add');
  }

  if (runicEchoesCondition.active == true) {
    Stats.playerArmour = Stats.playerArmour - runicEchoesCondition.bonusArmour;
    runicEchoesCondition.active = false;
  }

  if (defensePotionCondition.turns > 0) {
    defensePotionCondition.turns = defensePotionCondition.turns - 1;
  }

  if (defensePotionCondition.turns === 0 && defensePotionCondition.active) {
    defensePotionCondition.active = false;
    Stats.playerArmour = Stats.playerArmour - defensePotionCondition.bonusArmour;
  }

  if (accuracyPotionCondition.turns > 0) {
    accuracyPotionCondition.turns = accuracyPotionCondition.turns - 1;
  }

  if (accuracyPotionCondition.turns === 0 && accuracyPotionCondition.active) {
    accuracyPotionCondition.active = false;
    Stats.playerHitChanceModifier -= accuracyPotionCondition.bonus;
  }

  if (runicPotionCondition.turns > 0) {
    runicPotionCondition.turns -= 1;
  }

  if (runicPotionCondition.turns === 0 && runicPotionCondition.active) {
    runicPotionCondition.active = false;
    Stats.playerRunic -= runicPotionCondition.bonus;
  }

  $('.monster-graphic').addClass('poke-left');
  $('.player-graphic').addClass('player-flail');

  updateStats();
  setTimeout(() => {
    $('.player-health').removeClass('animated jello');
    $('.monster-armour').removeClass('colour-rage-add');
    $('.monster-rage').removeClass('colour-rage-add');
  }, 500);
  setTimeout(() => {
    $('.monster-graphic').removeClass('poke-left');
    $('.player-graphic').removeClass('player-flail');
  }, 750);

  setTimeout(() => {
    enable();
  }, 500);    
}

export const playerHealthHelper = (result) => {
  if (Stats.playerHealth - result <= 0) {
    Stats.playerHealth = 0;
    log('You died to ' + currentMonster.name + '!', 'ms');
  } 
  else {
    Stats.playerHealth = Stats.playerHealth - result;
  } 
}
