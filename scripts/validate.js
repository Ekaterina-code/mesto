import {FormValidator} from "./formvalidator.js";

export function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(form => {
        const formValidator = new FormValidator(settings, form);
        formValidator.enableValidation();
    })
}
