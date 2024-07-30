import { closeModal } from './modal.js';

const deleteCard = (deleteButton) => {
    const cardElement = deleteButton.closest('.card');
    cardElement.remove();
}

export function createCard(cardInfo, like) {
    const cardTemplate = document.querySelector('#card-template').content
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardElement.querySelector('.card__image').alt = cardInfo.name;
    cardElement.querySelector('.card__image').src = cardInfo.link;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCard(deleteButton)
    })
    
    const cardImage = cardElement.querySelector('.card__image')
    const cardPopup = document.querySelector('.popup_type_image')
    cardImage.addEventListener('click', () => {
        cardPopup.style.display = 'flex'
        setTimeout(() => {
            cardPopup.style.opacity = '1';
        }, 0);
        cardPopup.querySelector('.popup__image').src = cardInfo.link
        cardPopup.querySelector('.popup__caption').textContent = cardInfo.name
    })

    like(cardElement)
    closeModal(cardPopup)    
    return cardElement
}

export function likeCard(card)  {
    card.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__like-button')) {
            evt.target.classList.toggle('card__like-button_is-active')
        }
    })
}



