const content = document.querySelector(".content");
const profile = content.querySelector(".profile");
const profilePopup = profile.querySelector("#popup-profile");
const popupImage = document.querySelector("#popup-image");
const imagePopup = popupImage.querySelector("#popup-images__image");
const imageLocation = popupImage.querySelector("#popup-images__location");

function showPopup() {
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
}
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

export { showPopup, handleProfileFormSubmit, closePopup, closeEventListeners, handleEsc };