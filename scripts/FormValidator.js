export class FormValidator {
    constructor(selectors, formElement) {
        this.settings = selectors;
        this.formElement = formElement;
    }

    // Функция, начинающая процесс навешивания обработчиков событий для форм
    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll(this.settings.formSelector));
        formList.forEach((formElement) => {
            this._setEventListeners(formElement);
        });
    };

    // Функция проверки состояния inputElement и возможного изменения состояния кнопки отправки формы
    _checkInputsAndChangeButtonState(inputElement, buttonElement, inputList){
        this._checkInputValidity(inputElement);
        // проверка состояния кнопки
        this._toggleButtonState(inputList, buttonElement);
    }

    // Функция, отвечающая за присваивание элементам eventListeners
    _setEventListeners = () => {
        const inputList = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector));
        const buttonElement = this.formElement.querySelector(this.settings.submitButtonSelector);
        // при открытии поп-апа кнопка должна быть неактивна
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => this._checkInputsAndChangeButtonState(inputElement, buttonElement, inputList));
        });
    };

    // Функция, меняющая состояние кнопки отправки формы в зависимости от валидности/невалидности полей ввода на форме
    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.settings.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this.settings.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    // Функция для проверки того, есть ли на форме невалидное поле
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    // Функция для проверки валидности поля ввода
    _checkInputValidity = (inputElement) => {
        console.log(inputElement)
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    // Функция, отвечающая за скрытие сообщения об ошибке
    _hideInputError = (inputElement) => {
        const errorElement = this.formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this.settings.inputErrorClass);
        errorElement.classList.remove(this.settings.inputActiveErrorClass);
        errorElement.textContent = '';
    };

    // Функция, отвечающая за показ сообщения об ошибке
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this.formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this.settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.settings.inputActiveErrorClass);
    };
}

