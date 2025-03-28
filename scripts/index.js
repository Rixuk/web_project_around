const content = document.querySelector(".content");

//Variables usadas para el botón de editar el perfil
const profile = content.querySelector(".profile");
const editProfile = profile.querySelector(".profile__button");

//Variables usadas para la ventana emergente de editar perfil
const popup = content.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const popupClose = popup.querySelector(".popup__close");

//Variables usadas para la ventana emergente de agregar nuevo lugar
const newCards = content.querySelector(".new-cards");
const editNewCards = profile.querySelector(".profile__add-button");
const newCardsClose = newCards.querySelector(".new-cards__close");
const newCardsForm = newCards.querySelector(".new-cards__form");

//Variable para popup de imagen
const imagesPopup = document.querySelector(".popup-images");
const closeImagePopup = imagesPopup.querySelector(".popup-images__close");
const imagePopup = imagesPopup.querySelector(".popup-images__image");
const imageLocation = imagesPopup.querySelector(".popup-images__location");

const elements = content.querySelector(".elements");
const elementsTemplate = document.querySelector("#elements__template");

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

initCards.forEach(({ name, link }) => {
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
    imagesPopup.classList.toggle("popup-images__opened");
    imageLocation.textContent = name;
    imagePopup.src = link;
  });
  elements.appendChild(clon);
});

//Inician las funciones usadas para editar el perfil
function showPopup() {
  popup.classList.toggle("popup__opened");
  const profileName = profile.querySelector("#profile__name");
  const profileJob = profile.querySelector("#profile__profession");
  const nameInput = popup.querySelector("#popup__name");
  const jobInput = popup.querySelector("#popup__job");

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent.trim();
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileName = profile.querySelector("#profile__name");
  const profileJob = profile.querySelector("#profile__profession");
  const nameInput = popup.querySelector("#popup__name");
  const jobInput = popup.querySelector("#popup__job");

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}
function closePopup() {
  popup.classList.toggle("popup__opened");
}
//Finalizan las funciones usadas para editar el perfil

//Inician las funciones para agregar nuevas tarjetas
function showNewCards() {
  newCards.classList.toggle("new-cards__opened");
}

//Función que se llamará cada que se vaya a agregar una nueva tarjeta.
function addNewCard(urlValue, locationValue) {
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
      imagesPopup.classList.toggle("popup-images__opened");
      imageLocation.textContent = locationValue;
      imagePopup.src = urlValue;
    });
  elements.prepend(clonNewCard);
}

function closeNewCards() {
  newCards.classList.toggle("new-cards__opened");
}
//Finalizan las funciones para agregar nuevas tarjetas

//Función para cerrar cerrar la imagen grande
function closePopupImage() {
  imagesPopup.classList.toggle("popup-images__opened");
  imagePopup.src = "";
  imageLocation.src = "";
}
//Eventos para edición de perfil
editProfile.addEventListener("click", showPopup);
popupClose.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleProfileFormSubmit);

//Eventos para abrir ventana de agregar nueva tarjeta
editNewCards.addEventListener("click", showNewCards);
newCardsClose.addEventListener("click", closeNewCards);

//Evento con función para agregar nueva tarjeta
newCardsForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const urlLink = document.querySelector(".new-cards__link");
  const newCardName = document.querySelector(".new-cards__name");

  addNewCard(urlLink.value, newCardName.value);

  urlLink.value = "";
  newCardName.value = "";

  closeNewCards();
});

//Evento para cerrar imagen más grande
closeImagePopup.addEventListener("click", closePopupImage);
