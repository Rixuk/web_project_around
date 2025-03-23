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
  const image = clon.querySelector(".elements__image");
  const location = clon.querySelector(".elements__location");

  image.src = link;
  location.textContent = name;

  elements.appendChild(clon);
});

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

function showNewCards() {
  newCards.classList.toggle("new-cards__opened");
}

//Función que se llamará cada que se vaya a agregar una nueva tarjeta.
function addNewCard(urlValue, locationValue) {
  const clonNewCard = elementsTemplate.content.cloneNode(true);
  const urlNewCard = clonNewCard.querySelector(".elements__image");
  const locationNewCard = clonNewCard.querySelector(".elements__location");

  urlNewCard.src = urlValue;
  locationNewCard.textContent = locationValue;

  elements.prepend(clonNewCard);
}
function closeNewCards() {
  newCards.classList.toggle("new-cards__opened");
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
