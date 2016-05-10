"use strict";

// This js file holds the majority of the DOM manipulation elements. The adding of buttons to the DOM etc...
var RobotWars = ( (buildDOM) => {

// This holds the overall created players for easier access
  let createdPlayers = [];

  buildDOM.buildInitialDOM = () => {

    // Sets the current length of the createdPlayers object which will hold the completed players
    let currentPlayer = createdPlayers.length;
    
    // Builds the inintial DOM containers
    $("#main-input-holder").html(`
        <section id="player-input">
          <article id="player-title-name-choice">
            <h2>Welcome Player ${currentPlayer+1} / Enter your name and choose your Robot Type</h2>
            <p class="button-title in-line">Enter your name: </p><input id="robot-playerName"></input>
          </article>
          <article id="robot-types"></article>
          <article id="robot-models" class="button-holder"></article>
          <article id="robot-weapons" class="button-holder hidden"></article>
          <article id="robot-modifications" class="button-holder hidden"></article>
          <article id="player-submit" class="button-holder hidden">
            <p id="main-submit" class="button submit-button">Submit Your Robot for Battle!</p>
          </article>
        </section>`
      );

//
//// Adds the type, weapon and modification buttons to the DOM elements.
//

// For the Robot Types
    // Gets the Robot Types info from the stored JSON object
    let robotTypes = RobotWars.getRobotData().robotTypes;

    // Temporary HTML string holder
    let typeString = "<p class='button-title in-line'>Select your Robot Type</p>";

    // Loops through the robot types and builds their buttons
    for (let currentType in robotTypes) {
      typeString += `<p id="${robotTypes[currentType].type}" type-element="${currentType}" class="robot-type button">${robotTypes[currentType].type}</p>`;
    }

    // Outputs the robot type buttons to the appropriate section
    $("#robot-types").html(typeString);

// For the Robot Weapons
    // Gets the Robot Weapon info from the stored JSON object
    let robotWeapons = RobotWars.getRobotData().weapons;

    // Temporary HTML string holder
    let weaponString = "<p class='button-title'>Select your Robot's Weapon</p>";

    // Loops through the robot weapons and builds their buttons
    for (let currentWeapon in robotWeapons) {
      weaponString += `<p id="${robotWeapons[currentWeapon].weaponId}" type-element="${currentWeapon}" class="robot-weapon button">${robotWeapons[currentWeapon].weaponName}</p>`;
    }

    // Outputs the robot type buttons to the appropriate section
    $("#robot-weapons").html(weaponString);

// For the Robot Modifications
    // Gets the Robot Modification info from the stored JSON object
    let robotModifications = RobotWars.getRobotData().modifications;

    // Temporary HTML string holder
    let modificationString = "<p class='button-title'>Select your Robot's Modification</p>";

    // Loops through the robot weapons and builds their buttons
    for (let currentModification in robotModifications) {
      modificationString += `<p id="${robotModifications[currentModification].modId}" type-element="${currentModification}" class="robot-modification button">${robotModifications[currentModification].modName}</p>`;
    }

    // Outputs the robot type buttons to the appropriate section
    $("#robot-modifications").html(modificationString);

  };

// This builds the model buttons for the selected robot type. It gets called once a robot model is selected.
  buildDOM.buildModelButtons = (selectedElement) => {

    // Pulls the robotModel data from the parsed JSON object for ONLY the currently selected robot type
    let robotModels = RobotWars.getRobotData().robotTypes[selectedElement].model;

    // Temporary HTML string holder
    let modelString = "<p class='button-title in-line'>Select your Robot Model</p>";

    // Loops through the model data and build the HTML button
    for (let currentModel in robotModels) {
      modelString += `<p id="${robotModels[currentModel].modelId}" model-element="${currentModel}" class="robot-model button">${robotModels[currentModel].modelName}</p>`;
    }

    // Adds the string to the model buttons to the appropriate model section
    $("#robot-models").html(modelString);
  };

// Builds the player from the selected elements on the DOM
  buildDOM.buildCompletePlayer = () => {

// When selecting the components, if a type is changed after the model is selected it resets the model.  This
//  checks to make sure the user actually has all four robot properties selected when they try to generate a player 
    if ($(".selected").length < 4) {
      $("#output-panel").html("Please select a Robot Type, Model, Weapon and Modification");
      return null;
    }

    // Gets all the "selected" data from the DOM entries
    let newPlayerModel = $(".selected")[0].id;
    let newPlayerType = $(".selected")[1].id;
    let newPlayerWeapon = $(".selected")[2].id;
    let newPlayerModification = $(".selected")[3].id;

    // Builds the new player
    let newPlayer = new RobotWars[newPlayerModel][newPlayerType]();
    newPlayer.setHealth();
    newPlayer.setWeapon(newPlayerWeapon);
    newPlayer.setModification(newPlayerModification);

    // Checks to see if the player namebox is empty
    if ($("#robot-playerName").val() !== "") {
      newPlayer.setPlayerName($("#robot-playerName").val());
    } else {
      let currentPlayer = createdPlayers.length;
      newPlayer.setPlayerName(`"No-Name Player ${currentPlayer+1}"`);
    }

    // Adds the newly built player to a private variable for easy access 
    RobotWars.addPlayer(newPlayer);

    //Lets the 
    $("#output-panel").html(`<p class="player-creation">Player ${createdPlayers.length}, ${newPlayer.playerName}, created!</h3>`);
    // Checks to see if less than two players have been built, if so, lets you build another
    //  If not, then it hides the input panel.
    if (createdPlayers.length < 2) {
      RobotWars.buildInitialDOM();
    } else {
      $("#main-input-holder").unbind();
      $("#main-input-holder").addClass("hidden");
      $("#battle-page").removeClass("hidden");
      RobotWars.buildBattleField();
    }
  };

  buildDOM.displayPlayerBuildButtons = (sentEventTarget) => {

    // Checks to see if the any of the robot-type buttons were clicked, selects it and builds the appropriate model
    //  buttons for that RobotType, reveals the models panel 
    if ($(sentEventTarget).hasClass("robot-type")) {
      $(".robot-type").removeClass("selected");
      $(sentEventTarget).addClass("selected");
      RobotWars.buildModelButtons($(sentEventTarget).attr("type-element"));
      $("#robot-models").removeClass("hidden");
    }

    // Checks to see if the any of the robot-model buttons were clicked, selects it and reveals the weapons panel 
    if ($(sentEventTarget).hasClass("robot-model")) {
      $(".robot-model").removeClass("selected");
      $(sentEventTarget).addClass("selected");
      $("#robot-weapons").removeClass("hidden");
    }

    // Checks to see if the any of the weapons buttons were clicked, selects it and reveals the modifications panel 
    if ($(sentEventTarget).hasClass("robot-weapon")) {
      $(".robot-weapon").removeClass("selected");
      $(sentEventTarget).addClass("selected");
      $("#robot-modifications").removeClass("hidden");
    }

    // Checks to see if the any of the modificiation buttons were clicked, selects it and reveals the submit panel 
    if ($(sentEventTarget).hasClass("robot-modification")) {
      $(".robot-modification").removeClass("selected");
      $(sentEventTarget).addClass("selected");
      $("#player-submit").removeClass("hidden").add;
    }

    // Checks to see if the submit button was pressed and calls the buildPlayer function
    if ($(sentEventTarget).attr("id") === "main-submit") {
      RobotWars.buildCompletePlayer();
    }
  };

// Function to handling the displaying of Robot type, model, weapon and modificiation stats during player creaton
  buildDOM.displayItemStatistics = (sentEventTarget) => {

    // Pulls the parsed JSONdata
    let robotData = RobotWars.getRobotData();

    // Inits the temporary string used in the making of the html content
    let tempString = "";

    // Checks to see if the mouse is over a robot type, if so, displays name, description and min health 
    if ($(sentEventTarget).hasClass("robot-type")) {
      tempString = `<h3>Robot Type: ${$(sentEventTarget).html()}</h3>
      <p class="player-creation">Description: ${robotData.robotTypes[$(sentEventTarget).attr("type-element")].typeDescription}</p>
      <p class="player-creation">Minimum Health: ${robotData.robotTypes[$(sentEventTarget).attr("type-element")].minHealth} pts</p>`;
      $("#output-panel").html(tempString);
    }

    // Checks to see if the mouse is over a robot model, if so, displays name, description and max health 
    if ($(sentEventTarget).hasClass("robot-model")) {
      
      let selectedTypeName = $(".selected").html();
      let selectedTypeElement = $(".selected").attr("type-element");
      let currentModel = robotData.robotTypes[selectedTypeElement].model[$(sentEventTarget).attr("model-element")];

      tempString = `<h3>${selectedTypeName} Robot, sub-model: ${$(sentEventTarget).html()}</h3>
      <p class="player-creation">Description: ${currentModel.modelDescription}</p>
      <p class="player-creation">Maximum Health: ${currentModel.maxHealth}</p>`;
      $("#output-panel").html(tempString);
    }

    // Checks to see if the mouse is over a weapon, if so, displays name, description and damage range
    if ($(sentEventTarget).hasClass("robot-weapon")) {
      tempString = `<h3>Weapon Type: ${$(sentEventTarget).html()}</h3>
      <p class="player-creation">Description: ${robotData.weapons[$(sentEventTarget).attr("type-element")].weaponDescription}</p>
      <p class="player-creation">Damage Range: ${robotData.weapons[$(sentEventTarget).attr("type-element")].lowDamage} to ${robotData.weapons[$(sentEventTarget).attr("type-element")].highDamage} points`;
      $("#output-panel").html(tempString);
    }

    // Checks to see if the mouse is over a modification, if so, displays name, description and modifier stats
    if ($(sentEventTarget).hasClass("robot-modification")) {
      let currentMod = robotData.modifications[$(sentEventTarget).attr("type-element")];
      tempString = `<h3>Modification Type: ${$(sentEventTarget).html()}</h3>
      <p class="player-creation">Description: ${currentMod.modDescription}</p>
      <p class="player-creation">Stats Bonus -- Protection: ${currentMod.modProtection}%, Evasion: ${currentMod.modEvasion}%, Damage: ${currentMod.modDamage}%`;
      $("#output-panel").html(tempString);
    }
  };

  // Builds the battle page and starts the fight
  buildDOM.buildBattleField = () => {
    $("#stats-container").html(`

      <div class="stats-left player-container">
        <p class="battle-stats"><span>Player 1:</span> ${createdPlayers[0].playerName}</p>
        <p class="battle-stats"><span>Robot Type/Model:</span> ${createdPlayers[0].type}/${createdPlayers[0].modelName}</p>
        <p id="player0-health" class="battle-stats"><span>Current Health:</span> ${createdPlayers[0].health}</p>
        <p class="battle-stats"><span>Weapon:</span> ${createdPlayers[0].weapon.weaponName}</p>
        <p class="battle-stats"><span>Modification:</span> ${createdPlayers[0].modification.modName}</p>
      </div>
      <div class="stats-right player-container">
        <p class="battle-stats"><span>Player 2:</span> ${createdPlayers[1].playerName}</p>
        <p class="battle-stats"><span>Robot Type/Model:</span> ${createdPlayers[1].type}/${createdPlayers[1].modelName}</p>
        <p id="player1-health" class="battle-stats"><span>Current Health:</span> ${createdPlayers[1].health}</p>
        <p class="battle-stats"><span>Weapon:</span> ${createdPlayers[1].weapon.weaponName}</p>
        <p class="battle-stats"><span>Modification:</span> ${createdPlayers[1].modification.modName}</p>
      </div>`
      );

    RobotWars.BattleCalculations.startTheFight();

  };

// Adds objects (i.e. players) to the createdPlayer object for easy access
  buildDOM.addPlayer = (newlyCreatedPlayer) => {
    createdPlayers.push(newlyCreatedPlayer);
  };

// Returns the created robot players so they are easily accessable
  buildDOM.getPlayers = () => createdPlayers;

  return buildDOM;

})(RobotWars || {});