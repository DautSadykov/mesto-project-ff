import './pages/index.css';
import { initialCards } from './cards.js'
import { createCard } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
import { likeCard } from './components/card.js';


const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button')
const addCardPopup = document.querySelector('.popup_type_new-card')


initialCards.forEach((card) => {
    placesList.append(createCard(card, likeCard));
})

openModal(editButton, editPopup)
closeModal(editPopup)
openModal(addCardButton, addCardPopup)
closeModal(addCardPopup)



// form1
const formEdit = document.forms.editProfile
const nameInput = formEdit.querySelector('.popup__input_type_name')
const jobInput = formEdit.querySelector('.popup__input_type_description')

nameInput.value = document.querySelector('.profile__title').textContent
jobInput.value = document.querySelector('.profile__description').textContent

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value
    const job = jobInput.value
    const profileName = document.querySelector('.profile__title')
    const profileDescription = document.querySelector('.profile__description')
    profileName.textContent = name
    profileDescription.textContent = job
    console.log(1)
    closeModal(editPopup)
}

formEdit.addEventListener('submit', handleEditFormSubmit);

// form2

const formNewPlace = document.forms.newPlace
const placeNameInput = formNewPlace.querySelector('.popup__input_type_card-name')
const cardLinkInput = formNewPlace.querySelector('.popup__input_type_url')

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    const name = placeNameInput.value
    const link = cardLinkInput.value
    const cardInfo = {name, link}
    placesList.prepend(createCard(cardInfo, likeCard))
}

formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);
