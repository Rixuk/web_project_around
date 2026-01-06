import Popup from './Popup.js';

export default class PopupWithAvatar extends Popup {
    constructor(popupSelector, handleAvatar) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleAvatar = handleAvatar;
    }
    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleAvatar(this._id);
        });
    }
    setLoading(isLoading) {
    const button = this._form.querySelector(".popup__save");
    if (isLoading) {
    this._defaultText = button.textContent;
    button.textContent = "Guardando...";
    button.disabled = true;
  } else {
    button.textContent = this._defaultText;
    button.disabled = false;
  }
    }
}