import {openPopup} from "./popupw.js";

const popUpWithImage = document.querySelector('.popup_with_image');

export class Card {
    constructor(title, url, desc, selector) {
        this._title = title;
        this._url = url;
        this._description = desc;
        this._selector = selector;
        this._cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.element__image');
    }

    // Функция изменения состояния лайка на карточке
    _setHeartState(target) {
        target.classList.toggle('element__heart_active');
    }

    // Функция открытия поп-апа с карточкой
    _openImagePopUp() {
        const image = popUpWithImage.querySelector('.popup__image');
        image.src = this._url;
        image.alt = this._description;
        const desc = popUpWithImage.querySelector('.popup__image-description');
        desc.textContent = this._title;
        openPopup(popUpWithImage);
    }

    // Функция удаления карточки
    _removeCard(element){
        element.remove();
        if (document.querySelector('.element') === null) {
            this._renderNoCards();
        }
    }

    // Отрисовка текста при отсутствии карточек на странице
    _renderNoCards() {
        document.querySelector('.elements__no-items').style.display = 'block';
    }

    _setEventListeners(){
        this._cardElement.querySelector('.element__heart').addEventListener('click', (evt => this._setHeartState(evt.target)));
        this._cardImage.addEventListener('click', () => {this._openImagePopUp(this._title, this._url, this._description)});
        this._cardElement.querySelector('.element__delete-btn').addEventListener('click', () => this._removeCard(this._cardElement));
    }

    // Функция создания карточки
    createCard() {
        this._cardElement.querySelector('.element__caption-text').textContent = this._title;
        this._cardImage.src = this._url;
        this._cardImage.alt = this._description;
        this._setEventListeners();

        return this._cardElement;
    }
}