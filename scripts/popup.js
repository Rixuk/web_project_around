const content = document.querySelector(".content");
const profile = content.querySelector(".profile");
const editProfile = profile.querySelector(".profile__button");
const popup = content.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const popupClose = popup.querySelector(".popup__close");

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

editProfile.addEventListener("click", showPopup);
popupClose.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleProfileFormSubmit);
