const add = function(operant1, operant2) {
  return operant1 + operant2;
}

const subtract = function(operant1, operant2) {
  return operant1 - operant2;
}

const multiply = function(operant1, operant2) {
  return operant1 * operant2;
}

const divide = function(operant1, operant2) {
  return operant1 / operant2;
}

const OPERATIONS = {
  "+": add,
  "-": subtract,
  "x": multiply,
  "÷": divide
}

function operate(operant1, operator, operant2) {
  if (operator in OPERATIONS) {
    return OPERATIONS[operator](Number(operant1), Number(operant2));
  }
  else {
    return "ERROR: Operator not supported";
  }
}

function isOperator(symbol) {
  return symbol in OPERATIONS;
}

const operation = {
  text: "",
  result: "0",
  prevNum: false,
  prevOp: false,
  prevDot: false,

  addSymbol(symbol) {
    if (isOperator(symbol)) {
      this.addOperator(symbol);
    }
    else {
      this.addNumber(symbol);
    }
  },

  addOperator(operator) {
    if (this.prevOp) { // replace previous operator
      this.text[this.text.length-2] = operator;
    }
    else {
      if (!this.prevNum) {
        this.text = this.result;
      }
      this.text += " " + operator + " ";
    }
    setOperationText(this.text);
    
    this.prevNum = false;
    this.prevOp = true;
  },

  addNumber(number) {
    if (number == ".") {
      if (this.prevDot) {
        return;
      }
      this.prevDot = true;
    }
    if (!this.prevNum && !this.prevOp) {
      if (this.result != "0") {
        this.text = this.result;
      }
    }
    else if (this.prevOp) {
      this.text += "0";
    }
    this.text += number;

    setOperationText(this.text);

    this.prevNum = true;
    this.prevOp = false;
  },

  operate() {
    if (this.prevOp || this.text.length == 0){
      return;
    }

    let operation = this.text.split(" ");
    let i = 0;
    for (; i < this.text - 2; i += 2) {
      operation[i + 2] = operate(operation[i], operation[i + 1], operation[i + 2]);
    } 
    this.result = operation.toString();
    this.text = "";
    setOperationText(this.text);
    setResult(this.result);
  }
}

function setResult(result) {
  let resultLabel = document.querySelector("#result");
  resultLabel.textContent = result;
}

function setOperationText(operation) {
  let operationLabel = document.querySelector("#operationText");
  operationLabel.textContent = operation;
}