"use strict";

// Augmentor containing all modification information

var RobotBuilds = (function(robotModifications) {

// Generic (aka none) modification with base settings
  robotModifications.Modification = function() {
    this.name = "None";
    this.description = "Modification Slot Empty";
    this.modProtection = 0;
    this.modDamage = 0;
    this.modEvasion = 0;
  };

// This for each loop prototypes each specific modification contained within the base json file to the base Modification 
//  property above. This allows the dynamic addtion/removal of modifications to the program where only the json file
//  needs to be changed.
  robotModifications.buildModificationPrototypes = function () {

    let modificationData = RobotBuilds.getRobotData().modifications;

    $(modificationData).each( function(index, categoryValue) {

      robotModifications.Modification[categoryValue.modName] = function() {
        this.name = categoryValue.name;
        this.description = categoryValue.description;

        if (categoryValue.modProtection !== undefined) {
          this.modProtection = categoryValue.modProtection;
        }

        if (categoryValue.modDamage !== undefined) {
          this.modDamage = categoryValue.modDamage;
        }

        if (categoryValue.modEvasion !== undefined) {
          this.modEvasion = categoryValue.modEvasion;
        }
      };

    robotModifications.Modification[categoryValue.modName].prototype = new robotModifications.Modification();

    });
  };

  return robotModifications;

})(RobotBuilds || {});