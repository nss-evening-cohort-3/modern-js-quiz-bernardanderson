"use strict";

// This conains all the battle calculations that occur during the fight
var RobotWars = ((battleFunctions) => {

  // Inits the BattleCalculations property
  battleFunctions.BattleCalculations = {};

  // Calculates the damage dealt by the attacker (includes damage modification increase/decreases)
  battleFunctions.BattleCalculations.attackDamage = (sentAttacker) => {
    let weaponDamage = Math.round(Math.random() * (sentAttacker.weapon.highDamage - sentAttacker.weapon.lowDamage) + sentAttacker.weapon.lowDamage);
    let weaponDamageModifier = Math.round((weaponDamage * (sentAttacker.modification.modDamage/100)));

    // Assigns the attackers damage based on the calculated weapon damage and the attackers modification
    sentAttacker.weapon.damage = weaponDamage + weaponDamageModifier;

    let outputString = `<p class="battle-report">${sentAttacker.playerName} attacks with ${sentAttacker.weapon.weaponName} for ${sentAttacker.weapon.damage} pts of damage!</p>`;

    return outputString;
  };

  // Calculates the evasion chance of the defender or how much of the damage is absorbed by the defender
  //  Includes the protection modification values
  battleFunctions.BattleCalculations.defenseCalculations = (sentAttacker, sentDefender) => {

    // Randomly gets a percentage to see if the rbot evaded the attack.
    let damageEvasionChance = Math.round(Math.random() * 100);

    // Checks to see if the defending robot evaded the attack and, if not, calculates the how much damage is received
    //  and decreases that amount from the health
    if ( damageEvasionChance <= sentDefender.modification.modEvasion) {
      return `<p class="battle-report">${sentDefender.playerName} evaded the attack!</p>`;
    }

    // Calculates how much damage the defender receives based on its modification protection value
    let actualReceivedDamage = Math.floor(sentAttacker.weapon.damage * (100 - sentDefender.modification.modProtection)/100);

    // Stores how much damage was blocked
    let armorBlockage = sentAttacker.weapon.damage - actualReceivedDamage;
    let outputString = `<p class="battle-report">${sentDefender.playerName}'s armor blocked ${armorBlockage} pts of damage and received ${actualReceivedDamage} pts of damage!</p>`;

    // Decreases the defenders health by the damage amount
    sentDefender.health = sentDefender.health - actualReceivedDamage;
    return outputString;
  };

  // Checks to see if the current defenders health is 0 or below.  If so, then the attacker is declaired the winner
  battleFunctions.BattleCalculations.checkHealth = (sentAttacker, sentDefender) => {

    // If the health of the defender is zero or less then report the winner and stop the fight
    if (sentDefender.health <= 0 ) {
      sentDefender.health = 0;
      let outputString = `<p class="battle-report"><span>${sentDefender.playerName} is broken! ${sentAttacker.playerName} is the winner!</span></p>`;
      return outputString;
    }

    // Tells the timer that the fight is still going
    return true;
  };

  // The steps of a single battle round
  battleFunctions.BattleCalculations.singleRound = (attacker, defender) => {

    // Stores the attacker damage string
    let currentRoundOutput = RobotWars.BattleCalculations.attackDamage(attacker);

    // Stores the defender report string
    currentRoundOutput += RobotWars.BattleCalculations.defenseCalculations(attacker, defender);

    // Stores the health report string
    let healthReport = RobotWars.BattleCalculations.checkHealth(attacker, defender);

    // If a player is destroyed report it, otherwise just report the current stats.
    if (healthReport !== true) {
      currentRoundOutput += healthReport;
      $("#output-panel").html(currentRoundOutput);
      return false;
    } else {
      $("#output-panel").html(currentRoundOutput);
      return true;
    }
  };

// This starts the overall fight
  battleFunctions.BattleCalculations.startTheFight = () => {

    let attacker = 0;
    let defender = 1;

    let hasPlayerDied = false;

// Sets the timed interval for the attacker-defender battle
    let fightActive = setInterval( () => {

      // Runs a single round of the fight and reports whether someone died
      hasPlayerDied = RobotWars.BattleCalculations.singleRound(RobotWars.getPlayers()[attacker], RobotWars.getPlayers()[defender]);

      // Updates the defenders health as the battle is occurring
      $(`#player${defender}-health`).html(`<span>Current Health:</span> ${RobotWars.getPlayers()[defender].health}`);

// If a player is dead then stop of the interval, otherwise, swap who is the attacker for the next round.
      if (hasPlayerDied === false) {
        clearInterval(fightActive);
      } else if (attacker === 0) {
        attacker = 1;
        defender = 0;
      } else {
        attacker = 0;
        defender = 1;
      }

    }, 2500);
  };

  return battleFunctions;

})(RobotWars || {});