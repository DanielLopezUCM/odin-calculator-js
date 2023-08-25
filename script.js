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
    this.updateOperationText(this.text);

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
    else if (this.prevOp && number == ".") {
      this.text += "0";
    }
    this.text += number;

    this.updateOperationText(this.text);

    this.prevNum = true;
    this.prevOp = false;
  },

  operate() {
    if (this.prevOp || this.text.length == 0){
      return;
    }

    let operation = this.text.split(" ");
    let i = 0;
    for (; i < operation.length - 2; i += 2) {
      operation[i + 2] = operate(operation[i], operation[i + 1], operation[i + 2]);
    } 
    this.result = operation[i].toString();
    this.text = "";
    this.updateOperationText(this.text);
    this.updateResult(this.result);
    this.prevDot = false;
    this.prevNum = false;
    this.prevOp = false;
  },
  updateResult() {
    let resultLabel = document.getElementById("result");
    resultLabel.textContent = this.result;
  },
  updateOperationText() {
    let operationLabel = document.getElementById("operationText");
    operationLabel.textContent = this.text;
  },
  reset() {
    this.prevDot = false;
    this.prevNum = false;
    this.prevOp = false;
    this.text = "";
    this.result = "0";
    operation.updateResult();
    operation.updateOperationText();
  },
  deleteLast() {
    if (this.text.length == 0){
      return;
    }
    if (this.text[this.text.length - 1] == " ") {
      this.text = this.text.slice(0, -2);
      this.prevOp = false;
      this.prevNum = true;
      this.prevDot = false;
      let i = this.text.length - 2;
      while (i > 0 && !this.prevDot && this.text[i] != " "){
        this.prevDot = this.text[i] == ".";
        i--;
      }
    }
    if (this.text[this.text.length - 1] == ".") {
      this.prevDot = false;
    }
    this.text = this.text.slice(0, -1);
    if (this.text.length != 0 && this.text[this.text.length - 1] == " ") {
      this.prevDot = false;
      this.prevNum = false;
      this.prevOp = true;
    }
    operation.updateOperationText();
  }
}

operation.updateResult();
operation.updateOperationText();