"use strict";

$(document).ready(function() {

  let robotPlayer = {};

  robotPlayer = new RobotBuilds.Players.Avian({name: "Dude", model: "Rotors"});
  robotPlayer.setHealth();
  RobotBuilds.setPlayers(robotPlayer);

  console.log(robotPlayer);

  robotPlayer = new RobotBuilds.Players.Wheeled({name: "Dude2", model: "Standard Wheeled"});
  robotPlayer.setHealth();
  RobotBuilds.setPlayers(robotPlayer);

  console.log(robotPlayer);

});