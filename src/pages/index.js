import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/section.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userinfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";

// Elements //
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const modalCloseButton = document.querySelector("#modal-close-button");

const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(
  "#modal-close-button"
);

const previewImageElement = previewModal.querySelector("#preview__image");
const previewImageCaption = previewModal.querySelector("#preview__title");

const modals = [addCardModal, profileEditModal, previewModal];
modals.forEach((modal) => {
  modal.addEventListener("click", closeModalByOverlay);
});

// Functions //
function closeModalByPressingESC(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function closeModalByOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByPressingESC);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByPressingESC);
}

const cardSelector = "#card-template";

const editFormvalidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormvalidator.enableValidation();

const addFormvalidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addFormvalidator.enableValidation();

const handleLikeIcon = (evt) => {
  evt.target.classList.toggle("card__like-button_active");
};

const handleDeleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

const handlePreviewPicture = (cardData) => {
  previewImageElement.src = cardData.link;
  previewImageElement.alt = `${cardData.name}`;
  previewImageCaption.textContent = cardData.name;
  openModal(previewModal);
};

// Create an instance
//   pass it the selector for the popup in question
//   for now, pass an empty function for second argument
// call setEventListeners method

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderCard(item, cardListEl);
    },
  },
  ".cards__list"
);
section.renderItems();

const addCardPopup = new PopupWithForm("#add-card-modal", (cardData) => {
  handleAddCardFormSubmit(cardData);
});
addCardPopup.setEventListeners();

// reset button and form validator

const profilePopup = new PopupWithForm("#profile-edit-modal", (cardData) => {
  userInfoInstance.setUserInfo(cardData);
  profilePopup.close();
});
profilePopup.setEventListeners();

const previewImagePopup = new PopupWithImage("#preview-modal", () => {});
previewImagePopup.setEventListeners();

const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function renderCard(cardData, cardListEl) {
  const card = new Card(cardData, cardSelector, handlePreviewPicture);
  // TODO - instead of prepending to cardListEl here
  // you should call section class's addItem method
  cardListEl.prepend(card.getView());
}

// Event Handlers //

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  e.target.reset();
  addFormvalidator.resetButton();
}

// Event Listeners //

profileEditButton.addEventListener("click", () => {
  const userInfo = userInfoInstance.getUserInfo();
  profileTitleInput.value = userInfo.name;
  profileDescriptionInput.value = userInfo.job;
  profilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// TODO - remove all close button listeners
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
