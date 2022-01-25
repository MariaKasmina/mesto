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
            return {name: res.name, about: res.about, avatar: res.avatar}
        }).catch((err) => console.log(err));
    }
}