import { likeCard, deleteCard, createCard } from "./card";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-20",
  headers: {
    authorization: "b91af8f2-857f-407b-86ef-9cd78ad6bef5",
    "Content-Type": "application/json",
  },
};

export function getInitialCards(placesList, openCardModal) {
  return fetch(config.baseUrl + "/cards", {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
    .then((result) => {
      result.forEach((cardInfo) => {
        placesList.append(
          createCard(cardInfo, likeCard, deleteCard, openCardModal)
        );
      });
    });
}

export function fillInfoOnLoad(avatarImage, profileName, profileDescription) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-20/users/me", {
    method: "GET",
    headers: {
      authorization: "b91af8f2-857f-407b-86ef-9cd78ad6bef5",
      "Content-Type": "application/json",
    },
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
    .then((res) => {
      avatarImage.style.backgroundImage = `url('${res.avatar}')`;
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    });
}

export function fetchLikeCard(likeInfo, likeButton, likeCounter) {
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
          res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        )
        .then((res) => {
          likeButton.classList.toggle("card__like-button_is-active");
          likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.error(err);
        });
}

export function fetchUnlikeCard(likeInfo, likeButton, likeCounter) {
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
          res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        )
        .then((res) => {
          likeButton.classList.toggle("card__like-button_is-active");
          likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.error(err);
        });
}
