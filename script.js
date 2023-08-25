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
  "*": multiply,
  "/": divide
}

function operate(operant1, operator, operant2) {
  if (operator in OPERATIONS) {
    return OPERATIONS[operator](operant1, operant2);
  }
  else {
    return "ERROR: Operator not supported";
  }
}