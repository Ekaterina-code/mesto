import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selectorPopup, submitCallback) {
        super(selectorPopup);
        this.submitCallback = submitCallback;
        this.form = this.popup.querySelector(".popup__form");
        this.inputs = this.form.querySelectorAll(".popup__input");
        this.submitButton = this.form.querySelector(".popup__button")
    }

    close() {
        super.close();
        this.form.reset();
    }

    setInputValues(inputValues) {
        this.inputs.forEach(input => input.value = inputValues.get(input.id));
    }

    setSubmitText(text) {
        this.submitButton.textContent = text;
    }

    getSubmitText() {
        return this.submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener("submit", e => {
                e.preventDefault();
                this.submitCallback(this._getInputValues(), this);
            }
        );
    }

    _getInputValues() {
        const inputValues = new Map();
        this.inputs.forEach(input => inputValues.set(input.id, input.value));
        return inputValues;
    }
}