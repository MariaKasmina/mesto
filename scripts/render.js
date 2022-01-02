import {initialCards} from "./data/data_for_template.js";
import {Card} from "./Card.js";

const cardContainer = document.querySelector('.elements');

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
 * Вывод на экран исходных карточек
 */
initialCards.map((card) => {
    renderCard(new Card(card.name, card.link, card.desc, '#element-template').createCard(), 'append');
});