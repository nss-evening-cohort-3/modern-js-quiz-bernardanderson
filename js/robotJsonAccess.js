"use strict";

// This handles the XHR JSon (which holds all the robot type and sub-type stats,
//  modifications and weapon data pull.
var RobotBuilds = (function(originalRobotJsonParse) {

// A private variable which holds all the jsondata
  let parsedRobotJsonData = {};

// This is the main Promise method that loads the json data and builds the DOM
  originalRobotJsonParse.MainLoadBuildPromise = function() {
    originalRobotJsonParse.XHRLoad("robotData").then(function(dataFromJson) {

      // Adds the parsed Json data to the "parsedRobotJsonData" private variable 
      originalRobotJsonParse.setRobotData(dataFromJson.robotData);

      // Builds each weapon prototype as found in the robotData.json file 
      RobotBuilds.buildWeaponPrototypes();

      // Builds each modification prototype as found in the robotData.json file 
      RobotBuilds.buildModificationPrototypes();

      // Builds each robot prototype as found in the robotData.json file 
      RobotBuilds.buildRobotTypePrototypes();

      });
  };

// This takes a json filename as an arguement, parses the data and resolves/rejects the promise.
  originalRobotJsonParse.XHRLoad = function(jsonFileName) {
    return new Promise(function(resolve, reject) {
      $.ajax({
      url: `json/${jsonFileName}.json`,
      }).done( function(data) {
        resolve(data);
      }).fail(function(xhr, status, error) {
        reject(error);
      });
    });
  };

// This allows setting of the private "parsedRobotJsonData" variable
  originalRobotJsonParse.setRobotData = function(sentParsedObject) {
    parsedRobotJsonData = sentParsedObject;
  };

// This allows getting of the private "parsedRobotJsonData" variable
  originalRobotJsonParse.getRobotData = function() {
    return parsedRobotJsonData;
  };

  return originalRobotJsonParse;

})(RobotBuilds || {});