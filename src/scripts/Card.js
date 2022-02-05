export class Card {
    constructor(id, title, url, desc, likes, selector, userId, ownerId, handleCardClick, handleDeleteBtnClick, handlePutLike, handleDeleteLike) {
        this._id = id;
        this._title = title;
        this._url = url;
        this._description = desc;
        this._selector = selector;
        this._likes = likes;
        this._likesCount = this._likes.length;
        this._userId = userId;
        this._ownerId = ownerId;
        this._cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._handleCardClick = handleCardClick;
        this._handleDeleteBtnClick = handleDeleteBtnClick;
        this._handlePutLike = handlePutLike;
        this._handleDeleteLike = handleDeleteLike;
        this._deleteBtn = this._cardElement.querySelector('.element__delete-btn');
        this._isLiked = this._hasLikedByCurrentUser();
    }

    // Функция изменения состояния лайка на карточке
    _setHeartState() {
        if (this._isLiked) {
            this._cardElement.querySelector('.element__heart').classList.add('element__heart_active');
        } else {
            this._cardElement.querySelector('.element__heart').classList.remove('element__heart_active');
        }
    }

    _changeHeartState() {
        if (this._isLiked) { // если лайк был
            this._handleDeleteLike(this._id).then((res) => {
                this._recountLikes(res);
                this._isLiked = false;
                this._setHeartState();
            });
        } else { // лайка не было
            this._handlePutLike(this._id).then((res) => {
                this._recountLikes(res); // выставляем новое число лайков
                this._isLiked = true; // ставим карточке состояние "лайкнута"
                this._setHeartState(); // устанавливаем новое состояние лайку
            });
        }
    }

    // проверяет, есть ли на карточке лайк текущего пользователя
    _hasLikedByCurrentUser() {
        if (this._likes.length > 0) {
            return this._likes.map((item) => item._id).indexOf(this._ownerId) >= 0;
        } else return false;
    }

    // выставляет в поле количество лайков
    _recountLikes(count) {
        this._likesCount = count;
        this._cardElement.querySelector('.element__heart-count').textContent = this._likesCount;
    }

    _setEventListeners() {
        this._cardElement.querySelector('.element__heart').addEventListener('click', () => {
            this._changeHeartState();
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({name: this._title, link: this._url, description: this._description})
        });
        this._cardElement.querySelector('.element__delete-btn').addEventListener('click', () => {
            this._handleDeleteBtnClick(this);
        });
    }

    // Функция создания карточки
    createCard() {
        this._cardElement.querySelector('.element__caption-text').textContent = this._title;
        this._cardImage.src = this._url;
        this._cardImage.alt = this._description;
        this._cardElement.querySelector('.element__heart-count').textContent = this._likes.length;
        if (this._userId !== this._ownerId) {
            this._deleteBtn.style.display = 'none';
        }
        this._hasLikedByCurrentUser();
        this._setHeartState();
        this._setEventListeners();

        return this._cardElement;
    }

    removeCardItem() {
        this._cardElement.remove();
        this._cardElement = null;
    }
}