import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/Userinfo.js";
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

const modals = [addCardModal, profileEditModal, previewModal];

const previewImageElement = previewModal.querySelector("#preview__image");
const previewImageCaption = previewModal.querySelector("#preview__title");

// Functions //

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
  previewImagePopup.open(cardData.name, cardData.link);
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

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profilePopup.setEventListeners();

const previewImagePopup = new PopupWithImage("#preview-modal");
previewImagePopup.setEventListeners();

const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function renderCard(cardData) {
  const card = new Card(cardData, cardSelector, handlePreviewPicture);
  section.addItem(card.getView());
}

// Event Handlers //

function handleProfileEditSubmit(values) {
  userInfoInstance.setUserInfo({
    title: values.name,
    description: values.description,
  });
  profilePopup.close();
}

function handleAddCardFormSubmit(values) {
  const name = values.title;
  const link = values.url;
  renderCard({ name, link }, cardListEl);
  addCardPopup.close();
  addCardFormElement.reset();
  addFormvalidator.resetButton();
}

// Event Listeners //

profileEditButton.addEventListener("click", () => {
  const userData = userInfoInstance.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  profilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
