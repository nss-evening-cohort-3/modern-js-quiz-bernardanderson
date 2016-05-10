"use strict";

// This file holds all the Robot weapon constructor functions and prototype methods.
//  All non-NoWeapon Robot constructor functions are built dynamically from the json
//  file. Additional Robot weapons can be added to game (by adding them to the json file)
//  and no modification of the js files would be needed.
var RobotWars = ( (robotWeapons) => {

  // Object holder for the newly created weapon constructor functions
  robotWeapons.WeaponList = {};

// Generic (aka none) weapon system with base settings
//  Fat arrows (=>) mess with the scope of "this" and make this no act as a constructor function 
  robotWeapons.WeaponList.NoWeapon = function() {
    this.weaponId = "Empty Slot";
    this.weaponName = "No Weapon";
    this.weaponDescription = "Weapon Slot Empty";
    this.lowDamage = 0;
    this.highDamage = 0;
    this.specialDamageClass = 0;
  };

// This for each loop prototypes each specific weapon contained within the base json file to the base Weapon property
//  above. This allows the dynamic addtion/removal of weapons to the program where only the json file needs to be changed.
// This builds the weapon objects from the JSON data
//  Fat arrows (=>) mess with the scope of "this" and make this not act as a constructor function 
  robotWeapons.buildWeapons = function() {

    // Pulls the weapon data from the parsed JSON data
    let weaponData = RobotWars.getRobotData().weapons;

    // Cycles through each weapon in the Json weaponData
    $(weaponData).each( (index, weapon) => {

      // Creates a constructor function based on the current weapon name
//  Fat arrows (=>) mess with the scope of "this" and make this not act as a constructor function 
      robotWeapons.WeaponList[weapon.weaponId] = function() {

        // This adds the base properties from the Robot Types in the json object to the newly created prototyped Weapon constructor function 
        for (let robotWeaponProperties in weapon) {
          this[robotWeaponProperties] = weapon[robotWeaponProperties];
        }
      };
    // Prototypes the current weapon to the "NoWeapon" base constructor function 
    robotWeapons.WeaponList[weapon.weaponId].prototype = new robotWeapons.WeaponList.NoWeapon();
    });
  };

  return robotWeapons;

})(RobotWars || {});