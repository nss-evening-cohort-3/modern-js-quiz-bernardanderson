"use strict";

// Augmentor containing all modification information

var RobotWars = (function(robotModifications) {

  // Object holder for the newly created modification objects
  robotModifications.ModificationsList = {};

  // Generic (aka none) modification with base settings
  robotModifications.ModificationsList.NoModification = function () {
    this.modId = "EmptyMod";
    this.modName = "None";
    this.modDescription = "Modification Slot Empty";
    this.modProtection = 0;
    this.modDamage = 0;
    this.modEvasion = 0;
  };

// This for-each loop prototypes each specific modification contained within the base json file to the base Modification 
//  property above. This allows the dynamic addtion/removal of modifications to the program where only the json file
//  needs to be changed.
// This builds the modification objects from the JSON data
  robotModifications.buildModifications = function() {

      // Pulls the modification data from the parsed JSON data
      let modificationData = RobotWars.getRobotData().modifications;

      // Cycles through each modificiation in the Json weaponData
      $(modificationData).each( function(index, modification) {

        // Creates an object based on the current modification name
        robotModifications.ModificationsList[modification.modId] = function() {

        // This adds the base properties from the Robot Types in the json object to the newly created prototyped Weapon object
        for (var robotModificationProperties in modification) {
          this[robotModificationProperties] = modification[robotModificationProperties];
        }
      };
    // Prototypes the current modification to the "NoModification" base object
    robotModifications.ModificationsList[modification.modId].prototype = new robotModifications.ModificationsList.NoModification();
    });
  };

  return robotModifications;

})(RobotWars || {});