const display = document.querySelector(".zero");
const buttons = document.querySelectorAll("button");

let firstNum = null;
let reset = false;
let operator = null;

function calculate(a, b, operator) {
  if (operator === "+") {
    return a + b;
  } else if (operator === "−") {
    return a - b;
  } else if (operator === "÷") {
    return b === 0 ? "Error" : a / b;
  } else if (operator === "×") {
    return a * b;
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    const value = event.currentTarget.innerText.trim();

    if (value === "AC") {
      display.value = "0";
      operator = null;
      firstNum = null;
      reset = false;
    } else if (value === "+/-") {
      display.value = String(-Number(display.value));
    } else if (value === "%") {
      display.value = String(Number(display.value) / 100);
    } else if (
      value === "+" ||
      value === "−" ||
      value === "÷" ||
      value === "×"
    ) {
      firstNum = Number(display.value);
      operator = value;
      reset = true;
    } else if (value === "=") {
      if (operator === null) {
        return;
      }

      const secondNum = Number(display.value);
      const result = calculate(firstNum, secondNum, operator);

      display.value = String(result);
      firstNum = null;
      operator = null;
      reset = true;
    } else {
      if (!/^[0-9.]$/.test(value)) {
        return;
      }
      if (reset || display.value === "Error") {
        display.value = value === "." ? "0." : value;
        reset = false;
      } else if (value === "." && display.value.includes(".")) {
        return;
      } else if (display.value === "0" && value !== ".") {
        display.value = value;
      } else {
        display.value += value;
      }
    }
  });
});
