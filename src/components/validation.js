function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  inputErrorActiveClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorActiveClass);
  inputElement.classList.add(inputErrorClass);

};

function hideInputError(formElement, inputElement, inputErrorClass, inputErrorActiveClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    errorElement.classList.remove(inputErrorActiveClass);
    errorElement.textContent = "";
  }
  inputElement.classList.remove(inputErrorClass);
  inputElement.setCustomValidity("");
};

function checkInputValidity(formElement, inputElement, inputErrorClass, inputErrorActiveClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      inputErrorActiveClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, inputErrorActiveClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

function setEventListeners(formElement, setting) {
  const inputList = Array.from(
    formElement.querySelectorAll(setting.inputSelector)
  );
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  hasInvalidInput(inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, setting.inputErrorClass, setting.inputErrorActiveClass);
      hasInvalidInput(inputList);
      toggleButtonState(inputList, buttonElement, setting.inactiveButtonClass);
    });
  });
};

export function enableValidation(setting) {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, setting);
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  });
};

export function clearValidation(formElement, setting) {
  const inputList = Array.from(
    formElement.querySelectorAll(setting.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, setting.inputErrorClass);
  });

  const buttonElement = formElement.querySelector(setting.submitButtonSelector);
  buttonElement.classList.add(setting.inactiveButtonClass);
  buttonElement.disabled = true;
};
