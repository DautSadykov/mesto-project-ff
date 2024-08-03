export function createCard(cardInfo, like, deleteCard, openCardModal) {
    const cardTemplate = document.querySelector('#card-template').content
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardElement.querySelector('.card__image').alt = cardInfo.name;
    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__like-button').addEventListener('click', like)
    
    openCardModal(cardElement, cardInfo)
    deleteCard(cardElement)

    return cardElement
}

export function likeCard(evt)  {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active')
    }
}

export function deleteCard(card) {
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        const cardElement = deleteButton.closest('.card');
        cardElement.remove();
    })
}



