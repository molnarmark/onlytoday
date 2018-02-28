/**
 * OnlyToday Original Implementation
 */

const fs = require('fs');

class OnlyToday {
  constructor(code) {
  this.stack = [];
  this.code = code;
  this.sp = 0;
  this.ip = 0;
  this.logger = false;
  this.instructions = this.initInstructionSet();
  }

  log(message) {
    if (this.logger)
      console.log('[OnlyToday Logger] ' + message);
  }

  initInstructionSet() {
    const now = new Date();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

  push(value) {
    this.log('PUSH');
    if (this.stack[this.sp] === undefined) {
      this.stack[this.sp] = (value == null) ? 1 : value;
    } else {
      this.stack[this.sp] += (value == null) ? 1 : value;
    }
  }

  pop() {
    this.log('POP');
    this.sp = this.stack.length - 1;
    return this.stack.pop();
  }

  loop() {
    // TODO Add support for this
  }

  compare() {
    this.push((this.stack[this.ip] == this.pop()) ? 0 : -1);
  }

  jump() {
    this.ip = this.pop() - 1;
  }

  sum() {
    this.log('SUM');
    const left = this.pop();
    const right = this.pop();
    this.push(left + right);
  }

  dif() {
    this.log('DIF');
    const left = this.pop();
    const right = this.pop();
    this.push(right - left);
  }

  mul() {
    this.log('MUL');
    const left = this.pop();
    const right = this.pop();
    this.push(left * right);
  }

  div() {
    this.log('DIV');
    const left = this.pop();
    const right = this.pop();
    this.push(left / right);
  }

  input() {
    // TODO read input to top of the stack
  }

  output() {
    console.log(this.stack.join(''));
  }

  ascii() {
    const value = this.pop();
    this.push(String.fromCharCode(value.toString()));
  }

  execute() {
    const lines = this.code.split('\n');

    for (let i = 0; i < lines.length; i++) {
      let lineInstructions = lines[i].split(' ');

      if (lineInstructions[0] == 'today') continue;

      let startsWithInstruction = false;

      for (let j = 0; j < lineInstructions.length; j++) {
        const instruction = lineInstructions[j].trim();

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
}

const code = fs.readFileSync(process.argv[2]).toString();
new OnlyToday(code).execute();