"use strict";

// This file holds all the Robot type and model constructor functions and prototype methods.
//  All non-basic Robot types and model constructor functions are built dynamically from the json
//  file. Additional Robot types and models can be added to game (by adding them to the json file)
//  and no modification of the js files would be needed.
var RobotWars = ( (originalRobot) => {

// This holds the available robots types that can be built
  let availableRobotTypes = {};

// The base Robot object for building a generic robot
//  Fat arrows (=>) mess with the scope of "this" and make this not act as a constructor function 
  originalRobot.BasicRobot = function() {
    this.typeDescription = "Standard Non-Combat Robot"; // What is the description of the robot
    this.modification = null; // Holds the modification type (which will be modified when the modification is chosen)
    this.playerName = "BasicBot"; // Holds the user entered name
    this.type = "None"; // Holds the Robot type
    this.weapon = null; // Holds the weapon type (which will be modified when the weapon is chosen)
  };

// Allows the generation of random health of a Robot Type and Model based on its min and max health
//  Fat arrows (=>) mess with the scope of "this" and make this not act as a constructor function 
  originalRobot.BasicRobot.prototype.setHealth = function() {
    this.health  = Math.round(Math.random() * (this.maxHealth - this.minHealth) + this.minHealth);
  };

// Allows the setting of the modification of the robot
//  Fat arrows (=>) mess with the scope of "this" and make this no act as a constructor function 
  originalRobot.BasicRobot.prototype.setModification = function(newModification) {
    this.modification = new RobotWars.ModificationsList[newModification]();
  };
 
// Allows the setting of the weapon of the robot
//  Fat arrows (=>) mess with the scope of "this" and make this not act as a constructor function 
  originalRobot.BasicRobot.prototype.setWeapon = function(newWeapon) {
    this.weapon = new RobotWars.WeaponList[newWeapon]();
  };

// Allows the setting of the weapon of the robot
//  Fat arrows (=>) mess with the scope of "this" and make this not act as a constructor function 
  originalRobot.BasicRobot.prototype.setPlayerName = function(newPlayerName) {
    this.playerName = newPlayerName;
  };

// This function builds all the Robot types and sub-model constructor functions from the parsed JSON data.
//  The dynamic addtion & removal of Robot Types allows for the any edits to happen strictly in the JSON file
//  without needing to change any of the constructor functions.
  originalRobot.loadAvailableRobots = () => {

///
//// StartOf - Builds Robot Type Constructor Functions [access using RobotWar.type notation]
///
      // RobotWars.getRobotData() gets the Json data stored in it from the original parsing that occurs on page load
      let robotTypeCollection = RobotWars.getRobotData().robotTypes;

      // Cycles through each robot type
      $(robotTypeCollection).each( (index, individualRobotTypes) => {

        // Makes the new robot type a constructor function by setting it equal to an anonymous function
        //  Fat arrows (=>) mess with the scope of "this" and make this not act as a constructor function 
        originalRobot[individualRobotTypes.type] = function () {

          // Cycles through each property in the RobotTypes and sets the value equal to the this.property property
          for ( let robotTypeProperties in individualRobotTypes ) {
            if (robotTypeProperties !== "modelId") {
              // Sets the all the non-model properties in the robot type.  Since model requires two functions,
              //  those are built in the next step
              this[robotTypeProperties] = individualRobotTypes[robotTypeProperties];
            }
          }
        };

        // Links the BasicRobot Properties to the new robot Types .prototype property  
        originalRobot[individualRobotTypes.type].prototype = new originalRobot.BasicRobot();
///
//// EndOf - Builds Robot Type Constructors
///

///
//// StartOf - Builds Robot Type, Model Specific Constructor Functions
///
        // Loops through the Robot Models contained within the Robot Type Json data
        $(individualRobotTypes.model).each( (index, robotModels) => {

          // Sets the id "name" of the current model to a variable for easy access
          let currentModelID = robotModels.modelId;
          
          // Starts the building of the constructor function as RobotWar.type.modelID notation
          //  Fat arrows (=>) mess with the scope of "this" and make this not act as a constructor function 
          originalRobot[individualRobotTypes.type][currentModelID] = function() {

            // Loops through the Robot Model Properties contained in the current Robot model
            for ( let robotModelsProperties in robotModels ) {
              this[robotModelsProperties] = robotModels[robotModelsProperties];
            }
          };

          // Prototypes the current model to it's Robot Type properties, this allows the specific models to be used as
          //  constructors in the creation of a new robot and have it gain access to it's parent Robot Type and the Basic
          //  Robot properties.
          originalRobot[individualRobotTypes.type][currentModelID].prototype = new originalRobot[individualRobotTypes.type]();
        });
///
//// EndOf - Builds Robot Type, Model Specific Constructor Functions
///
      });
    };

  return originalRobot;

})(RobotWars || {});
