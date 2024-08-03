export function openModal(targetPopup) {
    targetPopup.classList.add('popup_is-opened')
    document.addEventListener('keydown', closeOnKeyDown)
}
    
export function openCardModal(cardElement, cardInfo) {
    const cardImage = cardElement.querySelector('.card__image')
    const cardPopup = document.querySelector('.popup_type_image')
    cardImage.addEventListener('click', () => openModal(cardPopup))
    cardPopup.querySelector('.popup__image').src = cardInfo.link
    cardPopup.querySelector('.popup__caption').textContent = cardInfo.name
    document.addEventListener('keydown', closeOnKeyDown)
}


export function closePopupByOverlay(evt) {
    if (evt.target.classList.contains("popup")) { 
        closePopup(evt.target); 
    }
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeOnKeyDown)
}

export function closeOnKeyDown(evt) { 
    if (evt.key === 'Escape') { 
        closePopup(document.querySelector('.popup_is-opened'))
    }      
}