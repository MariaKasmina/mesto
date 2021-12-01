/**
 * Функция для действий по открытию поп-апа
 */
export function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

/**
 * Функция для закрытия поп-апа
 */
export function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

/**
 * Закрытие поп-апа кликом на esc
 */
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}