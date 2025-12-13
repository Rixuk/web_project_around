import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleConfirmation = handleConfirmation;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmation(this._id);
    });
  }

  setLoading(isLoading) {
  const button = this._form.querySelector(".popup__save");
  if (isLoading) {
    this._defaultText = button.textContent;
    button.textContent = "Eliminando...";
    button.disabled = true;
  } else {
    button.textContent = this._defaultText;
    button.disabled = false;
  }
}


  close() {
    super.close();
  }
  open(id){
    super.open();
    this._id = id;
  }
}
