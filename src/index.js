import './pages/index.css';
// import { getCards } from './cards.js'
import { createCard } from './components/card.js';
import { openModal,
    closePopupByOverlay,
    closePopup,
} from './components/modal.js';
import { likeCard, deleteCard } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup')

fetch('https://nomoreparties.co/v1/wff-cohort-20/cards', {
    headers: {
    authorization: 'b91af8f2-857f-407b-86ef-9cd78ad6bef5'
    }
})
    .then(res => res.json())
    .then((result) => {
        result.forEach((cardInfo) => {
            placesList.append(createCard(cardInfo, likeCard, deleteCard, openCardModal));
        })
    }); 

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
fillEditInputArea()

editButton.addEventListener('click', () => {
    openModal(editPopup)
    fillEditInputArea()
    clearValidation(formEdit, validationConfig);
})

function fillEditInputArea() {
    nameInput.value = document.querySelector('.profile__title').textContent
    jobInput.value = document.querySelector('.profile__description').textContent
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value
    const job = jobInput.value
    const profileName = document.querySelector('.profile__title')
    const profileDescription = document.querySelector('.profile__description')
    fetch('https://nomoreparties.co/v1/wff-cohort-20/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'b91af8f2-857f-407b-86ef-9cd78ad6bef5',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then(res => res.json())
    .then(res => {
        profileName.textContent = res.name
        profileDescription.textContent = res.about
    })
    closePopup(editPopup)
}

formEdit.addEventListener('submit', handleEditFormSubmit);

// form2

const addCardButton = document.querySelector('.profile__add-button')
const addCardPopup = document.querySelector('.popup_type_new-card')

addCardButton.addEventListener('click', () => {
    openModal(addCardPopup)
    clearValidation(formNewPlace, validationConfig);
})

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

enableValidation(validationConfig);


///

// fetch('https://nomoreparties.co/v1/wff-cohort-20/cards', {
//     method: 'POST',
//     headers: {
//         authorization: 'b91af8f2-857f-407b-86ef-9cd78ad6bef5',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         name: 'Baikal',
//         link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/%D0%9C%D1%8B%D1%81_%D0%9B%D1%83%D0%B4%D0%B0%D1%80%D1%8C%2C_17_%D0%B8%D1%8E%D0%BD%D1%8F_2013_%D0%B3%D0%BE%D0%B4%D0%B0.jpg/420px-%D0%9C%D1%8B%D1%81_%D0%9B%D1%83%D0%B4%D0%B0%D1%80%D1%8C%2C_17_%D0%B8%D1%8E%D0%BD%D1%8F_2013_%D0%B3%D0%BE%D0%B4%D0%B0.jpg'
//     })
// })
//     .then(res => res.json())
//     .then(res => {
//         console.log(res)
//     })
