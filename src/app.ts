import { ActionType, InputType, inputType } from './input-helpers';
import { operations, precisionRound } from './math'

const buttons = Array.from(document.querySelectorAll('.button'));
const displayElem = document.querySelector('.display') as HTMLElement;

let operation = '';
let calc = 0;
let display = '';
let firstOperator = true;
let previousInput: InputType;

buttons.forEach(function (button) {
  button.addEventListener('click', onButtonClick);
});

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
