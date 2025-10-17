import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  showPopup,
  handleProfileFormSubmit,
  closePopup,
  closeEventListeners, handleEsc
} from "./utils.js";

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
const popupsClose = Array.from(document.querySelectorAll(".popups__close"));

//Validation OBJECT
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".form__inputs",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__inputs_type_error",
  errorClass: "popup__error",
};

//Image Popup variables
const popupImage = document.querySelector("#popup-image");
const imagePopup = popupImage.querySelector("#popup-images__image");
const imageLocation = popupImage.querySelector("#popup-images__location");

//Elements variables
const elements = content.querySelector(".elements");
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

//configuracion y forma
//kickoff un methodo que inicializa cosas y genera una reaccion cadena

const valida = new FormValidator(validationConfig);
valida.enableValidation();

const cardInstances = initCards.map(
  (item) => new Card(item, "#elements__template", popupImage)
);
cardInstances.forEach((card) => {
  elements.append(card.generateCard());
});

/* ----------------------New Cards Popup Function----------------------*/
// utils
function addNewCard(urlValue, locationValue) {
  const data = {
    link: urlValue,
    name: locationValue,
  };
  const card = new Card(data, "#elements__template", popupImage);
  elements.append(card.generateCard());
}
/*----------------------------------------------------------------------*/

/*---------------------Edit Profile Event Listeners---------------------*/
profileButton.addEventListener("click", showPopup);
profilePopup.addEventListener("submit", handleProfileFormSubmit);
/*----------------------------------------------------------------------*/

/*---------------------New Cards Event Listeners------------------------*/
addButton.addEventListener("click", () => {
  cardsPopup.classList.toggle("popup__opened");
});
cardsPopup.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const urlLink = document.querySelector("#new-cards__link");
  const newCardName = document.querySelector("#new-cards__name");

  addNewCard(urlLink.value, newCardName.value);

  urlLink.value = "";
  newCardName.value = "";

  closePopup(evt);
});
/*----------------------------------------------------------------------*/

/*---------------------Close Popups Functions---------------------------*/


popupsClose.forEach((popupClose) => {
  popupClose.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popups");
    const urlLink = document.querySelector("#new-cards__link");
    const newCardName = document.querySelector("#new-cards__name");

    urlLink.value = "";
    newCardName.value = "";
    imagePopup.src = "";
    imageLocation.src = "";

    popup.classList.toggle("popup__opened");
  });
  document.removeEventListener("keyup", handleEsc);
});

popups.forEach((popup) => {
  closeEventListeners(popup);
});
/*----------------------------------------------------------------------*/
