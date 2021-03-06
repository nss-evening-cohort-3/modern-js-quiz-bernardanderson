# Modern JavaScript Developer Quiz
# Robot Battledome

## Setup

1. http-server must be installed via npm in order to properly run this application

See ```https://www.npmjs.com/package/http-server``` for instructions 

## Key Coding Features present in this submission

1. Json file which holds all Robot Type, Model, Weapon and Modification Parameters
1. Ajax request to bring in the JSON data
1. Use of a Promise to ensure JSON data is retrieved and parsed before any functions try to use it
1. <strong>Dynamically</strong> built constructor functions for all non-base level Robot Type, Model, Weapon and Modifications (via the JSON data)
1. <strong>Dynamically</strong> built buttons for the DOM for all Robot Type, Model, Weapon and Modifications (via the JSON data)
1. Usage of prototypes (inheritance) for methods, properties
1. Ultimate flexibility of JS code.  Addtional Robot Types, Models, Weapons and Modifications can be added/removed from the game and none of the JS code will need to be changed. Simply add them to the JSON file and the code will adapt. (CSS may need some tweaking...)
1. Only a single global variable (RobotWar)
1. ES6 syntax

## Instructions
## The General Quiz Requirements are below
### Basic Requirements

1. Use ES6 language features wherever you can. At a minimum, you should be using **let**, **const**, fat arrows, property shorthand, method properties, and string templates.
1. Have a Gulp task running at all times to validate your JavaScript. We will be validating your project and we should see 0 errors.
1. You must have a test suite that validates the core logic of the application.
1. You must use jQuery for interacting with the DOM.

### Logical Requirements

You'll be building robots to battle each other.

1. A base Robot function.
1. Define three robot type functions (e.g. Drone, Bipedal, ATV).
1. Define at least 2 specific robot model functions for each type.
1. Give each robot model a different range of health. For example, one model can have health range of 50-80, and another one will have a range of 60-120. To accomplish this, read about the [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) function in JavaScript.
1. Define at least six different modifications and six different weapons that can be added to a robot.
1. Each modification should provide some combination of the following benefits - increased protection, increased damage, or evasion capability (ability to avoid some attacks).
1. Define the range of damage that each weapon can do. 

### Functional Requirements

1. When your user interface first loads, provide the user with buttons so that one specific robot model can be chosen as Player 1.
1. Once the user selects a robot model for Player 1, show a button for each weapon that can be added to the robot.
1. Once the user selects a weapon for Player 1, show a button for each modification that can be added to the robot.
1. Once Player 1 has a modification, provide the user with buttons so that one specific robot model can be chosen as Player 2.
1. Once the user selects a robot model for Player 2, show a button for each weapon that can be added to the robot.
1. Once the user selects a weapon for Player 2, show a button for each modification that can be added to the robot.
1. Once the modification for Player 2 is chosen, the battle begins.
1. Each round of battle should determine the amount of damage each robot will do with its weapon.
1. That damage should then be adjusted based on the modifications that it has, and what its opponent has.
1. Rounds continue until one of the robots has 0, or less than 0, health.
1. When the battle is over display the outcome to the user. For example...

##### The Viper Drone defeated the Behemoth ATV with its flamethrower.

















