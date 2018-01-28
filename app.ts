var operation = '';
var buttons = [].slice.call(document.querySelectorAll('.button'));
var displayElem = document.querySelector('.display');
var calc = 0;
var display = '';
var previousOperation = '';
var previousInput = {};

buttons.forEach(function (button) {
  button.addEventListener('click', onButtonClick);
});

var operations = {
  add: function (a, b) {
    return a + b;
  },
  multiply: function (a, b) {
    return a * b;
  },
  subtract: function (a, b) {
    return a - b;
  },
  divide: function (a, b) {
    return a / b;
  }
};

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function inputType(input) {
  var inputObj = {};

  inputObj.type = input.dataset.type;
  inputObj.value = input.dataset[input.dataset.type];

  if (inputObj.type === 'numeric') {
    inputObj.value = input.textContent;
  }
  if (inputObj.type === 'operator') {
    inputObj.value = input.dataset.operator;
  }
  return inputObj;
}

function onButtonClick() {
  var input = inputType(this);
  switch (input.type) {
    case 'numeric':
      if (previousInput.type === 'numeric' || previousInput.type === 'decimal') {
        display = display + input.value;
      } else {
        display = input.value;
        if (previousInput.type === 'evaluate') {
          calc = 0;
          previousOperation = '';
        }
      }
      break;
    case 'operator':
      operation = input.value;
      if (!previousOperation) {
        previousOperation = operation;
      }
      var displayValue = precisionRound(parseFloat(display), 2);
      if (calc === 0) {
        if (operation === 'multiply') {
          calc = 1;
        } else if (operation === 'divide') {
          calc = displayValue * displayValue;
        } else if (operation === 'subtract') {
          calc = displayValue * 2;
        }
      }
      if (previousInput.type !== 'operator') {
        if (previousOperation !== operation) {
          calc = operations[previousOperation](calc, displayValue);
        } else {
          calc = operations[operation](calc, displayValue);
        }
      }
      display = String(calc);
      previousOperation = operation;
      break;
    case 'decimal':
      if (display.indexOf('.') === -1) {
        display += '.';
      }
      break;
    case 'evaluate':
      if (previousInput.type !== 'evaluate') {
        var displayValue = precisionRound(parseFloat(display), 2);
        calc = operations[operation](calc, displayValue);
        display = String(calc);
      }
      break;
    case 'clear':
      calc = 0;
      display = '';
      previousInput = {};
      operation = '';
      previousOperation = '';
      break;
  }
  previousInput = input;
  displayElem.textContent = display ? display : '0';
}