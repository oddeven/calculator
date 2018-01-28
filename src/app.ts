import { ActionType, InputType, inputType } from './input-helpers';
import { operations, precisionRound } from './math'

const buttons = Array.from(document.querySelectorAll('.button'));
const displayElem = document.querySelector('.display') as HTMLElement;

let operation = '';
let calc = 0;
let display = '';
let previousOperation = '';
let previousInput: InputType = { type: ActionType.none, value: '' };

buttons.forEach(function (button) {
  button.addEventListener('click', onButtonClick);
});

function onButtonClick() {
  const input = inputType(this);
  switch (input.type) {
    case ActionType.numeric:
      if (previousInput.type === ActionType.numeric || previousInput.type === ActionType.decimal) {
        display = display + input.value;
      } else {
        display = input.value;
        if (previousInput.type === ActionType.evaluate) {
          calc = 0;
          previousOperation = '';
        }
      }
      break;
    case ActionType.operator:
      operation = input.value;
      if (!previousOperation) {
        previousOperation = operation;
      }
      const displayValue = precisionRound(parseFloat(display));
      if (calc === 0) {
        if (operation === 'multiply') {
          calc = 1;
        } else if (operation === 'divide') {
          calc = displayValue * displayValue;
        } else if (operation === 'subtract') {
          calc = displayValue * 2;
        }
      }
      if (previousInput.type !== ActionType.operator) {
        if (previousOperation !== operation) {
          calc = operations[previousOperation](calc, displayValue);
        } else {
          calc = operations[operation](calc, displayValue);
        }
      }
      display = String(calc);
      previousOperation = operation;
      break;
    case ActionType.decimal:
      if (display.indexOf('.') === -1) {
        display += '.';
      }
      break;
    case ActionType.evaluate:
      if (previousInput.type !== ActionType.evaluate) {
        const displayValue = precisionRound(parseFloat(display));
        calc = operations[operation](calc, displayValue);
        display = String(calc);
      }
      break;
    case ActionType.clear:
      calc = 0;
      display = '';
      previousInput = { type: ActionType.none, value: '' };
      operation = '';
      previousOperation = '';
      break;
  }
  previousInput = input;
  displayElem.textContent = display ? display : '0';
}