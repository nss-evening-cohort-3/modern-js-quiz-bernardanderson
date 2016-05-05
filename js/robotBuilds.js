"use strict";

var RobotBuilds = (function(originalRobot) {

///
/// This stuff gets done the moment the iife is loaded. The Robot prototype is what is used to make ANY Robot so it being made on
///  page load is good.
///

// This holds the created players for easier access
  var createdPlayers = {};

// This holds the available robots that can be built
  var availableRobotTypes = {};

// Defines the private Robot prototype that holds all the basic player creation functions
  var Robots = Object.create(null);

// The base function for building a generic robot
  Robots.prototype = {
    name: "BasicBot", // Holds the user entered name
    type: "Cleaning Unit", // Holds the Robot type (of the three types)
    model: "X11", // Holds the Robot model (of the two models per type)
    description: "Standard Non-Combat Robot",
    minHealth: 1, // Holds the minimum health possibility for the robot
    maxHealth: 2, // Holds the maximum health possibility for the robot
    health: 2, // Holds the actual health for the robot
    damage: 0, // Holds the base damage for the robot
    evasion: 1, // Holds the base evasion for the robot
    protection: 1, // Holds the base protection for the robot
    modification: "None", // Holds the modification type
    weapon: "Broom", // Holds the weapon type
  };

// Allows the generation of random health of a Robot Type and Model based on its min and max health
  Robots.prototype.setHealth = function() {
    this.health  = Math.round(Math.random() * (this.maxHealth - this.minHealth) + this.minHealth);
  };

  Robots.prototype.setModification = function(newModification) {
    this.modification = newModification;
  };

  Robots.prototype.setWeapon = function(newWeapon) {
    this.weapon = newWeapon;
  };

///
/// End of Robot prototype building
///

// This for each loop prototypes each specific robot types contained within the base json file to the base Robot 
//  property above. This allows the dynamic addtion/removal of Robot Types to the program where only the json file
//  needs to be changed.
  originalRobot.RobotTypes = {
    
    accessAvailableRobotTypes: function() {
      return availableRobotTypes;
    },

    loadAvailableRobots: function() {

      var typeData = RobotBuilds.getRobotData().robotTypes;

      $(typeData).each( function(index, robotTypes) {

        availableRobotTypes[robotTypes.type] = Object.create(Robots.prototype);

        for(var robotTypeProperties in robotTypes) availableRobotTypes[robotTypes.type][robotTypeProperties]=robotTypes[robotTypeProperties];
        // Object.keys(robotTypes).forEach( (property) => {

          // availableRobotsList[categoryValue.type][categoryValue] = categoryValue[property];

          console.log("robotTypes", robotTypes);
          console.log("availableRobotTypes", availableRobotTypes);
          console.log("availableRobotTypes[categoryValue]", availableRobotTypes[robotTypes]);
          // console.log("availableRobotTypes[categoryValue.type]", availableRobotTypes[robotTypes.type]);
          // })

          // Object.defineProperty(availableRobotsList[categoryValue.type], categoryValue, {
          //   writable: true,
          //   enumerable: true,
          //   configurable: true,
          //   value: categoryValue[property]
          // })

          // console.log("availableRobotsList[categoryValue.type]", availableRobotsList[categoryValue.type]);


          // availableRobotsList[categoryValue.type] = function() {
            // this.name = sentName;
            // this.description = categoryValue.description;
            // this.minHealth = categoryValue.minHealth;
            // this.model = sentModel;

        });

      }

    }
  // }
    //   ,



    // // These constructor prototypes are going to be sent an object that contains the:
    // //  the player name, type and model.


    //   }

    // }//)
  // }
// }
// }

        // for (var modelValue in categoryValue.model) {
        //   console.log(categoryValue.model[modelValue]);
        //   // if (this.model === model[modelValue])
        // };



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
