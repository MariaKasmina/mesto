import {initialCards} from "./data/data_for_template.js";
import {openPopup} from "./popup.js";

const cardContainer = document.querySelector('.elements');
const popUpWithImage = document.querySelector('.popup_with_image');

/**
 * Функция отрисовки карточек
 * @param card элемент карточки
 * @param placingMethod метод вставки карточки в контейнер: в конец, в начало и т.п.
 */
export function renderCard(card, placingMethod = 'append') {
    switch (placingMethod) {
        case 'append':
            cardContainer.append(card);
            break;
        case 'prepend':
            cardContainer.prepend(card);
            break;
        default:
            throw new Error('Undefined placing elements method');
    }
}

/**
 * Функция создания эелемента карточки
 * @param title заголовок
 * @param url ссылка на картинку
 * @param desc описание картинки
 * @returns {Node} объект карточка
 */
export function createCard(title, url, desc) {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    
    cardElement.querySelector('.element__caption-text').textContent = title;
    cardElement.querySelector('.element__image').src = url;
    cardElement.querySelector('.element__image').alt = desc;

    cardElement.querySelector('.element__heart').addEventListener('click', (evt => setHeartState(evt.target)));

    cardElement.querySelector('.element__image').addEventListener('click', () => {openImagePopUp(title, url, desc)});

    cardElement.querySelector('.element__delete-btn').addEventListener('click', function () {
        cardElement.remove();
        if (document.querySelector('.element') === null) {
            renderNoCards();
        }
    });

    return cardElement;
}

/**
 * Функция для переключения состояния сердечка
 * @param target элемент, с которым взаимодействует пользователь
 */
function setHeartState(target) {
    target.classList.toggle('element__heart_active');
}

/**
 * Функция для открытия поп-апа с картинкой
 * @param title заголовок
 * @param url ссылка на картинку
 * @param description описание картинки
 */
function openImagePopUp(title, url, description) {
    const image = popUpWithImage.querySelector('.popup__image');
    image.src = url;
    image.alt = description;
    const desc = popUpWithImage.querySelector('.popup__image-description');
    desc.textContent = title;
    openPopup(popUpWithImage);
}

/**
 * Вывод на экран исходных карточек
 */
initialCards.map((card) => {
    renderCard(createCard(card.name, card.link, card.desc), 'append');
});

/**
 * Функция отрисовки текста "Добавьте карточку", когда блок с карточками пустой
 */
function renderNoCards() {
    document.querySelector('.elements__no-items').style.display = 'block';
}