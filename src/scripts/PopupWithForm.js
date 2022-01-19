import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popup, handleSubmitForm) {
        super(popup);
        this._handleSubmitForm = handleSubmitForm;
    }
    // Получение данных из полей поп-апа
    getInputValue(){
        const data = {};
        this._popup.querySelectorAll('.form__item').forEach((input) => {
            data[input.name] = input.value;
        });
        return data;
    }

    // Установка слушателей событий
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => this._handleSubmitForm(evt));
    }

    // Функция закрытия поп-апа
    close() {
        this._popup.querySelectorAll('.form__item').forEach((input) => {input.value = ''});
        super.close();
    }
}