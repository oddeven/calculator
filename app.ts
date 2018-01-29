const buttons = Array.from(document.querySelectorAll('.button'));
const displayElem = document.querySelector('.display') as HTMLElement;
let operation = '';
let calc = 0;
let display = '';
let firstOperator = true;

enum ActionType {
  numeric,
  operator,
  decimal,
  evaluate,
  clear,
  none
}

class InputType {
  type: ActionType = ActionType.none;
  value: string = '';
}

let previousInput: InputType;

buttons.forEach(button => button.addEventListener('click', onButtonClick));

const operations = {
  add: function (a: number, b: number) {
    return a + b;
  },
  multiply: function (a: number, b: number) {
    return a * b;
  },
  subtract: function (a: number, b: number) {
    return a - b;
  },
  divide: function (a: number, b: number) {
    return a / b;
  }
};

function precisionRound(number: number, precision = 2): number {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function inputType(input: HTMLElement): InputType {
  const inputObj: InputType = new InputType();
  const type = input.dataset.type || '';
  inputObj.type = ActionType[type];
  inputObj.value = input.dataset[type] || '';
  if (inputObj.type === ActionType.numeric) {
    inputObj.value = input.textContent || '';
  }
  if (inputObj.type === ActionType.operator) {
    inputObj.value = input.dataset.operator || '';
  }
  return inputObj;
}

function onButtonClick() {
  const input = inputType(this);
  switch (input.type) {
    case ActionType.numeric:
      handleNumeric(input);
      break;
    case ActionType.operator:
      handleOperator(input);
      break;
    case ActionType.decimal:
      // optional: add decimal support
      break;
    case ActionType.evaluate:
      handleEvaluate();
      break;
    case ActionType.clear:
      handleClear();
      break;
  }
  console.info(`Pressed ${input.type}  with value: ${input.value}`);
  previousInput = input;
  displayElem.textContent = display ? display : '0';
}

function handleNumeric(input: InputType) {
  if (previousInput.type === ActionType.numeric) {
    display += input.value;
  } else {
    display = input.value;
  }
}

function handleOperator(input: InputType) {
  if (display === '') {
    return;
  }
  operation = input.value;
  const displayValue = precisionRound(parseFloat(display));
  if (!firstOperator) {
    calc = operations[input.value](calc, displayValue);
    display = String(calc);
  } else {
    calc = displayValue;
  }
  firstOperator = false;
}

function handleEvaluate() {
  if (display === '') {
    return;
  }
  if (previousInput.type !== ActionType.evaluate) {
    const displayValue = precisionRound(parseFloat(display));
    calc = operations[operation](calc, displayValue);
    display = String(calc);
  }
}

function handleClear() {
  calc = 0;
  display = '';
  operation = '';
  previousInput = new InputType();
  firstOperator = true;
}
