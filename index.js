/**
 * OnlyToday Original Implementation
 */

function OnlyToday(code) {
  this.stack = [];
  this.code = code;
  this.sp = 0;
  this.instructions = this.initInstructionSet();
}

OnlyToday.prototype.initInstructionSet = function() {
  var now = new Date();
  var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  instructions = {
    PUSH: now.getFullYear(),
    COMPARE: now.getMonth() + 1,

    LOOPSTART: '1970[',
    LOOPEND: ']',

    ASCII: now.getHours(),
    JUMP: now.getDate(),

    POP: 'I hate ' + weekdays[now.getDay()],

    TOP: 'In ' + now.getFullYear() - 1 + ' i wasnt at the top..',
    INPUT: 'What is ' + now.getFullYear() + 1 + ' holding for me?',

    SUM: '+',
    DIF: '-',
    MUL: '*',
    DIV: '/',

    OUTPUT: now.getFullYear() + ' is my year!',
  }
}

OnlyToday.prototype.push = function() {
  // Push N on the stack, sp++
}

OnlyToday.prototype.pop = function() {
  // Pop stack[sp], return value to interpreter
}

OnlyToday.prototype.loop = function() {

}

OnlyToday.prototype.top = function() {
  // Move sp to the top of the stack
}

OnlyToday.prototype.compare = function() {
  // compare sp & sp - 1 and push result to the stack
}

OnlyToday.prototype.jump = function() {
  // set sp to the value at sp
}

OnlyToday.prototype.sum = function() {
  // pop sp, sp - 1 and push sum of sp & sp - 1 to the stack
}

OnlyToday.prototype.dif = function() {
  // pop sp, sp - 1 and push dif of sp & sp - 1 to the stack
}

OnlyToday.prototype.mul = function() {
  // pop sp, sp - 1 and push mul of sp & sp - 1 to the stack
}

OnlyToday.prototype.div = function() {
  // pop sp, sp - 1 and push div of sp & sp - 1 to the stack
}

OnlyToday.prototype.input = function() {
  // read input to top of the stack
}

OnlyToday.prototype.input = function() {
  // print the whole stack
}

OnlyToday.prototype.ascii = function() {
  // pop value at sp, convert to ascii, push to stack
}