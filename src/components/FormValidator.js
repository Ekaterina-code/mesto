export class FormValidator {
    constructor(settings, form) {
        this.settings = settings;
        this.form = form;
        this.button = this.form.querySelector(this.settings.submitButtonSelector);
        this.inputs = Array.from(this.form.querySelectorAll(this.settings.inputSelector));
    }

    enableValidation() {
        this.inputs.forEach(input => {
            input.addEventListener("input", () => this._validate(input));
        });
        this.form.addEventListener('reset', () => this._resetFormValidation());
        this._validateForm();
    }

    _resetFormValidation() {
        this.inputs.forEach(input => {
            const errorElement = this._getErrorElement(input);
            this._hideInputError(errorElement, input)
        });
        this._validateForm();
    }

    _validate(input) {
        const errorElement = this._getErrorElement(input);
        if (!input.validity.valid) {
            this._showInputError(errorElement, input);
        } else {
            this._hideInputError(errorElement, input);
        }
        this._validateForm();
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

    _validateForm() {
        let isValidForm = this._validateInputs();
        this._setSubmitButtonState(!isValidForm);
    }

    _setSubmitButtonState(isDisabled) {
        this.button.disabled = isDisabled;
        this.button.classList.toggle(this.settings.inactiveButtonClass, isDisabled);
    }

    _validateInputs() {
        return this.inputs.reduce((previousValue, input) => previousValue && input.validity.valid, true);
    }
}