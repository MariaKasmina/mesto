import {openPopup} from "./popup.js";

export class Card {
    _popUpWithImage = document.querySelector('.popup_with_image');

    constructor(title, url, desc, selector) {
        this.title = title;
        this.url = url;
        this.description = desc;
        this.selector = selector;
    }

    // Функция изменения состояния лайка на карточке
    _setHeartState(target) {
        target.classList.toggle('element__heart_active');
    }

    // Функция открытия поп-апа с карточкой
    _openImagePopUp() {
        const image = this._popUpWithImage.querySelector('.popup__image');
        image.src = this.url;
        image.alt = this.description;
        const desc = this._popUpWithImage.querySelector('.popup__image-description');
        desc.textContent = this.title;
        openPopup(this._popUpWithImage);
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

    // Функция создания карточки
    createCard() {
        const cardTemplate = document.querySelector(this.selector).content;
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        cardElement.querySelector('.element__caption-text').textContent = this.title;
        cardElement.querySelector('.element__image').src = this.url;
        cardElement.querySelector('.element__image').alt = this.description;

        cardElement.querySelector('.element__heart').addEventListener('click', (evt => this._setHeartState(evt.target)));

        cardElement.querySelector('.element__image').addEventListener('click', () => {this._openImagePopUp(this.title, this.url, this.description)});

        cardElement.querySelector('.element__delete-btn').addEventListener('click', () => this._removeCard(cardElement));

        return cardElement;
    }
}