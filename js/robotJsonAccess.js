"use strict";

// This handles the XHR JSon (which holds all the robot type and model stats,
//  modifications and weapon data pull.
var RobotWars = ( (originalRobotJsonParse) => {

// A private variable which holds all the parsed json data
  let parsedRobotJsonData = {};

// This is the main Promise method that loads the json data and builds the Robot Types, sub-models, weapons and modifications
  originalRobotJsonParse.MainLoadBuildPromise = () => {
    originalRobotJsonParse.XHRLoad("robotData").then( (dataFromJson) => {

      // Adds the parsed Json data to the "parsedRobotJsonData" private variable 
      originalRobotJsonParse.setRobotData(dataFromJson.robotData);

      // Builds each robot type and sub-model constructor function as found in the robotData.json file 
      RobotWars.loadAvailableRobots();

      // Builds each weapon constructor function as found in the robotData.json file 
      RobotWars.buildWeapons();

      // Builds each modification constructor function as found in the robotData.json file 
      RobotWars.buildModifications();

      // Builds the intial DOM view for player creation
      RobotWars.buildInitialDOM();

      });
  };

// This takes a json filename as an arguement, parses the data and resolves/rejects the promise.
  originalRobotJsonParse.XHRLoad = (jsonFileName) => {
    return new Promise( (resolve, reject) => {
      $.ajax({
      url: `json/${jsonFileName}.json`,
      })
      .done( (data) => resolve(data) )
      .fail( (xhr, status, error) => reject(error) );
    });
  };

// This allows setting of the private "parsedRobotJsonData" variable
  originalRobotJsonParse.setRobotData = (sentParsedObject) => parsedRobotJsonData = sentParsedObject;

// This allows getting of the private "parsedRobotJsonData" variable
  originalRobotJsonParse.getRobotData = () => parsedRobotJsonData;

  return originalRobotJsonParse;

})(RobotWars || {});