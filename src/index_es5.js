/**
 * OnlyToday Original Implementation
 */

const fs = require('fs');

function OnlyToday(code) {
  this.stack = [];
  this.code = code;
  this.sp = 0;
  this.ip = 0;
  this.logger = false;
  this.instructions = this.initInstructionSet();
}

OnlyToday.prototype.log = function(message) {
  if (this.logger)
    console.log('[OnlyToday Logger] ' + message);
}

OnlyToday.prototype.initInstructionSet = function() {
  var now = new Date();
  var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return {
    PUSH: now.getFullYear().toString(),
    COMPARE: (now.getMonth() + 1).toString(),

    LOOPSTART: '1970[',
    LOOPEND: ']',

    ASCII: now.getHours().toString(),
    JUMP: now.getDate().toString(),

    POP: 'I hate ' + weekdays[now.getDay()],
    INPUT: 'What is ' + now.getFullYear() + 1 + ' holding for me?',

    SUM: '+',
    DIF: '-',
    MUL: '*',
    DIV: '/',

    OUTPUT: (now.getFullYear() + 1).toString() + ' will be my year!',
  }
}

OnlyToday.prototype.push = function(value) {
  this.log('PUSH');
  if (this.stack[this.sp] === undefined) {
    this.stack[this.sp] = (value == null) ? 1 : value;
  } else {
    this.stack[this.sp] += (value == null) ? 1 : value;
  }
}

OnlyToday.prototype.pop = function() {
  this.log('POP');
  this.sp = this.stack.length - 1;
  return this.stack.pop();
}

OnlyToday.prototype.loop = function() {
  // TODO Add support for this
}

OnlyToday.prototype.compare = function() {
  this.push((this.stack[this.ip] == this.pop()) ? 0 : -1);
}

OnlyToday.prototype.jump = function() {
  this.ip = this.pop() - 1;
}

OnlyToday.prototype.sum = function() {
  this.log('SUM');
  var left = this.pop();
  var right = this.pop();
  this.push(left + right);
}

OnlyToday.prototype.dif = function() {
  this.log('DIF');
  var left = this.pop();
  var right = this.pop();
  this.push(right - left);
}

OnlyToday.prototype.mul = function() {
  this.log('MUL');
  var left = this.pop();
  var right = this.pop();
  this.push(left * right);
}

OnlyToday.prototype.div = function() {
  this.log('DIV');
  var left = this.pop();
  var right = this.pop();
  this.push(left / right);
}

OnlyToday.prototype.input = function() {
  // TODO read input to top of the stack
}

OnlyToday.prototype.output = function() {
  console.log(this.stack.join(''));
}

OnlyToday.prototype.ascii = function() {
  var value = this.pop();
  this.push(String.fromCharCode(value.toString()));
}

OnlyToday.prototype.execute = function() {
  var lines = this.code.split('\n');

  for (var i = 0; i < lines.length; i++) {
    var lineInstructions = lines[i].split(' ');

    if (lineInstructions[0] == 'today') continue;

    var startsWithInstruction = false;

    for (var j = 0; j < lineInstructions.length; j++) {
      var instruction = lineInstructions[j].trim();

      switch (instruction) {
        case this.instructions.PUSH:
          startsWithInstruction = true;
          this.push();
          break;

        case this.instructions.SUM:
          startsWithInstruction = true;
          this.sum();
          break;

        case this.instructions.DIF:
          startsWithInstruction = true;
          this.dif();
          break;

        case this.instructions.MUL:
          startsWithInstruction = true;
          this.mul();
          break;

          case this.instructions.DIV:
            startsWithInstruction = true;
            this.div();
            break;

          case this.instructions.ASCII:
            startsWithInstruction = true;
            this.ascii();
            break;

          case this.instructions.JUMP:
            startsWithInstruction = true;
            this.jump();
            break;

          case this.instructions.COMPARE:
            startsWithInstruction = true;
            this.compare();
            break;
      }
    }

    // Only reached if not a single word instruction was matched
    if (!startsWithInstruction) {
      switch (lines[i]) {
        case this.instructions.POP:
          startsWithInstruction = true;
          this.pop();
          break;
        case this.instructions.OUTPUT:
          startsWithInstruction = true;
          this.output();
          break;
      }

      if (!startsWithInstruction) {
        console.log('Syntax error on line ' + (this.sp + 1) + '. Exiting.');
        console.log('Error: Unknown instruction found.');
        process.exit();
      }
    }

    this.sp = this.stack.length;
  }
}

var code = fs.readFileSync(process.argv[2]).toString();
new OnlyToday(code).execute();