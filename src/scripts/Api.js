export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = options.headers.authorization;
    }

    getUserInfo() {
        return fetch(this._baseUrl, {
            headers: {
                authorization: `${this._token}`,
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else return Promise.reject(res.status);
        }).then((res) => {
            return {name: res.name, about: res.about, avatar: res.avatar, id: res._id}
        }).catch((err) => console.log(err));
    }

    updateUserInfo(newName, newNote){
        return fetch(this._baseUrl, {
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
            if (res.ok) {
                return res.json();
            } else return Promise.reject(res.status);
        }).then((res) => {return {name: res.name, about: res.about}}).catch((err) => console.log(err));
    }

    getInitialCards(){
        return fetch(this._baseUrl, {
            method: 'GET',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else return Promise.reject(res.status);
        }).then((res) => {return [res];}).catch((err) => console.log(err));
    }

    putNewImage(imageName, imageLink){
        return fetch(this._baseUrl, {
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
            if (res.ok) {
                return res.json();
            } else return Promise.reject(res.status);
        }).then((res) => {return res;}).catch((err) => console.log(err));
    }

    getCardsInfo(){
        return fetch(this._baseUrl, {
            method: 'GET',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else return Promise.reject(res.status);
        }).then((res) => {return res;}).catch((err) => console.log(err));
    }

    removeCard(id){
        return fetch(`${this._baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else return Promise.reject(res.status);
        });
    }

    addLike(id){
        return fetch(`${this._baseUrl}/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else return Promise.reject(res.status);
        }).then((res) => {return res.likes.length;}).catch((err) => console.log(err));
    }

    removeLike(id){
        return fetch(`${this._baseUrl}/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else return Promise.reject(res.status);
        }).then((res) => {return res.likes.length;}).catch((err) => console.log(err));
    }

    changeAvatar(avatarUrl){
        return fetch(`${this._baseUrl}/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarUrl,
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else return Promise.reject(res.status);
        }).then((res) => {return res;}).catch((err) => console.log(err));
    }
}