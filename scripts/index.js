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
const initCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const api = new Api("98ceb637-6af7-4ed6-84f7-0abd0d26da19");

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

const section = new Section(
  {
    items: initCards,
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
