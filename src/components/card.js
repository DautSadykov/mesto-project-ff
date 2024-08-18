export function createCard(cardInfo, like, deleteCard, openCardModal) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardElement.querySelector(".card__title").textContent = cardInfo.name;
  cardElement.querySelector(".card__image").alt = cardInfo.name;
  cardElement.querySelector(".card__image").src = cardInfo.link;

  renderActiveLike(cardInfo, likeButton);
  likeButton.addEventListener("click", (evt) =>
    like(evt, cardInfo, likeButton, likeCounter)
  );
  likeCounter.textContent = cardInfo.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton, cardInfo._id);
  });
  if (cardInfo.owner._id !== "7dda96ba60d1cabf61e4db4a") {
    deleteButton.classList.add("card_delete-button_disabled");
  }

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", () => openCardModal(cardInfo));

  return cardElement;
}

function renderActiveLike(cardInfo, likeButton) {
  if (
    cardInfo.likes.some((like) => {
      return like._id === "7dda96ba60d1cabf61e4db4a";
    })
  ) {
    likeButton.classList.add("card__like-button_is-active");
  }
}

export function likeCard(evt, likeInfo, likeButton, likeCounter) {
  const iHaveLiked = likeButton.classList.contains(
    "card__like-button_is-active"
  );

  if (!iHaveLiked) {
    fetch(
      `https://nomoreparties.co/v1/wff-cohort-20/cards/likes/${likeInfo._id}`,
      {
        method: "PUT",
        headers: {
          authorization: "b91af8f2-857f-407b-86ef-9cd78ad6bef5",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) =>
        res.ok() ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    fetch(
      `https://nomoreparties.co/v1/wff-cohort-20/cards/likes/${likeInfo._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: "b91af8f2-857f-407b-86ef-9cd78ad6bef5",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) =>
        res.ok() ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
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
  fetch(`https://nomoreparties.co/v1/wff-cohort-20/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "b91af8f2-857f-407b-86ef-9cd78ad6bef5",
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.error(err);
  });
  cardElement.remove();
}
