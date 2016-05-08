"use strict";

$(document).ready(function() {

// This loads and parses the JSON and calls the methods to build all the constructor functions for the robot types,
//  models, weapons and modificiations.  It's found in the "robotJsonAccess.js" file.
  RobotWars.MainLoadBuildPromise();

  // The click event that watches the entire input area for when the robot players are being built
  $("#main-input-holder").click( function(event) {

    // console.log(event.target);

    // Checks to see if the any of the robot-type buttons were clicked, selects it and builds the appropriate model
    //  buttons for that RobotType, reveals the models panel 
    if ($(event.target).hasClass("robot-type")) {
      $(".robot-type").removeClass("selected");
      $(event.target).addClass("selected");
      RobotWars.buildModelButtons($(event.target).attr("type-element"));
      $("#robot-models").removeClass("hidden");
    }

    // Checks to see if the any of the robot-model buttons were clicked, selects it and reveals the weapons panel 
    if ($(event.target).hasClass("robot-model")) {
      $(".robot-model").removeClass("selected");
      $(event.target).addClass("selected");
      $("#robot-weapons").removeClass("hidden");
    }

    // Checks to see if the any of the weapons buttons were clicked, selects it and reveals the modifications panel 
    if ($(event.target).hasClass("robot-weapon")) {
      $(".robot-weapon").removeClass("selected");
      $(event.target).addClass("selected");
      $("#robot-modifications").removeClass("hidden");
    }

    // Checks to see if the any of the modificiation buttons were clicked, selects it and reveals the submit panel 
    if ($(event.target).hasClass("robot-modification")) {
      $(".robot-modification").removeClass("selected");
      $(event.target).addClass("selected");
      $("#player-submit").removeClass("hidden");
    }

    // Checks to see if the submit button was pressed and calls the buildPlayer function
    if ($(event.target).attr("id") === "main-submit") {
      RobotWars.buildCompletePlayer();
    }

  });

  $("#main-input-holder").mouseover(function(event) {

    RobotWars.displayItemStatistics(event.target);

    }).mouseleave( function() {
      $("#output-panel").html("");
    });


});