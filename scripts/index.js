const content = document.querySelector(".content");
const profile = content.querySelector(".profile");
const editProfile = profile.querySelector(".profile__button");
const editNewCards = profile.querySelector(".profile__add-button");

const popup = content.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const popupClose = popup.querySelector(".popup__close");

const newCards = content.querySelector(".new-cards");
const newCardsForm = newCards.querySelector(".new-cards__form");
const newCardsClose = newCards.querySelector(".new-cards__close");

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

function closeNewCards() {
  newCards.classList.toggle("new-cards__opened");
}

//Eventos para edición de perfil
editProfile.addEventListener("click", showPopup);
popupClose.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleProfileFormSubmit);

//Eventos para agregar nueva tarjeta
editNewCards.addEventListener("click", showNewCards);
newCardsClose.addEventListener("click", closeNewCards);
