"use strict";

// This js file holds the majority of the DOM manipulation elements. The adding of buttons to the DOM etc...
var RobotWars = (function(buildDOM) {

// This holds the overall created players for easier access
  var createdPlayers = [];

  buildDOM.buildInitialDOM = function() {

    // Sets the current length of the createdPlayers object which will hold the completed players
    var currentPlayer = createdPlayers.length;
    
    // Builds the inintial DOM containers
    $("#main-input-holder").html(`
        <section id="player-input">
          <article id="player-title-name-choice">
            <p>Welcome Player ${currentPlayer+1}! Enter your name and choose your Robot Type</p>
            <input id="robot-playerName"></input>
          </article>
          <article id="robot-types"></article>
          <article id="robot-models"></article>
          <article id="robot-weapons" class="hidden"></article>
          <article id="robot-modifications" class="hidden"></article>
          <article id="player-submit" class="hidden">
            <p id="main-submit" class="button">Submit Your Robot for Battle!</p>
          </article>
        </section>`
      );

//
//// Adds the type, weapon and modification buttons to the DOM elements.
//

  // For the Robot Types
    // Gets the Robot Types info from the stored JSON object
    var robotTypes = RobotWars.getRobotData().robotTypes;

    // Temporary HTML string holder
    var typeString = "";

    // Loops through the robot types and builds their buttons
    for (var currentType in robotTypes) {
      typeString += `<p id="${robotTypes[currentType].type}" type-element="${currentType}" class="robot-type button">${robotTypes[currentType].type}</p>`;
    }

    // Outputs the robot type buttons to the appropriate section
    $("#robot-types").html(typeString);

  // For the Robot Weapons
    // Gets the Robot Weapon info from the stored JSON object
    var robotWeapons = RobotWars.getRobotData().weapons;

    // Temporary HTML string holder
    var weaponString = "";

    // Loops through the robot weapons and builds their buttons
    for (var currentWeapon in robotWeapons) {
      weaponString += `<p id="${robotWeapons[currentWeapon].weaponId}" type-element="${currentWeapon}" class="robot-weapon button">${robotWeapons[currentWeapon].weaponName}</p>`;
    }

    // Outputs the robot type buttons to the appropriate section
    $("#robot-weapons").html(weaponString);

  // For the Robot Modifications
    // Gets the Robot Modification info from the stored JSON object
    var robotModifications = RobotWars.getRobotData().modifications;

    // Temporary HTML string holder
    var modificationString = "";

    // Loops through the robot weapons and builds their buttons
    for (var currentModification in robotModifications) {
      modificationString += `<p id="${robotModifications[currentModification].modId}" type-element="${currentModification}" class="robot-modification button">${robotModifications[currentModification].modName}</p>`;
    }

    // Outputs the robot type buttons to the appropriate section
    $("#robot-modifications").html(modificationString);

  };

// This builds the model buttons for the selected robot type. It gets called once a robot model is selected.
  buildDOM.buildModelButtons = function(selectedElement) {

    // Pulls the robotModel data from the parsed JSON object for ONLY the currently selected robot type
    var robotModels = RobotWars.getRobotData().robotTypes[selectedElement].model;

    // Temporary HTML string holder
    var modelString = "";

    // Loops through the model data and build the HTML button
    for (var currentModel in robotModels) {
      modelString += `<p id="${robotModels[currentModel].modelId}" model-element="${currentModel}" class="robot-model button">${robotModels[currentModel].modelName}</p>`;
    }

    // Adds the string to the model buttons to the appropriate model section
    $("#robot-models").html(modelString);
  };

// Builds the player from the selected elements on the DOM
  buildDOM.buildCompletePlayer = function() {
    
    // Gets all the "selected" data from the DOM entries
    var newPlayerModel = $(".selected")[0].id;
    var newPlayerType = $(".selected")[1].id;
    var newPlayerWeapon = $(".selected")[2].id;
    var newPlayerModification = $(".selected")[3].id;

    // Builds the new player
    var newPlayer = new RobotWars[newPlayerModel][newPlayerType]();
    newPlayer.setHealth();
    newPlayer.setWeapon(newPlayerWeapon);
    newPlayer.setModification(newPlayerModification);

    // Checks to see if the player namebox is empty
    if ($("#robot-playerName").val() !== "") {
      newPlayer.setPlayerName($("#robot-playerName").val());
    } else {
      newPlayer.setPlayerName("No-Name Bubba");
    }

    // Adds the newly built player to a private variable for easy access 
    RobotWars.addPlayer(newPlayer);

    alert(`Player ${createdPlayers.length}, ${newPlayer.playerName}, created!`);

    // Checks to see if less than two players have been built, if so, lets you build another
    //  If not, then it hides the input panel.
    if (createdPlayers.length < 2) {
      RobotWars.buildInitialDOM();
    } else {
      $("#main-input-holder").addClass("hidden");
    }
  };

// Function to handling the displaying of Robot type, model, weapon and modificiation stats during player creaton
  buildDOM.displayItemStatistics = function(sentEventTarget) {

    // Pulls the parsed JSONdata
    var robotData = RobotWars.getRobotData();

    // Inits the temporary string used in the making of the html content
    var tempString = "";

    // Checks to see if the mouse is over a robot type, if so, displays name, description and min health 
    if ($(event.target).hasClass("robot-type")) {
      tempString = `<h3>Robot Type: ${$(event.target).html()}</h3>
      <p>Description: ${robotData.robotTypes[$(event.target).attr("type-element")].typeDescription}</p>
      <p>Minimum Health: ${robotData.robotTypes[$(event.target).attr("type-element")].minHealth} pts</p>`;
      $("#output-panel").html(tempString);
    }

    // Checks to see if the mouse is over a robot model, if so, displays name, description and max health 
    if ($(event.target).hasClass("robot-model")) {
      
      let selectedTypeName = $(".selected").html();
      let selectedTypeElement = $(".selected").attr("type-element");
      let currentModel = robotData.robotTypes[selectedTypeElement].model[$(event.target).attr("model-element")];

      tempString = `<h3>${selectedTypeName} Robot, sub-model: ${$(event.target).html()}</h3>
      <p>Description: ${currentModel.modelDescription}</p>
      <p>Maximum Health: ${currentModel.maxHealth}</p>`;
      $("#output-panel").html(tempString);
    }

    // Checks to see if the mouse is over a weapon, if so, displays name, description and damage range
    if ($(event.target).hasClass("robot-weapon")) {
      tempString = `<h3>Weapon Type: ${$(event.target).html()}</h3>
      <p>Description: ${robotData.weapons[$(event.target).attr("type-element")].weaponDescription}</p>
      <p>Damage Range: ${robotData.weapons[$(event.target).attr("type-element")].lowDamage} to ${robotData.weapons[$(event.target).attr("type-element")].highDamage} points`;
      $("#output-panel").html(tempString);
    }

    // Checks to see if the mouse is over a modification, if so, displays name, description and modifier stats
    if ($(event.target).hasClass("robot-modification")) {
      let currentMod = robotData.modifications[$(event.target).attr("type-element")];
      tempString = `<h3>Modification Type: ${$(event.target).html()}</h3>
      <p>Description: ${currentMod.modDescription}</p>
      <p>Protection: ${currentMod.modProtection}, Evasion: ${currentMod.modEvasion}, Damage: ${currentMod.modDamage}`;
      $("#output-panel").html(tempString);
    }
  };

// Adds objects (i.e. players) to the createdPlayer object for easy access
  buildDOM.addPlayer = function(newlyCreatedPlayer) {
    createdPlayers.push(newlyCreatedPlayer);
  };

// Returns the created robot players so they are easily accessable
  buildDOM.getPlayers = function() { return createdPlayers; };

  return buildDOM;

})(RobotWars || {});