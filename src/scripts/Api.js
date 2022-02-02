export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = options.headers.authorization;
    }

    // получение информации пользователя в формате name: res.name, about: res.about, avatar: res.avatar, id: res._id
    getUserInfo() {
        return fetch(`${this._baseUrl}/cohort-34/users/me`, {
            headers: {
                authorization: `${this._token}`,
            }
        }).then((res) => {
            return this._getResponseData(res);
        }).then((res) => {
            return {name: res.name, about: res.about, avatar: res.avatar, id: res._id}
        });
    }

    // обновление информации пользователя
    updateUserInfo(newName, newNote){
        return fetch(`${this._baseUrl}/cohort-34/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                about: newNote
            })
        }).then((res) => {
            return this._getResponseData(res);
        }).then((res) => {return {name: res.name, about: res.about}});
    }

    // получение начальных карточек
    getInitialCards(){
        return fetch(`${this._baseUrl}/cohort-34/cards`, {
            method: 'GET',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return this._getResponseData(res);
        }).then((res) => {return [res];});
    }

    // добавление новой карточки
    putNewImage(imageName, imageLink){
        return fetch(`${this._baseUrl}/cohort-34/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: imageName,
                link: imageLink
            })
        }).then((res) => {
            return this._getResponseData(res);
        }).then((res) => {return res;});
    }

    // получение данных карточек
    getCardsInfo(){
        return fetch(`${this._baseUrl}/cohort-34/cards`, {
            method: 'GET',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return this._getResponseData(res);
        }).then((res) => {return res;});
    }

    // удаление карточки по id
    removeCard(id){
        return fetch(`${this._baseUrl}/cohort-34/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    // добавление карточке лайка по id
    addLike(id){
        return fetch(`${this._baseUrl}/cohort-34/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return this._getResponseData(res);
        }).then((res) => {return res.likes.length;});
    }

    // удаление лайка по id
    removeLike(id){
        return fetch(`${this._baseUrl}/cohort-34/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return this._getResponseData(res);
        }).then((res) => {return res.likes.length;});
    }

    // изменение аватара
    changeAvatar(avatarUrl){
        return fetch(`${this._baseUrl}/cohort-34/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarUrl,
            })
        }).then((res) => {
            return this._getResponseData(res);
        }).then((res) => {return res;});
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}