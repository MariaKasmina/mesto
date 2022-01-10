export default class Section {
    constructor({items, renderer}, containerSelector, placingMethod='append') {
        this._initialArray = items;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
        this._placingMethod = placingMethod;
    }

    renderItems() {
        this._initialArray.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(element) {
        switch (this._placingMethod) {
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