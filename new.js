class Brainfuck {
  static input;
  static output = '';
  static inputArray;
  static pointer = 0;
  static memory = {};
  static openAndClose = [];

  constructor(input) {
    Brainfuck.input = input;
  }

  static interpret() {
    this.setInputArray(this.getInput().split(''));
    this.checkLoops(this.getInputArray());
    for (let i = 0; i < this.getInputArray().length; i++) {
      let currentItem = this.getInputArray()[i];
      if (currentItem == '[') {
        if (this.getMemory()[this.getPointer()] == 0) {
          for (let j = 0; j < this.openAndClose.length; j++) {
            if (this.openAndClose[j]['['] == i) {
              i = this.openAndClose[j][']'];
              currentItem = this.getInputArray()[i];
            }
          }
        }
      }

      if (currentItem == ']') {
        if (this.getMemory()[this.getPointer()] != 0) {
          for (let j = 0; j < this.openAndClose.length; j++) {
            if (this.openAndClose[j][']'] == i) {
              i = this.openAndClose[j]['['];
              currentItem = this.getInputArray()[i];
            }
          }
        }
      }

      this.parser(currentItem, i);
    }
  }

  static checkLoops(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == '[') {
        this.openAndClose.push({ '[': i });
      }
      if (arr[i] == ']') {
        let applied = false;
        for (let j = this.openAndClose.length - 1; j >= 0; j--) {
          if (
            Object.entries(this.openAndClose[j]).length < 2 &&
            applied == false
          ) {
            this.openAndClose[j] = { ...this.openAndClose[j], ']': i };
            applied = true;
          }
        }
      }
    }
  }

  static getInput() {
    return this.input;
  }

  static getOutput() {
    return this.output;
  }

  static setOutput(value) {
    this.output = `${this.getOutput()}${String.fromCharCode(value)}`;
  }

  static getInputArray() {
    return this.inputArray;
  }

  static setInputArray(value) {
    this.inputArray = value;
  }

  static getPointer() {
    return this.pointer;
  }

  static setPointer(index) {
    this.pointer = index;
  }

  static getMemory() {
    return this.memory;
  }

  static setMemory(index, value) {
    this.memory[index] = value;
  }

  static parser(currentItem, index) {
    if (currentItem == '<') {
      this.setPointer(this.getPointer() - 1);
    }

    if (currentItem == '>') {
      this.setPointer(this.getPointer() + 1);
    }

    if (currentItem == '+') {
      this.setMemory(
        this.getPointer(),
        this.getMemory()[this.getPointer()] + 1 || 1
      );
    }

    if (currentItem == '-') {
      this.setMemory(
        this.getPointer(),
        this.getMemory()[this.getPointer()] - 1
      );
    }

    if (currentItem == '.') {
      this.setOutput(this.getMemory()[this.getPointer()]);
    }
  }
}

let bf = new Brainfuck(
  '++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>>+++++++++++++++.------------------.++++++++++++++++++.------------------.<<++.>>+++++++.-------.+.-.+++++++++++++++++.---------.<<.>>++++++++++++++++.------------------------.++++++++++.++++.<<.>>-.-------------.+++++++++++++.-----.<<++++++++++++++...'
);
Brainfuck.interpret();
console.log(Brainfuck.getOutput());
