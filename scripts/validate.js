/**
 * Функция, отвечающая за показ сообщения об ошибке
 * @param formElement форма
 * @param inputElement поле ввода
 * @param errorMessage сообщение ошибки
 * @param selectors объект селекторов
 */
const showInputError = (formElement, inputElement, errorMessage, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.inputActiveErrorClass);
};

/**
 * Функция, отвечающая за скрытие сообщения об ошибке
 * @param formElement форма
 * @param inputElement поле ввода
 * @param selectors объект селекторов
 */
const hideInputError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.inputActiveErrorClass);
    errorElement.textContent = '';
};

/**
 * Функция для проверки валидности поля ввода
 * @param formElement форма
 * @param inputElement поле ввода
 * @param selectors объект селекторов
 */
const checkInputValidity = (formElement, inputElement, selectors) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(formElement, inputElement, selectors);
    }
};

/**
 * Функция для проверки того, есть ли на форме невалидное поле
 * @param inputList список поле ввода
 * @returns {*} true - если есть хотя бы одно невалидное поле, false - иначе
 */
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

/**
 * Функция, меняющая состояние кнопки отправки формы в зависимости от валидности/невалидности полей ввода на форме
 * @param inputList список полей ввода
 * @param buttonElement кнопка, состояние которой будет меняться
 * @param selectors объект селекторов
 */
const toggleButtonState = (inputList, buttonElement, selectors) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
};

/**
 * Функция, отвечающая за присваивание элементам eventListeners
 * @param formElement форма
 * @param selectors объект селекторов
 */
const setEventListeners = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    // при открытии поп-апа кнопка должна быть неактивна
    toggleButtonState(inputList, buttonElement, selectors);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, selectors);
            // проверка состояния кнопки
            toggleButtonState(inputList, buttonElement, selectors);
        });
    });
};

/**
 * Функция, начинающая процесс навешивания обработчиков событий для форм
 * @param selectors объект селекторов
 */
const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, selectors);
    });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_type_inactive',
    inputErrorClass: 'popup__input_type_error',
    inputActiveErrorClass: 'form__input-error_active'
});
