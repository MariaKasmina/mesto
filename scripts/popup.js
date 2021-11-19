/**
 * Функция для действий по открытию поп-апа
 */
export function openPopup(element) {
    element.classList.add('popup_opened');
}

/**
 * Функция для закрытия поп-апа
 */
export function closePopup(element) {
    element.classList.remove('popup_opened');
}