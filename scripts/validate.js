function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(form => {
        const inputs = form.querySelectorAll(settings.inputSelector);
        inputs.forEach(input => input.addEventListener("input", () => validate(form, input, settings)));

        form.addEventListener('reset', () => resetFormValidation(form, inputs, settings));
    })
}

function resetFormValidation(form, inputs, settings)
{
    inputs.forEach(input =>{
        const errorElement = getErrorElement(form, input);
        hideInputError(errorElement, input, settings.inputErrorClass, settings.errorClass)
    });
    validateForm(form, settings.inputSelector, settings.submitButtonSelector,  settings.inactiveButtonClass);
}


function validate(form, input, settings) {
    const errorElement = getErrorElement(form, input);
    if (!input.validity.valid) {
        showInputError(errorElement, input, settings.inputErrorClass, settings.errorClass);
    } else {
        hideInputError(errorElement, input, settings.inputErrorClass, settings.errorClass);
    }
    validateForm(form, settings.inputSelector, settings.submitButtonSelector,  settings.inactiveButtonClass);
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

function validateForm(form, inputSelector, submitButtonSelector, inactiveButtonClass) {
    const inputs = form.querySelectorAll(inputSelector);
    let isValidForm = true;
    inputs.forEach(input => {
        isValidForm = isValidForm & input.validity.valid;
    });
    const button = form.querySelector(submitButtonSelector);
    if (isValidForm) {
        button.classList.remove(inactiveButtonClass);
    }
    else {
        button.classList.add(inactiveButtonClass);
    }
}
