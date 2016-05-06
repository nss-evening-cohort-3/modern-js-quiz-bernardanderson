"use strict";

var RobotBuilds = (function(originalRobot) {

// This holds the created players for easier access
  var createdPlayers = {};

// This holds the available robots types that can be built
  var availableRobotTypes = {};

// The base object for building a generic robot
  originalRobot.BasicRobot = function() {
    this.damage = 0; // Holds the base damage for the robot (which will be regenerated when the weapon is chosen)
    this.description = "Standard Non-Combat Robot"; // What is the description of the robot
    this.modification = "None"; // Holds the modification type (which will be modified when the modification is chosen)
    this.name = "BasicBot"; // Holds the user entered name
    this.protection = 0; // Holds the base protection for the robot (which will be modified when the modification is chosen)
    this.type = "None"; // Holds the Robot type
    this.weapon = "None"; // Holds the weapon type (which will be modified when the weapon is chosen)
  };

// Allows the generation of random health of a Robot Type and Model based on its min and max health
  originalRobot.BasicRobot.prototype.setHealth = function() {
    this.health  = Math.round(Math.random() * (this.maxHealth - this.minHealth) + this.minHealth);
  };

// Allows the setting of the modification of the robot
  originalRobot.BasicRobot.prototype.setModification = function(newModification) {
    this.modification = RobotBuilds.AllModifications.accessModifications()[newModification];
  };
 
// Allows the setting of the weapon of the robot
  originalRobot.BasicRobot.prototype.setWeapon = function(newWeapon) {
    this.weapon = RobotBuilds.AllWeapons.accessWeapons()[newWeapon];
  };

// Allows the setting of the weapon of the robot
  originalRobot.BasicRobot.prototype.setName = function(newName) {
    this.name = newName;
  };

// These functions handle the creatation and accessing of the individual robot types stored in the json file.
  originalRobot.RobotTypes = {

// This allows access to the "private" Robot types as listed in the json file 
    accessAvailableRobotTypes: function() {
      return availableRobotTypes;
    },

// This for-each loop prototypes each specific robot type contained within the base json file. This allows the dynamic 
//  addtion & removal of Robot Types to the program where only the json file needs to be changed.
    loadAvailableRobots: function() {

      // RobotBuilds.getRobotData() gets the Json data stored in it from the original parsing that occurs on page load
      var robotTypeCollection = RobotBuilds.getRobotData().robotTypes;

      // Cycles through each robot type
      $(robotTypeCollection).each( function(index, individualRobotTypes) {

        // Makes the new robot type a constructor function by setting it equal to an anonymous function
        originalRobot[individualRobotTypes.type] = function() {

          // Cycles through each property in the RobotTypes and sets the value equal to the this.property property
          for ( var robotTypeProperties in individualRobotTypes ) {
              this[robotTypeProperties] = individualRobotTypes[robotTypeProperties];
          }
        };

        // Links the BasicRobot Properties to the new robot Types .prototype property  
        originalRobot[individualRobotTypes.type].prototype = new originalRobot.BasicRobot();
      });
    }
  };

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
