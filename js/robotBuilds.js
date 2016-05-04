"use strict";

var RobotBuilds = (function(originalRobot) {

// This holds the created players for easy access
  let createdPlayers = {};

// Defines the RobotBuilds property that holds all the player creation functions
  originalRobot.Players = {};

// The base function for building a generic robot
  originalRobot.Players.Robot = function() {
    this.name = null; // Holds the user entered name
    this.type = null; // Holds the Robot type (of the three types)
    this.model = null; // Holds the Robot model (of the two models per type)
    this.description = "Standard Non-Combat Robot";
    this.minHealth = null; // Holds the minimum health possibility for the robot
    this.maxHealth = null; // Holds the maximum health possibility for the robot
    this.health = null; // Holds the actual health for the robot
    this.damage = null; // Holds the base damage for the robot
    this.evasion = null; // Holds the base evasion for the robot
    this.protection = null; // Holds the base protection for the robot
    this.modification = null; // Holds the modification type
    this.weapon = null; // Holds the weapon type
  };

// Allows the generation of random health of a Robot Type and Model based on its min and max health
  originalRobot.Players.Robot.prototype.setHealth = function() {
    this.health  = Math.round(Math.random() * (this.maxHealth - this.minHealth) + this.minHealth);
  };

  originalRobot.Players.Robot.prototype.setModification = function(newModification) {
    this.modification = newModification;
  };

  originalRobot.Players.Robot.prototype.setWeapon = function(newWeapon) {
    this.weapon = newWeapon;
  };

// This for each loop prototypes each specific robot types contained within the base json file to the base Robot 
//  property above. This allows the dynamic addtion/removal of Robot Types to the program where only the json file
//  needs to be changed.
  originalRobot.buildRobotTypePrototypes = function () {

    let typeData = RobotBuilds.getRobotData().robotTypes;

    $(typeData).each( function(index, categoryValue) {

// These constructor prototypes are going to be sent an object that contains the:
//  the player name, type and model.
      originalRobot.Players[categoryValue.type] = function(sentName, sentModel) {
        this.name = sentName;
        this.description = categoryValue.description;
        this.minHealth = categoryValue.minHealth;
        this.model = sentModel;

        // for (var modelValue in categoryValue.model) {
        //   console.log(categoryValue.model[modelValue]);
        //   // if (this.model === model[modelValue])
        // };

      originalRobot.Players[categoryValue.type].prototype = new originalRobot.Players.Robot();

      };
    });
  };

// // Allows the building of the "Avain" robot type. It needs to be sent the name of the
// //  of the type, and the model id. 
//   originalRobot.Players.Avian = function(playerSelectedObject) {

//     this.name = playerSelectedObject.name;
//     this.type = "Avian";
//     this.minHealth = 45;
//     this.model = playerSelectedObject.model;


// // Checks to see which model is selected and assigns the maxHealth value
//     switch (this.model) {
//       case "Rotors": 
//         this.maxHealth = 65;
//         break;
//       case "Buoyant": 
//         this.maxHealth = 55;
//         break;
//     }
//   };

//   originalRobot.Players.Avian.prototype = new originalRobot.Players.Robot();

// Adds objects (i.e. players) to the createdPlayer object for easy access
  originalRobot.setPlayers = function(newlyCreatedPlayer) {
    createdPlayers[newlyCreatedPlayer.name] = newlyCreatedPlayer;
  };

// Returns the created robot players so they are easily accessable
  originalRobot.getPlayers = function() {
    return createdPlayers;
  };

  return originalRobot;

})(RobotBuilds || {});
