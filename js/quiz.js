"use strict";

$(document).ready(function() {

// This loads and parses the JSON and calls the methods to build all the constructor functions for the robot types,
//  models, weapons and modificiations.  It's found in the "robotJsonAccess.js" file.
  RobotWars.MainLoadBuildPromise();

  // This watches for click events in the entire input area when the robot players are being built
  $("#main-input-holder").click( function(event) {

    RobotWars.displayPlayerBuildButtons(event.target);

  });

  // This watches for mouseovers in the entire input area when the robot players are being built
  $("#main-input-holder").mouseover(function(event) {

    RobotWars.displayItemStatistics(event.target);

    }).mouseleave( function() {

      $("#output-panel").html("");

    });


});