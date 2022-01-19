import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    // Функция открытия поп-апа
    open({name, link, description}){
        super.open();
        const image = this._popup.querySelector('.popup__image');
        image.src = link;
        image.alt = description;
        const note = this._popup.querySelector('.popup__image-description');
        note.textContent = name;
    }
}