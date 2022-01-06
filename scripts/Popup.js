const popups = document.querySelectorAll('.popup');
const closeBtns = document.querySelectorAll('.popup__close-button');

export default class Popup{
    constructor(selector) {
        this._selector = selector;
    }

    open() {
        this._selector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            this.close(openedPopup);
        }
    }

    setEventListeners(){
        popups.forEach((popup) => {
            popup.addEventListener('click', (evt) => {
                if (evt.target.classList.contains('popup_opened')) {
                    this.close(popup);
                }
            });
        });

        closeBtns.forEach((btn) => {
            btn.addEventListener('click', (evt) => {
                    this.close();
            });
        });
    }
}