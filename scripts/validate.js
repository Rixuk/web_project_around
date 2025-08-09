const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("form__inputs_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error");
};
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("form__inputs_type_error");
  errorElement.classList.remove("popup__error");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const formInputs = Array.from(formElement.querySelectorAll(".form__inputs"));
  const buttonElement = formElement.querySelector(".popup__save");

  toggleButtonState(formInputs, buttonElement);
  formInputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(formInputs, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit_inactive");
  } else {
    buttonElement.classList.remove("form__submit_inactive");
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
    const fieldsetList = Array.from(
      formElement.querySelectorAll(".popup__fieldset")
    );
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".form__inputs",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__inputs_type_error",
  errorClass: "popup__error",
});
