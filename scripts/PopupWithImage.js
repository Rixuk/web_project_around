import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector("#popup-images__image");
    this._caption = this._popup.querySelector("#popup-images__location");
  }

  open({ name, link }) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
  }
  //.open( { name: "", link: "" })
}

const popupWithImage = new PopupWithImage("#popup-image");
popupWithImage.setEventListeners();
popupWithImage.open({
  name: "Yosemite Valley",
  link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
});
