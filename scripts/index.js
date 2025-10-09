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

class Card {
  constructor(data, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._clon = this._getTemplate();
  }
  _getTemplate(){
    const clon = document.querySelector(this._templateSelector).content.cloneNode(true);
    return clon;
  }
  _likeButton(){
    this._clon.querySelector(".elements__like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__like-enabled");
    })};
  _trashButton(){
    this._clon.querySelector(".elements__trash").addEventListener("click", (evt) => {
      evt.target.parentElement.remove();
    })};
  _popupCard(){
    this._clon.querySelector(".elements__image").addEventListener("click", () => {
      popupImage.classList.toggle("popup__opened");
      imageLocation.textContent = this._name;
      imagePopup.src = this._link;
    })};
  generateCard(){
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

class FormValidator {
  constructor(configObject, formElement){
    this._configObject = configObject;
    this._formElement = formElement;
  }

  _checkInputValidity(inputElement){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  } else {
    errorElement.textContent = "";
    inputElement.classList.remove(this._config.inputErrorClass);
  }
  }
  _toggleButtonState() {
  const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  const inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  const isFormValid = inputs.every(input => input.validity.valid);

  if (isFormValid) {
    buttonElement.classList.remove(this._config.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(this._config.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  }
  _setEventListeners() {
  const inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));

  inputs.forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });

  this._toggleButtonState(); // estado inicial del botón
  }
  enableValidation() {
  this._setEventListeners();
}
}


const cardInstances = initCards.map(item => new Card(item, "#elements__template"));
cardInstances.forEach(card => {
  elements.append(card.generateCard());
});



/* ---------------------------------------------------------------------*/
/*initCards.forEach(({ name, link }) => {
  const clon = elementsTemplate.content.cloneNode(true);
  clon.querySelector(".elements__image").src = link;
  clon.querySelector(".elements__image").alt = name;
  clon.querySelector(".elements__location").textContent = name;
  clon
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like-enabled");
    });
  clon
    .querySelector(".elements__trash")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    });
  clon.querySelector(".elements__image").addEventListener("click", function () {
    popupImage.classList.toggle("popup__opened");
    imageLocation.textContent = name;
    imagePopup.src = link;
  });
  elements.appendChild(clon);
});*/
/* ---------------------------------------------------------------------*/

/* ----------------------Edit profile Functions------------------------ */
/*function showPopup() {
  profilePopup.classList.toggle("popup__opened");
  profilePopup.focus();
  const profileName = profile.querySelector("#profile__name");
  const profileJob = profile.querySelector("#profile__profession");
  const nameInput = profilePopup.querySelector("#popup__name");
  const jobInput = profilePopup.querySelector("#popup__job");

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent.trim();
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileName = profile.querySelector("#profile__name");
  const profileJob = profile.querySelector("#profile__profession");
  const nameInput = profilePopup.querySelector("#popup__name");
  const jobInput = profilePopup.querySelector("#popup__job");

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(evt);
}*/
/* -------------------------------------------------------------------- */

/* ----------------------New Cards Popup Function----------------------*/
/*function addNewCard(urlValue, locationValue) {
  const clonNewCard = elementsTemplate.content.cloneNode(true);
  clonNewCard.querySelector(".elements__image").src = urlValue;
  clonNewCard.querySelector(".elements__image").alt = locationValue;
  clonNewCard.querySelector(".elements__location").textContent = locationValue;
  clonNewCard
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like-enabled");
    });
  clonNewCard
    .querySelector(".elements__trash")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    });
  clonNewCard
    .querySelector(".elements__image")
    .addEventListener("click", function () {
      popupImage.classList.toggle("popup__opened");
      imageLocation.textContent = locationValue;
      imagePopup.src = urlValue;
    });
  elements.prepend(clonNewCard);
}*/
/*----------------------------------------------------------------------*/

/*---------------------Edit Profile Event Listeners---------------------*/
/*profileButton.addEventListener("click", showPopup);
profilePopup.addEventListener("submit", handleProfileFormSubmit);
*/
/*----------------------------------------------------------------------*/

/*---------------------New Cards Event Listeners------------------------*/
/*addButton.addEventListener("click", () => {
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
});*/
/*----------------------------------------------------------------------*/

/*---------------------Close Popups Functions---------------------------*/
const resetErrorMessages = (popup) => {
  const errorMessages = Array.from(
    popup.querySelectorAll(".form__inputs-error_active")
  );
  const inputsError = Array.from(popup.querySelectorAll(".form__inputs"));
  errorMessages.forEach((error) => {
    error.textContent = "";
  });
  inputsError.forEach((iError) => {
    iError.classList.remove("form__inputs_type_error");
  });
};
const resetCardsInputs = () => {
  const urlLink = document.querySelector("#new-cards__link");
  const newCardName = document.querySelector("#new-cards__name");
  urlLink.value = "";
  newCardName.value = "";
  imagePopup.src = "";
  imageLocation.src = "";
};
const handleEsc = (popup) => {
  document.addEventListener("keyup", (evnt) => {
    if (evnt.key === "Escape") {
      popup.classList.remove("popup__opened");
    }
  });
};

function closePopup(evt) {
  const popup = evt.target.closest(".popups");
  popup.classList.toggle("popup__opened");
  resetErrorMessages(popup);
  document.removeEventListener("keyup", handleEsc);
}

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

const closeEventListeners = (closestPopup) => {
  const closeButton = closestPopup.querySelector(".popups__close");
  const closeOverlay = closestPopup.querySelector(".popup__overlay");

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closestPopup.classList.remove("popup__opened");
      resetErrorMessages(closestPopup);
      resetCardsInputs();
    }
  });
  closeOverlay.addEventListener("click", () => {
    closestPopup.classList.remove("popup__opened");
    resetErrorMessages(closestPopup);
    resetCardsInputs();
  });
  closeButton.addEventListener("click", () => {
    closestPopup.classList.remove("popup__opened");
    resetErrorMessages(closestPopup);
    resetCardsInputs();
  });
};

popups.forEach((popup) => {
  closeEventListeners(popup);
});

/*----------------------------------------------------------------------*/