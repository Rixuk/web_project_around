/*-----------------Importing classes------------------*/
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

/*-----------------------------------------------------*/
const content = document.querySelector(".content");
const profile = content.querySelector(".profile");

//Edit Profile variables
const profilePopup = profile.querySelector("#popup-profile");
const profileButton = profile.querySelector(".profile__button");

//New Cards variables
const cardsPopup = profile.querySelector("#popup-cards");
const addButton = profile.querySelector(".profile__add-button");

//General Popups variables
const popups = Array.from(document.querySelectorAll(".popups"));

//Validation OBJECT
/*const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".form__inputs",
  submitButtonSelector: ".popup__save",
};*/

//Elements variables
const elementsTemplate = document.querySelector("#elements__template");

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

const popupWithImage = new PopupWithImage("#popup-image");
popupWithImage.setEventListeners();

const section = new Section(
  {
    items: initCards,
    renderer: (item) => {
      const card = new Card(item, "#elements__template", (name, link) => {
        console.log(name, link);
        popupWithImage.open({ name: name, link: link });
      });
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  },
  ".elements"
);

section.renderElements();
