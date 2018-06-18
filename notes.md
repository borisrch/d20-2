## Classes:
- Melee: Low Damage, High Armour. 
- Magic: High Damage, Low Armour. 
- Ranged: Medium Damage, Medium Armour. 

### Melee:

Base Stats:
- Damage: 1d6
- Armour: 14
- Weapons:
  - Shortsword (+1 to hit)
  - Battleaxe (+2 to hit)
  - Warhammer (+3 to hit)
  - Scythe (+4 to hit)
- Spells (4):
  - 1 damage, 3 defensive
  - Frenzy: Deals a base of 1d4 damage. Add an additional die roll for every level of Runic.
  - Titanic: Raises your AC by base of 1d2 for the next turn.  Add an additional die roll of every level of Runic.
  - Reflect: Deals 70% of the damage you recieved for the next turn. Add an additional 5% for every level of Runic.
  - Rejuvenate: Heal a base of 2d4 damage. Add an additional die roll for every level of Runic.

### Magic

Base Stats:
- Damage: 1d10
- Armour: 8
- Weapons: 
  - Oak wand 
  - Elder wand 
  - Deku staff
  - Yggdrasil staff
- Spells:
  - 3 damage, 1 defensive

### Ranged

Base Stats:
- Damage: 1d8
- Armour: 10
- Weapons:
  - Shortbow
  - Longbow
  - Crossbow
  - Elven bow
- Spells:
  - 2 damage, 2 defense

Action:
turn++
Cooldown--
healturn++
calcHeal()

turn++ : turn counter
cooldown-- : 
healTurn++ : heal turn counter
calcHeal() : heal potion calculator