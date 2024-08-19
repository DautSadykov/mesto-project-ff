import "./pages/index.css";
import { createCard } from "./components/card.js";
import {
  openModal,
  closePopupByOverlay,
  closePopup,
  renderLoading,
} from "./components/modal.js";
import { likeCard, deleteCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  fillInfoOnLoad,
  fetchEditFormSubmit,
  fetchNewPlaceFormSubmit,
  fetchChangeAvatarSubmit,
} from "./components/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorActiveClass: "popup__input-error-text_active",
};

const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const avatarImage = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
let personalId = ""

fillInfoOnLoad().then((res) => {
  avatarImage.style.backgroundImage = `url('${res.avatar}')`;
  profileName.textContent = res.name;
  profileDescription.textContent = res.about;
  personalId = res._id;
  getInitialCards()
    .then((result) => {
      result.forEach((cardInfo) => {
        placesList.append(
          createCard(cardInfo, likeCard, deleteCard, openCardModal, personalId)
        );
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
    closePopupByOverlay(evt);
  });
});

export function openCardModal(cardInfo) {
  const cardPopup = document.querySelector(".popup_type_image");
  cardPopup.querySelector(".popup__image").src = cardInfo.link;
  cardPopup.querySelector(".popup__caption").textContent = cardInfo.name;
  openModal(cardPopup);
}

// edit profile form
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const formEdit = document.forms.editProfile;
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");
fillEditInputArea();

editButton.addEventListener("click", () => {
  openModal(editPopup);
  fillEditInputArea();
  clearValidation(formEdit, validationConfig);
});

function fillEditInputArea() {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  renderLoading(true, editPopup);
  fetchEditFormSubmit(name, job)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(editPopup, editPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, editPopup);
    });
}

formEdit.addEventListener("submit", handleEditFormSubmit);

// add new card form
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const formNewPlace = document.forms.newPlace;

addCardButton.addEventListener("click", () => {
  openModal(addCardPopup);
  clearValidation(formNewPlace, validationConfig);
});

const placeNameInput = formNewPlace.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = formNewPlace.querySelector(".popup__input_type_url");

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = cardLinkInput.value;

  renderLoading(true, addCardPopup);
  fetchNewPlaceFormSubmit(name, link)
    .then((res) => {
      placesList.prepend(
        createCard(res, likeCard, deleteCard, openCardModal, personalId)
      );
      closePopup(addCardPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, addCardPopup);
    });
}

formNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);

// change avatar form
const changeAvatarButton = document.querySelector(
  ".profile__change-avatar-button"
);
const changeAvatarPopup = document.querySelector(".popup_type_avatar");
const avatarLinkInput = document.querySelector(".popup__input_type_avatar");
const formChangeAvatar = document.forms.changeAvatar;

changeAvatarButton.addEventListener("click", () => {
  openModal(changeAvatarPopup);
  clearValidation(formChangeAvatar, validationConfig);
});

function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  const link = avatarLinkInput.value;

  renderLoading(true, changeAvatarPopup);
  fetchChangeAvatarSubmit(link)
    .then((res) => {
      avatarImage.style.backgroundImage = `url('${res.avatar}')`;
      closePopup(changeAvatarPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, changeAvatarPopup);
    });
}

formChangeAvatar.addEventListener("submit", handleChangeAvatarSubmit);

enableValidation(validationConfig);
