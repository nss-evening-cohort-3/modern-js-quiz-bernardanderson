"use strict";

var RobotBuilds = (function(originalRobot) {

///
/// This stuff gets done the moment the iife is loaded. The Robot prototype is what is used to make ANY Robot.
///

// This holds the created players for easier access
  var createdPlayers = {};

  originalRobot.Robots = {};

// This holds the available robots types that can be built
  var availableRobotTypes = {};

// Defines the private Robot prototype (which doesn't inherit anything) that holds all the basic player creation functions
  // var Robots = Object.create(null);

// The base object for building a generic robot
  originalRobot.Robots = function() {
    this.damage = 0; // Holds the base damage for the robot (which will be regenerated when the weapon is chosen)
    this.description = "Standard Non-Combat Robot"; // What is the description of the robot
    this.evasion = 0; // Holds the base evasion for the robot (which will be modified when the modification is chosen)
    this.health = 1; // Holds the actual health for the robot (which will be regenerated when the type is chosen)
    this.model = "X11"; // Holds the Robot model (of the two models per type)
    this.modification = "None"; // Holds the modification type (which will be modified when the modification is chosen)
    this.name = "BasicBot"; // Holds the user entered name
    this.protection = 0; // Holds the base protection for the robot (which will be modified when the modification is chosen)
    this.type = null; // Holds the Robot type
    this.weapon = null; // Holds the weapon type (which will be modified when the weapon is chosen)
  };

// Allows the generation of random health of a Robot Type and Model based on its min and max health
  originalRobot.Robots.prototype.setHealth = function() {
    this.health  = Math.round(Math.random() * (this.maxHealth - this.minHealth) + this.minHealth);
  };

  // Allows the setting of the modification of the robot
  originalRobot.Robots.prototype.setModification = function(newModification) {
    this.modification = RobotBuilds.AllModifications.accessModifications()[newModification];
  };

  // Allows the setting of the weapon of the robot
  originalRobot.Robots.prototype.setWeapon = function(newWeapon) {
    this.weapon = RobotBuilds.AllWeapons.accessWeapons()[newWeapon];
  };

  // Allows the setting of the weapon of the robot
  originalRobot.Robots.prototype.setName = function(newName) {
    this.name = newName;
  };

///
/// End of Robot prototype building
///

// This for each loop prototypes each specific robot types contained within the base json file to the base Robot 
//  property above. This allows the dynamic addtion/removal of Robot Types to the program where only the json file
//  needs to be changed.
  originalRobot.RobotTypes = {

// This allows access to the "private" Robot types as listed in the json file 
    accessAvailableRobotTypes: function() {
      return availableRobotTypes;
    },

// This loads the robot type objects from the json file, prototypes them to the Robots object, and sets there properties
//  based on their stats in the json file.
    loadAvailableRobots: function() {

      var typeData = RobotBuilds.getRobotData().robotTypes;

      $(typeData).each( function(index, robotTypes) {

        originalRobot[robotTypes.type] = new originalRobot.Robots();
**** inheriting but not constructing
// This adds the base properties from the Robot Types in the json object to the newly created prototyped Type objects
        for(var robotTypeProperties in robotTypes) {
          if (robotTypeProperties !== "model") {
            originalRobot[robotTypes.type][robotTypeProperties]=robotTypes[robotTypeProperties];
          }
        }
      });
    }
  }

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
