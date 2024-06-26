// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const placesList = document.querySelector('.places__list');

function createCard(cardInfo, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardElement.querySelector('.card__image').src = cardInfo.link;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCard(deleteButton)
    })

    return cardElement
}

const deleteCard = (deleteButton) => {
    const cardElement = deleteButton.closest('.card');
    cardElement.remove();
}

initialCards.forEach((card) => {
    placesList.append(createCard(card, deleteCard));
})


