export default class Card {
  constructor(data, templateSelector, popupImage, popupConfirmation, toggleLike) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;

    this._templateSelector = templateSelector;

    this._popupImage = popupImage;
    this._popupConfirmation = popupConfirmation;
    this._toggleLike = toggleLike;

    this._clon = this._getTemplate();
  }

  _getTemplate() {
    const clon = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return clon;
  }

  _likeButton() {
    this._clon
      .querySelector(".elements__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("elements__like-enabled");
        this._toggleLike(this._id, evt.target.classList.contains("elements__like-enabled"));
      });
  }

  _trashButton() {
    this._clon
      .querySelector(".elements__trash")
      .addEventListener("click", () => {
        this._popupConfirmation(this._id, this._element);
      });
  }

  generateCard() {
    this._element = this._clon.firstElementChild;

    const image = this._clon.querySelector(".elements__image");
    image.src = this._link;
    image.alt = this._name;

    this._clon.querySelector(".elements__location").textContent = this._name;

    this._likeButton();
    this._trashButton();

    image.addEventListener("click", () => {
        this._popupImage(this._name, this._link);
      });
      
    return this._element;
  }
}
