var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Brainfuck = /** @class */ (function () {
    function Brainfuck(input) {
        Brainfuck.input = input;
    }
    Brainfuck.interpret = function () {
        this.setInputArray(this.getInput().split(''));
        this.checkLoops(this.getInputArray());
        var _a = this.readLine(this.getPointer()), currentItem = _a.currentItem, index = _a.index;
        for (var i = this.getPointer(); i < this.getInputArray().length; i++) {
            this.parser(currentItem, index);
            if (!(currentItem == '<' ||
                currentItem == '>' ||
                currentItem == '[' ||
                currentItem == ']')) {
                this.setPointer(this.getPointer() + 1);
            }
        }
        return this.getOutput();
    };
    Brainfuck.readLine = function (index) {
        return {
            currentItem: this.getInputArray()[index],
            index: index
        };
    };
    Brainfuck.checkLoops = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == '[') {
                this.openAndClose.push({ '[': i });
            }
            if (arr[i] == ']') {
                var applied = false;
                for (var j = this.openAndClose.length - 1; j >= 0; j--) {
                    if (Object.entries(this.openAndClose[j]).length < 2 &&
                        applied == false) {
                        this.openAndClose[j] = __assign(__assign({}, this.openAndClose[j]), { ']': i });
                        applied = true;
                    }
                }
            }
        }
    };
    Brainfuck.getInput = function () {
        return this.input;
    };
    Brainfuck.getOutput = function () {
        return this.output;
    };
    Brainfuck.setOutput = function (value) {
        this.output = "" + this.getOutput() + String.fromCharCode(value);
    };
    Brainfuck.getInputArray = function () {
        return this.inputArray;
    };
    Brainfuck.setInputArray = function (value) {
        this.inputArray = value;
    };
    Brainfuck.getPointer = function () {
        return this.pointer;
    };
    Brainfuck.setPointer = function (index) {
        this.pointer = index;
    };
    Brainfuck.getMemory = function () {
        return this.memory;
    };
    Brainfuck.setMemory = function (index, value) {
        this.memory[index] = value;
    };
    Brainfuck.parser = function (currentItem, index) {
        console.log("The currentItem: " + currentItem + " index: " + index);
        if (currentItem == '<') {
            this.setPointer(this.getPointer() - 1);
        }
        if (currentItem == '>') {
            this.setPointer(this.getPointer() + 1);
        }
        if (currentItem == '+') {
            this.setMemory(this.getPointer(), this.getMemory()[this.getPointer()] + 1 || 1);
        }
        if (currentItem == '-') {
            this.setMemory(this.getPointer(), this.getMemory()[this.getPointer()] - 1);
        }
        if (currentItem == '.') {
            this.setOutput(this.getMemory()[this.getPointer()]);
        }
        if (currentItem == '[') {
            if (this.getMemory()[this.getPointer()] == 0) {
                for (var i = 0; i < this.openAndClose.length; i++) {
                    if (this.openAndClose[i]['['] == index) {
                        this.setPointer(this.openAndClose[i][']'] + 1);
                    }
                }
            }
            else {
                this.setPointer(this.getPointer() + 1);
            }
        }
        if (currentItem == ']') {
            if (this.getMemory()[this.getPointer()] != 0) {
                for (var i = 0; i < this.openAndClose.length; i++) {
                    if (this.openAndClose[i][']'] == index) {
                        this.setPointer(this.openAndClose[i]['['] + 1);
                    }
                }
            }
            else {
                this.setPointer(this.getPointer() + 1);
            }
        }
    };
    Brainfuck.pointer = 0;
    Brainfuck.memory = [];
    Brainfuck.openAndClose = [];
    return Brainfuck;
}());
var bf = new Brainfuck('++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.');
console.log(Brainfuck.interpret());
