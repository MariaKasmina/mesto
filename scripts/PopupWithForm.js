import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(selector, handleSubmitForm) {
        super();
        this._selector = selector;
        this._handleSubmitForm = handleSubmitForm;
    }

    _getInputValue(){
        let data = {};
        this._selector.querySelectorAll('.form__item').forEach((input) => {
            data[input.name] = input.value;
        });
        return data;
    }

    setEventListeners() {
        super.setEventListeners();
        this._selector.addEventListener('submit', (evt) => this._handleSubmitForm(evt));
    }

    close() {
        this._selector.querySelectorAll('.form__item').forEach((input) => {input.value = ''});
        super.close();
    }
}