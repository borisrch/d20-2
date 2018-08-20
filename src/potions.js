const BUY_HEALTH = () => {
  const result = roll(5) + roll(5);
  if (Stats.playerHealth + result > 100) {
    Stats.playerHealth = 100;
  }
  else {
    Stats.playerHealth += result;
  }

  const cost = 10;
  Stats.gold -= cost;
  
  shopModal.close();
  log(`You drink a Health Potion and heal for ${result}!`,'ps');
  endTurn();
}