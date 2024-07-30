export function openModal(openButton, targetPopup) {
    openButton.addEventListener('click', () => {
        targetPopup.style.display = 'flex'
        setTimeout(() => {
            targetPopup.style.opacity = '1';
        }, 0);
    })
}

export function closeModal(targetPopup) {
    targetPopup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close')) {
            closePopupSmooth(targetPopup)
        }
    })
    
    targetPopup.addEventListener('submit', () => {
        closePopupSmooth(targetPopup)
    })
    
    window.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopupSmooth(targetPopup)
        }
    })
    
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopupSmooth(targetPopup)
        }     
    })
}

function closePopupSmooth(popup) {
    popup.style.transition = "opacity 0.3s ease"
    popup.style.opacity = "0"
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

document.querySelectorAll('.popup').forEach(popup => {
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.3s ease';
});