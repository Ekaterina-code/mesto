import {Popup} from "./Popup.js";

export class PopupWithDialog extends Popup {
    constructor(selectorPopup, buttonCallback) {
        super(selectorPopup);
        this.button = this.popup.querySelector(".popup__button");
        this.buttonCallback = buttonCallback;
    }

    open(context) {
        this.context = context;
        super.open();
    }

    getButtonText() {
        return this.button.textContent;
    }

    setButtonText(text) {
        this.button.textContent = text;
    }

    setEventListeners() {
        super.setEventListeners();
        this.button.addEventListener("click", () => this.buttonCallback(this.context, this));
    }
}
