const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNaxtValue = false;

function sendNumberValue(number) {
  if (awaitingNaxtValue) {
    calculatorDisplay.textContent = number;
    awaitingNaxtValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingNaxtValue) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent += ".";
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (operatorValue && awaitingNaxtValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNaxtValue = true;
  operatorValue = operator;
}

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNaxtValue = false;
  calculatorDisplay.textContent = "0";
}

inputBtns.forEach((button) => {
  const buttonType = button.dataset.type;
  if (buttonType === "number") {
    button.addEventListener("click", () => sendNumberValue(button.value));
  } else if (buttonType === "operator") {
    button.addEventListener("click", () => useOperator(button.value));
  } else if (buttonType === "decimal") {
    button.addEventListener("click", addDecimal);
  } else if (buttonType === "clear") {
    button.addEventListener("click", resetAll);
  }
});
