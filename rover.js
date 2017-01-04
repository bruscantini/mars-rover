function Rover(name, position, direction) {
  this.name = name;
  if (position === undefined) this.position = [0, 0];
  else this.position = position;
  if (direction === undefined) this.direction = 'N';
  else this.direction = direction;
}

var myRover = new Rover("Rover A");

var theirRover = new Rover("Rover B", [9, 9], 'S');

var mars = [
  ['R', 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 'X', 0, 0, 0, 'R']
];

function printMars(){
  console.log("  Mars\n--------\n");
  for (var row = 0; row < mars.length; ++row){
    var lineString = "[ ";
    for (var col = 0; col < mars[0].length; ++col){
      lineString += mars[row][col];
      if (col !== mars[0].length - 1) lineString += ", ";
      else lineString += " ]";
    }
    console.log(lineString);
  }
}

Rover.prototype.goForward = function () {
  var newPosX = this.position[0];
  var newPosY = this.position[1];
  switch(this.direction) {
    case 'N':
      newPosX = (this.position[0] + 1) % 10;
      break;
    case 'E':
      newPosY = (this.position[1] + 1) % 10;
      break;
    case 'S':
      if (this.position[0] === 0) newPosX = 9;
      else newPosX--;
      break;
    case 'W':
      if (this.position[1] === 0) newPosY = 9;
      else newPosY--;
      break;
  }

  if (mars[newPosX][newPosY] === 0){
    mars[this.position[0]][this.position[1]] = 0;
    this.position[0] = newPosX;
    this.position[1] = newPosY;
    mars[newPosX][newPosY] = 'R';
  }
  else {
    console.log("Rover can't move to location [" + newPosX + ", " + newPosY +
      "]. It is occupied.");
    return false;
  }

  this.printPosition();
  return true;
};

Rover.prototype.goBackward = function () {
  var newPosX = this.position[0];
  var newPosY = this.position[1];
  switch(this.direction) {
    case 'N':
      if (this.position[0] === 0) newPosX = 9;
      else newPosX--;
      break;
    case 'E':
      if (this.position[1] === 0) newPosY = 9;
      else newPosY--;
      break;
    case 'S':
      newPosX = (this.position[0] + 1) % 10;
      break;
    case 'W':
      newPosY = (this.position[1] + 1) % 10;
      break;
  }

  if (mars[newPosX][newPosY] === 0){
    mars[this.position[0]][this.position[1]] = 0;
    this.position[0] = newPosX;
    this.position[1] = newPosY;
    mars[newPosX][newPosY] = 'R';
  }
  else {
    console.log("Rover can't move to location [" + newPosX + ", " + newPosY +
      "]. It is occupied.");
    return false;
  }

  this.printPosition();
  return true;
};

Rover.prototype.turnLeft = function () {
  switch(this.direction) {
    case 'N':
      this.direction = 'W';
      break;
    case 'E':
      this.direction = 'N';
      break;
    case 'S':
      this.direction = 'E';
      break;
    case 'W':
      this.direction = 'S';
      break;
  }
};

Rover.prototype.turnRight = function () {
  switch(this.direction) {
    case 'N':
      this.direction = 'E';
      break;
    case 'E':
      this.direction = 'S';
      break;
    case 'S':
      this.direction = 'W';
      break;
    case 'W':
      this.direction = 'N';
  }
};

Rover.prototype.runCommands = function (commands) {

  for (var i = 0; i < commands.length; ++i){
    var moveSuccessful = true;
    switch (commands[i]) {
      case 'f':
        moveSuccessful = this.goForward();
        break;
      case 'b':
        moveSuccessful = this.goBackward();
        break;
      case 'r':
        this.turnRight();
        break;
      case 'l':
        this.turnLeft();
        break;
      default:
        console.log("Unrecognized command: " + commands[i] + ". Should be one of [f, b, r, l]");
    }
    if (!moveSuccessful){
      break;
    }
  }
};

Rover.prototype.printPosition = function () {
  console.log(this.name + " Position: [" + this.position[0] + ", " + this.position[1] + "]");
};

myRover.goForward();
myRover.turnRight();
myRover.goForward();
myRover.goBackward();
myRover.goBackward();
myRover.runCommands(['f', 'f', 'f', 'r', 'f', 'f', 'l', 'f', 'f', 'f', 'b', 'h', 'b']);
printMars();
theirRover.runCommands(['r', 'f', 'f', 'f', 'f', 'f', 'f', 'f']);
printMars();
theirRover.goBackward();
printMars();
myRover.goForward();
printMars();
myRover.goForward();

printMars();
