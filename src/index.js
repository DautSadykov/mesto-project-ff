import './pages/index.css';
import { initialCards } from './cards.js'
import { createCard } from './components/card.js';
import { openModal,
        closePopupByOverlay,
        closePopup,
} from './components/modal.js';
import { likeCard, deleteCard } from './components/card.js';


const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.classList.add('popup_is-animated')
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
    
    window.addEventListener('click', (evt) => {
        closePopupByOverlay(evt)
    })
})

initialCards.forEach((cardInfo) => {
    placesList.append(createCard(cardInfo, likeCard, deleteCard, openCardModal));
})


export function openCardModal(cardInfo) {
    const cardPopup = document.querySelector('.popup_type_image');
    cardPopup.querySelector('.popup__image').src = cardInfo.link
    cardPopup.querySelector('.popup__caption').textContent = cardInfo.name
    openModal(cardPopup)
}


// form1
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const formEdit = document.forms.editProfile
const nameInput = formEdit.querySelector('.popup__input_type_name')
const jobInput = formEdit.querySelector('.popup__input_type_description')

editButton.addEventListener('click', () => {
    openModal(editPopup)
    nameInput.value = document.querySelector('.profile__title').textContent
    jobInput.value = document.querySelector('.profile__description').textContent
})

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value
    const job = jobInput.value
    const profileName = document.querySelector('.profile__title')
    const profileDescription = document.querySelector('.profile__description')
    profileName.textContent = name
    profileDescription.textContent = job
    closePopup(editPopup)
}

formEdit.addEventListener('submit', handleEditFormSubmit);

// form2

const addCardButton = document.querySelector('.profile__add-button')
const addCardPopup = document.querySelector('.popup_type_new-card')

addCardButton.addEventListener('click', () => openModal(addCardPopup))

const formNewPlace = document.forms.newPlace
const placeNameInput = formNewPlace.querySelector('.popup__input_type_card-name')
const cardLinkInput = formNewPlace.querySelector('.popup__input_type_url')

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    const name = placeNameInput.value
    const link = cardLinkInput.value
    const cardInfo = {name, link}
    placesList.prepend(createCard(cardInfo, likeCard, deleteCard, openCardModal, closePopup))
    closePopup(addCardPopup)
    evt.target.reset()
}

formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);
