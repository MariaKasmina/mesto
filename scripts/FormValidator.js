export class FormValidator {
    constructor(selectors, formElement) {
        this._settings = selectors;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    }

    // Функция, начинающая процесс навешивания обработчиков событий для форм
    enableValidation = () => {
        this._setEventListeners();
    };

    // Функция проверки состояния inputElement и возможного изменения состояния кнопки отправки формы
    _checkInputsAndChangeButtonState(inputElement, buttonElement, inputList) {
        this._checkInputValidity(inputElement);
        // проверка состояния кнопки
        this._toggleButtonState(inputList, buttonElement);
    }

    // Функция, отвечающая за присваивание элементам eventListeners
    _setEventListeners = () => {
        // при открытии поп-апа кнопка должна быть неактивна
        this._toggleButtonState(this._inputList, this._buttonElement);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => this._checkInputsAndChangeButtonState(inputElement, this._buttonElement, this._inputList));
        });
    };

    // Функция, меняющая состояние кнопки отправки формы в зависимости от валидности/невалидности полей ввода на форме
    _toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    // Функция для проверки того, есть ли на форме невалидное поле
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    // Функция для проверки валидности поля ввода
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    // Функция, отвечающая за скрытие сообщения об ошибке
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.inputActiveErrorClass);
        errorElement.textContent = '';
    };

    // Функция, отвечающая за показ сообщения об ошибке
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.inputActiveErrorClass);
    };

    // Функция очистки ошибок ввода
    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}

