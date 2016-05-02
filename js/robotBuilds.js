"use strict";

var RobotBuilds = (function(originalRobot) {

// This holds the created players for easy access
  let createdPlayers = {};

// Defines the RobotBuilds property that holds all the player creation functions
  originalRobot.Players = {};

// The base function for building a generic robot
  originalRobot.Players.Robot = function() {
    this.name = null; // Holds the user entered name
    this.type = null; // Holds the Robot type (of the three types)
    this.model = null; // Holds the Robot model (of the two models per type)
    this.minHealth = null; // Holds the minimum health possibility for the robot
    this.maxHealth = null; // Holds the maximum health possibility for the robot
    this.health = null; // Holds the actual health for the robot
    this.armor = null; // Holds the armor value of the robot
    this.evasion = null; // Holds the evasion value of the robot
    this.modification = null; // Holds the modification type
    this.weapon = null; // Holds the weapon type
  };

// Allows the generation of random health of a Robot Type and Model based on its min and max health
  originalRobot.Players.Robot.prototype.setHealth = function() {
    this.health  = Math.round(Math.random() * (this.maxHealth - this.minHealth) + this.minHealth);
  };

// Allows the building of the "Avain" robot type
  originalRobot.Players.Avian = function(playerSelectedObject) {

    this.name = playerSelectedObject.name;
    this.type = "Avian";
    this.minHealth = 45;
    this.model = playerSelectedObject.model;

// Checks to see which model is selected and assigns the maxHealth value
    switch (this.model) {
      case "Rotors": 
        this.maxHealth = 65;
        break;
      case "Buoyant": 
        this.maxHealth = 55;
        break;
    }

//Calls the function and sends the lowest health and the model type
    this.health = this.setHealth(/*this.minHealth, this.maxHealth*/); 
  };

  originalRobot.Players.Avian.prototype = new originalRobot.Players.Robot();

// Allows the building of the "Legged" robot type
  originalRobot.Players.Legged = function(playerSelectedObject) {

    this.name = playerSelectedObject.name;
    this.type = "Legged";
    this.minHealth = 55;
    this.model = playerSelectedObject.model;

// Checks to see which model is selected and assigns the maxHealth value
    switch (this.model) {
      case "Biped": 
        this.maxHealth = 65;
        break;
      case "Quadruped": 
        this.maxHealth = 75;
        break;
    }

//Calls the function and sends the lowest health and the model type
    this.health = this.setHealth(/*this.minHealth, this.maxHealth*/); 
  };
  originalRobot.Players.Legged.prototype = new originalRobot.Players.Robot();

// Allows the building of the "Wheeled" robot type
  originalRobot.Players.Wheeled = function(playerSelectedObject) {

    this.name = playerSelectedObject.name;
    this.type = "Wheeled";
    this.minHealth = 65;
    this.model = playerSelectedObject.model;

// Checks to see which model is selected and assigns the maxHealth value
    switch (this.model) {
      case "Standard Wheeled": 
        this.maxHealth = 75;
        break;
      case "Spherical Wheeled": 
        this.maxHealth = 70;
        break;
    }

//Calls the function and sends the lowest health and the model type
    // this.health = this.setHealth(this.minHealth, this.maxHealth); 
  };
  originalRobot.Players.Wheeled.prototype = new originalRobot.Players.Robot();

// Adds objects (i.e. players) to the createdPlayer object for easy access
  originalRobot.setPlayers = function(newlyCreatedPlayer) {
    createdPlayers[newlyCreatedPlayer.name] = newlyCreatedPlayer;
  };

// Returns the created robot players so they are easily accessable
  originalRobot.getRobotPlayers = function() {
    return createdPlayers;
  };

  return originalRobot;

})(RobotBuilds || {});
