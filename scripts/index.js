/*-----------------Importing classes------------------*/
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
/*-----------------------------------------------------*/
const config = {
  formSelector: ".popup__form",
  inputSelector: ".form__inputs",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "form__inputs_type_error",
};
const content = document.querySelector(".content");
const profile = content.querySelector(".profile");
const editButton = profile.querySelector(".profile__button");
const addButton = profile.querySelector(".profile__add-button");

/* -------------------Object and foreach to add cards------------------ */

const api = new Api("98ceb637-6af7-4ed6-84f7-0abd0d26da19", "https://around-api.es.tripleten-services.com/v1");

const userInfo = new UserInfo({
  userName: ".profile__name",
  userAbout: ".profile__profession",
  userAvatar: ".profile__avatar"
});

api.getData().then((userData) => {
    userInfo.setUserInfo({ name: userData.name, about: userData.about , avatar: userData.avatar});
  }).catch((err) => {
    console.log(err);
  });

api.getInitialCards().then((cardsData) => {
const section = new Section(
  {
    items: cardsData,
    renderer: (item) => {
      const card = new Card(item, "#elements__template", (name, link) => {
        popupWithImage.openImage({ name: name, link: link });
      });
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  },
  ".elements"
);
section.renderElements();
}).catch((err) => {
    console.log(err);
});

const popupWithImage = new PopupWithImage("#popup-image");
popupWithImage.setEventListeners();

editButton.addEventListener("click", () => {
  const infoProfile = userInfo.getUserInfo();
  const popProfile = document.querySelector("#popup-profile");
  const popupForm = popProfile.querySelector(".popup__form");
  const nameInput = popupForm.querySelector("#popup__name");
  const aboutInput = popupForm.querySelector("#popup__job");
  nameInput.value = infoProfile.name.trim();
  aboutInput.value = infoProfile.about.trim();
  popupWithForm.open();
});

addButton.addEventListener("click", () => {
  popupNewCard.open();
});

const validatorForm = new FormValidator(config);
validatorForm.enableValidation();
const popupWithForm = new PopupWithForm("#popup-profile", (data) => {
  userInfo.setUserInfo({ name: data.name, about: data.about });
  popupWithForm.close();
});
popupWithForm.setEventListeners();

const popupNewCard = new PopupWithForm("#popup-cards", (data) => {
  const newCard = new Card(data, "#elements__template", (name, link) => {
    popupWithImage.openImage({ name: name, link: link });
  });
  const cardElement = newCard.generateCard();
  section.addItem(cardElement);
  popupNewCard.close();
});
popupNewCard.setEventListeners();
