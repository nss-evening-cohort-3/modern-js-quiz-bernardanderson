"use strict";

// Augmentor containing all weapon information

var RobotWars = (function(robotWeapons) {

  // Object holder for the newly created weapon constructor functions
  robotWeapons.WeaponList = {};

// Generic (aka none) weapon system with base settings
  robotWeapons.WeaponList.NoWeapon = function() {
    this.weaponId = "Empty Slot";
    this.weaponName = "No Weapon";
    this.weaponDescription = "Weapon Slot Empty";
    this.lowDamage = 0;
    this.highDamage = 0;
    this.specialDamageClass = 0;
  };

  // Allows the setting of the weapon damage of the robot call using: object.weapon.setWeaponDamage();
  robotWeapons.WeaponList.NoWeapon.prototype.setWeaponDamage = function() {
    this.damage  = Math.round(Math.random() * (this.highDamage - this.lowDamage) + this.lowDamage);
  };

// This for each loop prototypes each specific weapon contained within the base json file to the base Weapon property
//  above. This allows the dynamic addtion/removal of weapons to the program where only the json file needs to be changed.
// This builds the weapon objects from the JSON data
  robotWeapons.buildWeapons = function() {

    // Pulls the weapon data from the parsed JSON data
    var weaponData = RobotWars.getRobotData().weapons;

    // Cycles through each weapon in the Json weaponData
    $(weaponData).each(function(index, weapon) {

      // Creates an object based on the current weapon name
      robotWeapons.WeaponList[weapon.weaponId] = function() {

        // This adds the base properties from the Robot Types in the json object to the newly created prototyped Weapon object
        for (var robotWeaponProperties in weapon) {
          this[robotWeaponProperties] = weapon[robotWeaponProperties];
        }
      }
    // Prototypes the weapon to the "NoWeapon" base object
    robotWeapons.WeaponList[weapon.weaponId].prototype = new robotWeapons.WeaponList.NoWeapon();
    });
  };

  return robotWeapons;

})(RobotWars || {});