class FormValidator {
  constructor(configObject) {
    this._configObject = configObject;
  }

  _toggleButtonState(formElement, inputs) {
    const buttonElement = formElement.querySelector(
      this._configObject.submitButtonSelector
    );

    const isFormValid = inputs.every((input) => input.validity.valid);

    if (isFormValid) {
      buttonElement.classList.remove(this._configObject.inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._configObject.inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }

  _checkInputValidity(inputElement, formElement) {
    const errorElement = formElement.querySelector(
      `#${inputElement.id}-error`
      //concatenar popup__name-error
    );
    if (!inputElement.validity.valid) {
      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._configObject.inputErrorClass);
    } else {
      errorElement.textContent = "";
      inputElement.classList.remove(this._configObject.inputErrorClass);
    }
  }

  _setEventListeners() {
    this._formElement = document.querySelectorAll(
      this._configObject.formSelector
    );
    this._formElements = Array.from(this._formElement);
    this._formElements.forEach((formElement) => {
      const inputs = Array.from(
        formElement.querySelectorAll(this._configObject.inputSelector)
      );

      inputs.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement, formElement);
          this._toggleButtonState(formElement, inputs);
        });
      });
    });

  }
  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };