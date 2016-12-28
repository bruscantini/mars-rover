var myRover = {
  position: [0,0],
  direction: 'N'
};

var grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function goForward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[0] = (rover.position[0] + 1) % 10;
      break;
    case 'E':
      rover.position[1] = (rover.position[1] + 1) % 10;
      break;
    case 'S':
      if (rover.position[0] === 0) rover.position[0] = 9;
      else rover.position[0]--;
      break;
    case 'W':
      if (rover.position[1] === 0) rover.position[1] = 9;
      else rover.position[1]--;
      break;
  }

  printRoverPosition(rover);
}

function goBackward(rover) {
  switch(rover.direction) {
    case 'N':
      if (rover.position[0] === 0) rover.position[0] = 9;
      else rover.position[0]--;
      break;
    case 'E':
      if (rover.position[1] === 0) rover.position[1] = 9;
      else rover.position[1]--;
      break;
    case 'S':
      rover.position[0] = (rover.position[0] + 1) % 10;
      break;
    case 'W':
      rover.position[1] = (rover.position[1] + 1) % 10;
      break;
  }

  printRoverPosition(rover);
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

function printRoverPosition (rover) {
  console.log("Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}

goForward(myRover);
turnRight(myRover);
goForward(myRover);
goBackward(myRover);
goBackward(myRover);
