import {Card} from "../components/Card.js";
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {enableValidation} from "../components/Validate.js";
import './index.css';

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

const formsValidationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const profileEditFormInputsId = {
    name: "profile-title",
    info: "profile-subtitle"
}

const userInfoSelectors = {
    nameElement: ".profile__title",
    infoElement: ".profile__subtitle",
}

const sectionSettings = {
    items: initialCards,
    renderer: renderItem
}

const userInfo = new UserInfo(userInfoSelectors);
const section = new Section(sectionSettings, ".elements");
const popupWithImage = new PopupWithImage(".view-popup");
const appCardPopup = new PopupWithForm(".add-card-popup", handleAddCardSubmit);
const profileEditPopup = new PopupWithForm(".profile-popup", handleProfileEdit);

const profileEditButton = document.querySelector(".profile__edit");
const elementAddButton = document.querySelector(".profile__add-button");

function handleProfileEdit(inputsMap) {
    const info = {
        name: inputsMap.get(profileEditFormInputsId.name),
        info: inputsMap.get(profileEditFormInputsId.info)
    }
    userInfo.setUserInfo(info)
}

function handleAddCardSubmit(inputsMap) {
    const item = {
        name: inputsMap.get("add-card-name"),
        link: inputsMap.get("add-card-link")
    }
    const element = renderItem(item);
    section.addItem(element);
}

function openProfileEdit() {
    profileEditPopup.open()
    const info = userInfo.getUserInfo();
    const inputValues = new Map([
        [profileEditFormInputsId.name, info.name],
        [profileEditFormInputsId.info, info.info],
    ]);
    profileEditPopup.setInputValues(inputValues)
}

function renderItem(item) {
    return new Card("#element-template", item.link, item.name, popupWithImage.open.bind(popupWithImage)).getElement();
}

function initialize() {
    elementAddButton.addEventListener("click", () => appCardPopup.open());
    profileEditButton.addEventListener("click", openProfileEdit);
    profileEditPopup.setEventListeners();
    appCardPopup.setEventListeners();
    popupWithImage.setEventListeners();
    enableValidation(formsValidationSettings);
    section.render();
}

initialize();