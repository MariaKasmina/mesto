export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._initialArray = items;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addInitialItems(array){
        this._initialArray = array;
    }

    // Функция отрисовки карточек
    renderItems() {
        this._initialArray.forEach((item) => {
            this._renderer(item);
        });
    }

    // Функция добавления карточки
    addItem(element, placingMethod) {
        switch (placingMethod) {
            case 'append':
                this._container.append(element);
                break;
            case 'prepend':
                this._container.prepend(element);
                break;
            default:
                throw new Error('Undefined placing method');
        }
    }
}