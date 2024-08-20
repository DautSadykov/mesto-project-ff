export function openModal(targetPopup) {
  targetPopup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnKeyDown);
}

export function closePopupByOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnKeyDown);
}

export function closeOnKeyDown(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}
