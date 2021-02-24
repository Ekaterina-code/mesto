function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(form => {
        const button = form.querySelector(settings.submitButtonSelector);
        const inputs = form.querySelectorAll(settings.inputSelector);
        inputs.forEach(input => {
            input.addEventListener("input", () => validate(form, input, inputs, button, settings));
        });
        form.addEventListener('reset', () => resetFormValidation(form, inputs, button, settings));
    })
}

function resetFormValidation(form, inputs, button, settings)
{
    inputs.forEach(input =>{
        const errorElement = getErrorElement(form, input);
        hideInputError(errorElement, input, settings.inputErrorClass, settings.errorClass)
    });
    validateForm(form, inputs, button, settings.inactiveButtonClass);
}

function validate(form, input, inputs, button, settings) {
    const errorElement = getErrorElement(form, input);
    if (!input.validity.valid) {
        showInputError(errorElement, input, settings.inputErrorClass, settings.errorClass);
    } else {
        hideInputError(errorElement, input, settings.inputErrorClass, settings.errorClass);
    }
    validateForm(form, inputs, button, settings.inactiveButtonClass);
}

function getErrorElement(form, input) {
    return form.querySelector(`.${input.id}-error`);
}

function showInputError(errorElement, inputElement, inputErrorClass, errorClass) {
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(errorElement, inputElement, inputErrorClass, errorClass) {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

function validateForm(form, inputs, button, inactiveButtonClass) {
    let isValidForm = true;
    inputs.forEach(input => {
        isValidForm = isValidForm && input.validity.valid;
    });
    if (isValidForm) {
        button.classList.remove(inactiveButtonClass);
    }
    else {
        button.classList.add(inactiveButtonClass);
    }
}
