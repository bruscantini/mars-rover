var myRover = {
  name: "Rover A",
  position: [0,0],
  direction: 'N'
};

var theirRover = {
  name: "Rover B",
  position: [9,9],
  direction: 'S'
};

var grid = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];

function goForward(rover) {
  var newPosX = rover.position[0];
  var newPosY = rover.position[1];
  switch(rover.direction) {
    case 'N':
      newPosX = (rover.position[0] + 1) % 10;
      break;
    case 'E':
      newPosY = (rover.position[1] + 1) % 10;
      break;
    case 'S':
      if (rover.position[0] === 0) newPosX = 9;
      else newPosX--;
      break;
    case 'W':
      if (rover.position[1] === 0) newPosY = 9;
      else newPosY--;
      break;
  }

  if (grid[newPosX][newPosY] === 0){
    grid[rover.position[0]][rover.position[1]] = 0;
    rover.position[0] = newPosX;
    rover.position[1] = newPosY;
    grid[newPosX][newPosY] = 1;
  }
  else {
    console.log("Rover can't move to location [" + newPosX + ", " + newPosY +
      "]. It is occupied.");
    return false;
  }

  printRoverPosition(rover);
  return true;
}

function goBackward(rover) {
  var newPosX = rover.position[0];
  var newPosY = rover.position[1];
  switch(rover.direction) {
    case 'N':
      if (rover.position[0] === 0) newPosX = 9;
      else newPosX--;
      break;
    case 'E':
      if (rover.position[1] === 0) newPosY = 9;
      else newPosY--;
      break;
    case 'S':
      newPosX = (rover.position[0] + 1) % 10;
      break;
    case 'W':
      newPosY = (rover.position[1] + 1) % 10;
      break;
  }

  if (grid[newPosX][newPosY] === 0){
    grid[rover.position[0]][rover.position[1]] = 0;
    rover.position[0] = newPosX;
    rover.position[1] = newPosY;
    grid[newPosX][newPosY] = 1;
  }
  else {
    console.log("Rover can't move to location [" + newPosX + ", " + newPosY +
      "]. It is occupied.");
    return false;
  }

  printRoverPosition(rover);
  return true;
}

function turnLeft(rover){
  switch(rover.direction) {
    case 'N':
      rover.direction = 'W';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'W':
      rover.direction = 'S';
      break;
  }
}

function turnRight(rover){
  switch(rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'N';
  }
}

function runCommands(commands, rover) {

  for (var i = 0; i < commands.length; ++i){
    var moveSuccessful = true;
    switch (commands[i]) {
      case 'f':
        moveSuccessful = goForward(rover);
        break;
      case 'b':
        moveSuccessful = goBackward(rover);
        break;
      case 'r':
        turnRight(rover);
        break;
      case 'l':
        turnLeft(rover);
        break;
      default:
        console.log("Unrecognized command: " + commands[i] + ". Should be one of [f, b, r, l]");
    }
    if (!moveSuccessful){
      break;
    }
  }
}

function printRoverPosition (rover) {
  console.log(rover.name + " Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}

goForward(myRover);
turnRight(myRover);
goForward(myRover);
goBackward(myRover);
goBackward(myRover);
console.log("passing command lists...");
runCommands(['f', 'f', 'f', 'r', 'f', 'f', 'l', 'f', 'f', 'f', 'b', 'h', 'b'], myRover);
runCommands(['r', 'f', 'f', 'f', 'f', 'f', 'f', 'f'], theirRover);
goBackward(theirRover);
goForward(myRover);
goForward(myRover);
