"use strict";

// Augmentor containing all weapon information

var RobotBuilds = (function(robotWeapons) {

// Generic (aka none) weapon systems with base settings
  robotWeapons.Weapons = function() {
    this.name = "No Weapon";
    this.description = "Weapon Slot Empty";
    this.lowDamage = 0;
    this.HighDamage = 0;
    this.specialDamageClass = 0;
  };

// This for each loop prototypes each specific weapon contained within the base json file to the base Weapon 
//  property above. This allows the dynamic addtion/removal of weapons to the program where only the json file
//  needs to be changed.
  robotWeapons.buildWeaponPrototypes = function() {

    let weaponData = RobotBuilds.getRobotData().weapons;

    $(weaponData).each( function(index, categoryValue) {

      robotWeapons.Weapons[categoryValue.weaponName] = function() {
        this.name = categoryValue.name;
        this.description = categoryValue.description;
        this.lowDamage = categoryValue.lowDamage;
        this.highDamage = categoryValue.highDamage;

        if (categoryValue.specialDamageClass !== undefined) {
          this.specialDamageClass = categoryValue.specialDamageClass;
        }

      robotWeapons.Weapons[categoryValue.weaponName].prototype = new robotWeapons.Weapons();

      };
    });

  };

  return robotWeapons;

})(RobotBuilds || {});