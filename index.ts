class Brainfuck {
  static input: string;
  static output: string;
  static inputArray: string[];
  static pointer: number = 0;
  static memory: number[] = [];
  static openAndClose: {}[] = [];

  constructor(input: string) {
    Brainfuck.input = input;
  }

  static interpret(): string {
    this.setInputArray(this.getInput().split(''));
    this.checkLoops(this.getInputArray());
    let { currentItem, index } = this.readLine(this.getPointer());
    for (let i = this.getPointer(); i < this.getInputArray().length; i++) {
      this.parser(currentItem, index);
      if (
        !(
          currentItem == '<' ||
          currentItem == '>' ||
          currentItem == '[' ||
          currentItem == ']'
        )
      ) {
        this.setPointer(this.getPointer() + 1);
      }
    }
    return this.getOutput();
  }

  static readLine(index: number) {
    return {
      currentItem: this.getInputArray()[index],
      index,
    };
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

  static getOutput(): string {
    return this.output;
  }

  static setOutput(value: number): void {
    this.output = `${this.getOutput()}${String.fromCharCode(value)}`;
  }

  static getInputArray(): string[] {
    return this.inputArray;
  }

  static setInputArray(value: string[]): void {
    this.inputArray = value;
  }

  static getPointer(): number {
    return this.pointer;
  }

  static setPointer(index: number): void {
    this.pointer = index;
  }

  static getMemory(): number[] {
    return this.memory;
  }

  static setMemory(index: number, value: number): void {
    this.memory[index] = value;
  }

  static parser(currentItem: string, index: number): void {
    console.log(`The currentItem: ${currentItem} index: ${index}`);
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

    if (currentItem == '[') {
      if (this.getMemory()[this.getPointer()] == 0) {
        for (let i = 0; i < this.openAndClose.length; i++) {
          if (this.openAndClose[i]['['] == index) {
            this.setPointer(this.openAndClose[i][']'] + 1);
          }
        }
      } else {
        this.setPointer(this.getPointer() + 1);
      }
    }

    if (currentItem == ']') {
      if (this.getMemory()[this.getPointer()] != 0) {
        for (let i = 0; i < this.openAndClose.length; i++) {
          if (this.openAndClose[i][']'] == index) {
            this.setPointer(this.openAndClose[i]['['] + 1);
          }
        }
      } else {
        this.setPointer(this.getPointer() + 1);
      }
    }
  }
}

let bf = new Brainfuck(
  '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.'
);
console.log(Brainfuck.interpret());
