var operation = '';
var buttons = [].slice.call(document.querySelectorAll('.button'));
var displayElem = document.querySelector('.display');
var calc = 0;
var display = '';
var firstOperator = true;
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
      handleNumeric(input);
      break;
    case 'operator':
      handleOperator(input);
      break;
    case 'decimal':
      // optional: add decimal support
      break;
    case 'evaluate':
      handleEvaluate();
      break;
    case 'clear':
      handleClear();
      break;
  }
  console.info('Pressed ' + input.type + ' with value: ' + input.value);
  previousInput = input;
  displayElem.textContent = display ? display : '0';
}

function handleNumeric(input) {
  if (previousInput.type === 'numeric') {
    display += input.value;
  } else {
    display = input.value;
  }
}

function handleOperator(input) {
  if (display === '') {
    return;
  }
  operation = input.value;
  var displayValue = precisionRound(parseFloat(display), 2);
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
  if (previousInput.type !== 'evaluate') {
    var displayValue = precisionRound(parseFloat(display), 2);
    calc = operations[operation](calc, displayValue);
    display = String(calc);
  }
}

function handleClear() {
  calc = 0;
  display = '';
  operation = '';
  previousInput = {};
  firstOperator = true;
}
