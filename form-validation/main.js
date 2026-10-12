"use strict";

let form = document.querySelector("form");
let inputList = Array.from(form.querySelectorAll(".input-type"));
let checkboxElement = form.querySelector(".checkbox-type");
let buttonElement = form.querySelector(".button-type");
let errorElement = form.querySelector(".form__empty-error");

function formFocus() {
  for (let inputElement of inputList) {
    inputElement.addEventListener("focus", () => {
      form.classList.add("form-focus");
    });
  }
}

formFocus();

formValidate();

function formValidate() {
  toggleButton();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    inputList.forEach((inputElement) => {
      checkInputValid(inputElement);
      toggleInputError(inputElement);
    });

    toggleInputError(checkboxElement);

    if (hasInvalidInput()) {
      formError();
    } else {
      errorElement.textContent = "Форма успешно прошла проверку";
    }
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValid(inputElement);
      toggleInputError(inputElement);
      toggleButton();
    });

    inputElement.addEventListener("blur", () => {
      toggleInputError(inputElement);
    });

    inputElement.addEventListener("focus", () => {
      toggleSpanError(inputElement);
    });
  });

  checkboxElement.addEventListener("change", () => {
    toggleInputError(checkboxElement);
    toggleButton();
  });
}

function checkInputValid(inputElement) {
  inputElement.setCustomValidity("");
  if (
    (inputElement.type === "text" || inputElement.type === "email") &&
    inputElement.validity.patternMismatch
  ) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    return inputElement.validationMessage;
  } else {
    if (inputElement.type === "text" || inputElement.type === "email") {
      let lengthError = checkLengthMatch(inputElement);

      if (lengthError !== "") {
        inputElement.setCustomValidity(lengthError);
      }
    }
  }
}

function checkLengthMatch(inputElement) {
  let valueLength = inputElement.value.trim().length;
  if (valueLength < inputElement.minLength) {
    return "Введено слишком мало символов";
  } else if (valueLength > inputElement.maxLength) {
    return "Введено слишком много символов";
  } else {
    return "";
  }
}

function hasInvalidInput() {
  return (
    inputList.some((inputElement) => !inputElement.validity.valid) ||
    !checkboxElement.validity.valid
  );
}

function toggleButton() {
  if (hasInvalidInput()) {
    buttonElement.classList.add("inactive-button");
    buttonElement.setAttribute("aria-disabled", "true");
  } else {
    buttonElement.classList.remove("inactive-button");
    buttonElement.setAttribute("aria-disabled", "false");
    errorElement.textContent = "";
  }
}

function toggleSpanError(inputElement, errorMessage) {
  let elementError = document.querySelector(`.${inputElement.id}-error`);
  if (errorMessage) {
    inputElement.classList.add("input-active-error");
    elementError.textContent = errorMessage;
  } else {
    inputElement.classList.remove("input-active-error");
    elementError.textContent = "";
  }
}

function toggleInputError(inputElement) {
  if (!inputElement.validity.valid) {
    toggleSpanError(inputElement, inputElement.validationMessage);
  } else {
    toggleSpanError(inputElement);
  }
}

function formError() {
  let errorMessage = "Заполните все поля для отправки формы";
  errorElement.textContent = errorMessage;
}
