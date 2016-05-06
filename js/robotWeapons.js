"use strict";

// Augmentor containing all weapon information

var RobotBuilds = (function(robotWeapons) {

  // Object holder for the newly created weapon objects
  var WeaponList = {};

// Generic (aka none) weapon system with base settings
  var Weapon = {
    name: "No Weapon",
    description: "Weapon Slot Empty",
    lowDamage: 0,
    highDamage: 0,
    specialDamageClass: 0
  };

// This for each loop prototypes each specific weapon contained within the base json file to the base Weapon 
//  property above. This allows the dynamic addtion/removal of weapons to the program where only the json file
//  needs to be changed.
  robotWeapons.AllWeapons = {

    // Allows access to the stored weapon objects
    accessWeapons: () => { return WeaponList; },

    // This builds the weapon objects from the JSON data
    buildWeapons: () => {

      // Pulls the weapon data from the parsed JSON data
      var weaponData = RobotBuilds.getRobotData().weapons;

      // Cycles through each weapon in the Json weaponData
      $(weaponData).each(function(index, weapon) {

        // Creates an object based on the current weapon name
        WeaponList[weapon.weaponName] = Object.create(Weapon);

        // This adds the base properties from the Robot Types in the json object to the newly created prototyped Weapon object
        for (var robotWeaponProperties in weapon) {
          WeaponList[weapon.weaponName][robotWeaponProperties] = weapon[robotWeaponProperties];
        }
      });
    }
  };

  return robotWeapons;

})(RobotBuilds || {});