import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, handleSubmitForm) {
        super(popup);
        this._handleSubmitForm = handleSubmitForm;
    }

    // Получение данных из полей поп-апа
    getInputValue() {
        const data = {};
        this._popup.querySelectorAll('.form__item').forEach((input) => {
            data[input.name] = input.value;
        });
        return data;
    }

    // Установка слушателей событий
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this.getInputValue());
        });
    }

    // Функция закрытия поп-апа
    close() {
        this._popup.querySelectorAll('.form__item').forEach((input) => {
            input.value = ''
        });
        super.close();
    }

    setSubmitAction(action){
        this._handleSubmitForm = action;
    }
}