class Card {
  constructor(data, templateSelector, popupImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._clon = this._getTemplate();
    this._popupImage = popupImage;
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
      });
  }
  _trashButton() {
    this._clon
      .querySelector(".elements__trash")
      .addEventListener("click", (evt) => {
        evt.target.parentElement.remove();
      });
  }
  _popupCard() {
    this._clon
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        const imagePopup = this._popupImage.querySelector(
          "#popup-images__image"
        );
        const imageLocation = this._popupImage.querySelector(
          "#popup-images__location"
        );
        this._popupImage.classList.toggle("popup__opened");
        imageLocation.textContent = this._name;
        imagePopup.src = this._link;
      });
  }
  generateCard() {
    this._element = this._clon;
    this._clon.querySelector(".elements__image").src = this._link;
    this._clon.querySelector(".elements__image").alt = this._name;
    this._clon.querySelector(".elements__location").textContent = this._name;
    this._likeButton();
    this._trashButton();
    this._popupCard();
    return this._element;
  }
}

export { Card };
