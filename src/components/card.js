import { fetchDeleteCard, fetchLikeCard, fetchUnlikeCard } from "./api";

export function createCard(
  cardInfo,
  like,
  deleteCard,
  openCardModal,
  personalId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardElement.querySelector(".card__title").textContent = cardInfo.name;
  cardElement.querySelector(".card__image").alt = cardInfo.name;
  cardElement.querySelector(".card__image").src = cardInfo.link;

  renderActiveLike(cardInfo, likeButton, personalId);
  likeButton.addEventListener("click", () =>
    like(cardInfo, likeButton, likeCounter)
  );
  likeCounter.textContent = cardInfo.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardInfo.owner._id !== personalId) {
    deleteButton.classList.add("card_delete-button_disabled");
  }
  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton, cardInfo._id);
  });

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", () => openCardModal(cardInfo));

  return cardElement;
}

function renderActiveLike(cardInfo, likeButton, personalId) {
  if (
    cardInfo.likes.some((like) => {
      return like._id === personalId;
    })
  ) {
    likeButton.classList.add("card__like-button_is-active");
  }
}

export function likeCard(likeInfo, likeButton, likeCounter) {
  const iHaveLiked = likeButton.classList.contains(
    "card__like-button_is-active"
  );

  if (!iHaveLiked) {
    fetchLikeCard(likeInfo)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    fetchUnlikeCard(likeInfo)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export function deleteCard(deleteButton, id) {
  const cardElement = deleteButton.closest(".card");
  fetchDeleteCard(id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(err);
    });
}
