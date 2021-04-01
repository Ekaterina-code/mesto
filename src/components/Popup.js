export class Popup {
    constructor(selectorPopup) {
        this.popup = document.querySelector(selectorPopup);
        this._handleEscCloseWithBindedContext = this._handleEscClose.bind(this);
    }

    open() {
        this.popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscCloseWithBindedContext);
    }

    close() {
        this.popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscCloseWithBindedContext);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this.popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__overlay')) {
                this.close()
            }
            if (evt.target.classList.contains('popup__close')) {
                this.close()
            }
        })
    }
}
