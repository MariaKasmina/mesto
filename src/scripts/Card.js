export class Card {
    constructor(id, title, url, desc, likesCount, selector, userId, ownerId, handleCardClick, handleDeleteBtnClick, handlePutLike, handleDeleteLike) {
        this._id = id;
        this._title = title;
        this._url = url;
        this._description = desc;
        this._selector = selector;
        this._likes = likesCount;
        this._userId = userId;
        this._ownerId = ownerId;
        this._cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._handleCardClick = handleCardClick;
        this._handleDeleteBtnClick = handleDeleteBtnClick;
        this._handlePutLike = handlePutLike;
        this._handleDeleteLike = handleDeleteLike;
        this._deleteBtn = this._cardElement.querySelector('.element__delete-btn');
    }

    // Функция изменения состояния лайка на карточке
    _setHeartState(target) {
        if (!target.classList.contains('element__heart_active')) {
            this._handlePutLike(this._id).then((res) => {
                this._recountLikes(res);
                target.classList.toggle('element__heart_active');
            });

        } else {
            this._handleDeleteLike(this._id).then((res) => {
                this._recountLikes(res);
                target.classList.toggle('element__heart_active');
            });
        }
    }

    _recountLikes(count) {
        this._likes = count;
        this._cardElement.querySelector('.element__heart-count').textContent = this._likes;
    }

    _setEventListeners() {
        this._cardElement.querySelector('.element__heart').addEventListener('click', (evt => this._setHeartState(evt.target)));
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
        this._cardElement.querySelector('.element__heart-count').textContent = this._likes;
        if (this._userId !== this._ownerId) {
            this._deleteBtn.style.display = 'none';
        }
        this._setEventListeners();

        return this._cardElement;
    }

    removeCardItem() {
        this._cardElement.remove();
        this._cardElement = null;
    }
}