## 📅 OnlyToday
OnlyToday is an esoteric programming language that works with dates and times.\
The source code of an OnlyToday program is never the same!\
The syntax of the language depends on the date, more specifically, the **HOUR** you write the code in.

### Examples
You can find some example(s) inside the `examples` folder.

### The Idea
---
OnlyToday is stack based, and works with 13 instructions. They are as follows:

| Instruction | Example               | Operation                                                              |
|:-----------:|-----------------------|------------------------------------------------------------------------|
| PUSH        | 2018                  | Pushes '1' onto the stack                                              |
| POP         | I hate monday         | Pops off the top of the stack                                          |
| ASCII       | 19                    | Converts the top of the stack to a character                           |
| JUMP        | 28                    | Sets the instruction pointer to the address on top of the stack        |
| COMPARE     | 2                     | Compares the top of the stack and the value at the instruction pointer |
| SUM         | +                     | Pops the top two elements of the stack and pushes the result on top    |
| DIF         | -                     | Pops the top two elements of the stack and pushes the result on top    |
| MUL         | *                     | Pops the top two elements of the stack and pushes the result on top    |
| DIV         | /                     | Pops the top two elements of the stack and pushes the result on top    |
| OUTPUT      | 2019 will be my year! | Prints the whole stack to stdout                                       |
| TODAY       | today is a nice day   | You can use today for comments                                         |

*The table values are based on 28 February, 2018*

### Don't murder me
OnlyToday is one of my very first stack based interpreter, so go easy on me. :smile:

### License
OnlyToday is licensed under MIT.

> OnlyToday is being worked on as of February 2018, and it does not support looping as of version *0.0.1*.