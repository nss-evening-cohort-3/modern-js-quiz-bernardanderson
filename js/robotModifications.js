"use strict";

// Augmentor containing all modification information

var RobotWars = (function(robotModifications) {

  // Object holder for the newly created modification objects
  var ModificationsList = {};

  // Generic (aka none) modification with base settings
  var Modification = {
    modId: "EmptyMod",
    modName: "None",
    modDescription: "Modification Slot Empty",
    modProtection: 0,
    modDamage: 0,
    modEvasion: 0,
  };

// This for-each loop prototypes each specific modification contained within the base json file to the base Modification 
//  property above. This allows the dynamic addtion/removal of modifications to the program where only the json file
//  needs to be changed.
  robotModifications.AllModifications = {

    // Allows access to the stored modification objects
    accessModifications: () => { return ModificationsList; },

    // This builds the modification objects from the JSON data
    buildModifications: () => {

      // Pulls the modification data from the parsed JSON data
      let modificationData = RobotWars.getRobotData().modifications;

      // Cycles through each modificiation in the Json weaponData
      $(modificationData).each( function(index, modification) {

        // Creates an object based on the current modification name
        ModificationsList[modification.modId] = Object.create(Modification);

        // This adds the base properties from the Robot Types in the json object to the newly created prototyped Weapon object
        for (var robotModificationProperties in modification) {
          ModificationsList[modification.modId][robotModificationProperties] = modification[robotModificationProperties];
        }
      });
    }
  };

  return robotModifications;

})(RobotWars || {});