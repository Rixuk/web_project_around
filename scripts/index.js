/*-----------------Importing classes------------------*/
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
/*-----------------------------------------------------*/

/* -------- CONFIG VALIDATION -------- */
const config = {
  formSelector: ".popup__form",
  inputSelector: ".form__inputs",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "form__inputs_type_error",
};

/* ------------------- DOM ------------------ */
const content = document.querySelector(".content");
const profile = content.querySelector(".profile");
const editButton = profile.querySelector(".profile__button");
const addButton = profile.querySelector(".profile__add-button");

/* ------------------- API ------------------ */
const api = new Api(
  "98ceb637-6af7-4ed6-84f7-0abd0d26da19",
  "https://around-api.es.tripleten-services.com/v1"
);

/* ------------------- USER INFO ------------------ */
const userInfo = new UserInfo({
  userName: ".profile__name",
  userAbout: ".profile__profession",
  userAvatar: ".profile__avatar",
});

/* ------------------- POPUPS ------------------ */
const popupWithImage = new PopupWithImage("#popup-image");
popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(
  "#popup-confirmation",
  () => {
    popupWithConfirmation.close();
  }
);
popupWithConfirmation.setEventListeners();

/* Popup: Edit profile */
const popupWithForm = new PopupWithForm("#popup-profile", (data) => {
  api
    .patchUserInfo({
      newName: data.name,
      newAbout: data.about,
    })
    .then(() => {
      userInfo.setUserInfo({ name: data.name, about: data.about });
      popupWithForm.close();
    })
    .catch((err) => console.log(err));
});
popupWithForm.setEventListeners();

/* Popup: New card */
const popupNewCard = new PopupWithForm("#popup-cards", (data) => {
  api
    .newCard({ name: data.name, link: data.link })
    .then((newCardData) => {
      const card = createCard(newCardData);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
      popupNewCard.close();
    })
    .catch((err) => console.log(err));
});
popupNewCard.setEventListeners();

/* ------------------- CARD FACTORY ------------------ */
function createCard(item) {
  return new Card(
    item,

    "#elements__template",

    (name, link) => popupWithImage.openImage({ name, link }),

    (cardId) => {
      popupWithConfirmation.open(cardId);
    }
  );
}

/* ------------------- SECTION (LISTA DE CARDS) ------------------ */
const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".elements"
);

/* ------------------- BUTTON LISTENERS ------------------ */
editButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();

  const popupForm = document.querySelector("#popup-profile");
  popupForm.querySelector("#popup__name").value = info.name;
  popupForm.querySelector("#popup__job").value = info.about;

  popupWithForm.open();
});

addButton.addEventListener("click", () => popupNewCard.open());

/* ------------------- VALIDATORS ------------------ */
const validator = new FormValidator(config);
validator.enableValidation();

/* ------------------- API CALLS ------------------ */
api
  .getData()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => console.log(err));

api
  .getInitialCards()
  .then((cardsData) => {
    cardsData.forEach((item) => cardList._renderer(item));
  })
  .catch((err) => console.log(err));
