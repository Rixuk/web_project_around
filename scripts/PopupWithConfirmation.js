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

  close() {
    super.close();
  }
  open(id){
    super.open();
    this._id = id;
  }
}
