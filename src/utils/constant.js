export const apiOptions = {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
    headers: {
        authorization: "924721bb-884c-4ec6-8021-01d6ed242f97",
        'Content-Type': 'application/json'
    }
}

export const formsValidationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export const profileEditFormInputsId = {
    name: "profile-title",
    info: "profile-subtitle",
}

export const commitDeleteCardFormInputsId = {
    cardId: "card-id",
}

export const userInfoSelectors = {
    nameElement: ".profile__title",
    infoElement: ".profile__subtitle",
    avatarElement: ".profile__avatar",
}