import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector("#popup-images__image");
    this._caption = this._popup.querySelector("#popup-images__location");
  }
  open(){
    this._image.src = this._link;
    this._image.alt = this._name;
    this._caption.textContent = this._name;
    super.open();
  }
}
