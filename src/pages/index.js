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

// Functions //

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

const handlePreviewPicture = (cardData) => {
  previewImageElement.src = cardData.link;
  previewImageElement.alt = `${cardData.name}`;
  previewImageCaption.textContent = cardData.name;
  openModal(previewModal);
};

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

const profilePopup = new PopupWithForm("#profile-edit-modal", (cardData) => {
  userInfoInstance.setUserInfo(cardData);
  profilePopup.close();
});
profilePopup.setEventListeners();

const previewImagePopup = new PopupWithImage(
  "#preview-modal",
  (cardData) => {}
);
previewImagePopup.setEventListeners();

const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function renderCard(cardData, cardListEl) {
  const card = new Card(cardData, cardSelector, handlePreviewPicture);
  cardListEl.prepend(card.getView());
}

// Event Handlers //

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  profileEditForm.reset();
}

function handleAddCardFormSubmit(e) {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardFormElement.reset();
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

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
