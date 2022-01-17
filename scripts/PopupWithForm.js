import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(selector, handleSubmitForm) {
        super();
        this._selector = selector;
        this._handleSubmitForm = handleSubmitForm;
    }
    // Получение данных из полей поп-апа
    _getInputValue(){
        let data = {};
        this._selector.querySelectorAll('.form__item').forEach((input) => {
            data[input.name] = input.value;
        });
        return data;
    }

    // Установка слушателей событий
    setEventListeners() {
        super.setEventListeners();
        this._selector.addEventListener('submit', (evt) => this._handleSubmitForm(evt));
    }

    // Функция закрытия поп-апа
    close() {
        this._selector.querySelectorAll('.form__item').forEach((input) => {input.value = ''});
        super.close();
    }
}