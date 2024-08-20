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
  }).then((res) => checkError(res));
}

export function fillInfoOnLoad() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
  }).then((res) => checkError(res));
}

export function fetchLikeCard(likeInfo) {
  return fetch(`${config.baseUrl}/cards/likes/${likeInfo._id}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
  }).then((res) => checkError(res));
}

export function fetchUnlikeCard(likeInfo) {
  return fetch(`${config.baseUrl}/cards/likes/${likeInfo._id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
  }).then((res) => checkError(res));
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
  }).then((res) => checkError(res));
}

export function fetchNewPlaceFormSubmit(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkError(res));
}

export function fetchChangeAvatarSubmit(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => checkError(res));
}

export function fetchDeleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
  }).then((res) => checkError(res));
}

function checkError(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
