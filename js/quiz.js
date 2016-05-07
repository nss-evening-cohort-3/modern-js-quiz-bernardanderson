"use strict";


$(document).ready(function() {

// This loads and parses the JSON and calls the methods to build all the constructor functions for the robot types,
//  models, weapons and modificiations.  It's found in the "robotJsonAccess.js" file.
  RobotWars.MainLoadBuildPromise();

  // The click event that watches the entire input area for when robots are being built
  $("#main-input-holder").click( function(event) {

    console.log(event.target);

    if ($(event.target).hasClass("robot-type")) {
      $(".robot-type").removeClass("selected");
      $(event.target).addClass("selected");
      RobotWars.buildModelButtons($(event.target).attr("type-element"));
      $("#robot-models").removeClass("hidden");
    }

    if ($(event.target).hasClass("robot-model")) {
      $(".robot-model").removeClass("selected");
      $(event.target).addClass("selected");
      $("#robot-weapons").removeClass("hidden");
    }

    if ($(event.target).hasClass("robot-weapon")) {
      $(".robot-weapon").removeClass("selected");
      $(event.target).addClass("selected");
      $("#robot-modifications").removeClass("hidden");
    }

    if ($(event.target).hasClass("robot-modification")) {
      $(".robot-modification").removeClass("selected");
      $(event.target).addClass("selected");
      $("#player-submit").removeClass("hidden");
    }

    if ($(event.target).attr("id") === "main-submit") {
      RobotWars.buildCompletePlayer();
    }


  });


});