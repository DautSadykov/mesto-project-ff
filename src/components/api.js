import { likeCard, deleteCard, createCard } from "./card";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-20",
  headers: {
    authorization: "b91af8f2-857f-407b-86ef-9cd78ad6bef5",
    "Content-Type": "application/json",
  },
};

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
}

export function fillInfoOnLoad() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
}

export function fetchLikeCard(likeInfo) {
    return fetch(
        `${config.baseUrl}/cards/likes/${likeInfo._id}`,
        {
          method: "PUT",
          headers: {
            authorization: config.headers.authorization,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) =>
          res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        )
}



export function fetchUnlikeCard(likeInfo) {
    return fetch(
        `${config.baseUrl}/cards/likes/${likeInfo._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: config.headers.authorization,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) =>
          res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        )
}

export function fetchEditFormSubmit(name, job) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: config.headers.authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          about: job,
        }),
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
}

export function fetchNewPlaceFormSubmit(name, link) {
    return fetch("https://nomoreparties.co/v1/wff-cohort-20/cards", {
        method: "POST",
        headers: {
          authorization: "b91af8f2-857f-407b-86ef-9cd78ad6bef5",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
}

export function fetchChangeAvatarSubmit(link) {
    return fetch("https://nomoreparties.co/v1/wff-cohort-20/users/me/avatar", {
        method: "PATCH",
        headers: {
            authorization: "b91af8f2-857f-407b-86ef-9cd78ad6bef5",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: link,
        }),
    })
    .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
}

export function fetchDeleteCard(id) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-20/cards/${id}`, {
        method: "DELETE",
        headers: {
          authorization: "b91af8f2-857f-407b-86ef-9cd78ad6bef5",
          "Content-Type": "application/json",
        },
      })
}
