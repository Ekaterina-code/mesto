export class FormValidator {
    constructor(settings, form) {
        this.settings = settings;
        this.form = form;
    }

    enableValidation() {
        const button = this.form.querySelector(this.settings.submitButtonSelector);
        const inputs = this.form.querySelectorAll(this.settings.inputSelector);
        inputs.forEach(input => {
            input.addEventListener("input", () => this._validate(input, inputs, button));
        });
        this.form.addEventListener('reset', () => this._resetFormValidation(inputs, button));
    }

    _resetFormValidation(inputs, button) {
        inputs.forEach(input => {
            const errorElement = this._getErrorElement(input);
            this._hideInputError(errorElement, input)
        });
        this._validateForm(inputs, button);
    }

    _validate(input, inputs, button) {
        const errorElement = this._getErrorElement(input);
        if (!input.validity.valid) {
            this._showInputError(errorElement, input);
        } else {
            this._hideInputError(errorElement, input);
        }
        this._validateForm(inputs, button);
    }

    _getErrorElement(input) {
        return this.form.querySelector(`.${input.id}-error`);
    }

    _showInputError(errorElement, inputElement) {
        inputElement.classList.add(this.settings.inputErrorClass);
        errorElement.classList.add(this.settings.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(errorElement, inputElement) {
        inputElement.classList.remove(this.settings.inputErrorClass);
        errorElement.classList.remove(this.settings.errorClass);
        errorElement.textContent = '';
    }

    _validateForm(inputs, button) {
        let isValidForm = true;
        inputs.forEach(input => {
            isValidForm = isValidForm && input.validity.valid;
        });
        if (isValidForm) {
            button.classList.remove(this.settings.inactiveButtonClass);
        } else {
            button.classList.add(this.settings.inactiveButtonClass);
        }
    }
}