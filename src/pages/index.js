import {Api} from "../components/Api.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "./FormValidator.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Section} from "../components/Section.js";
import {UserInfo} from "../components/UserInfo.js";
import * as constants from "../utils/constant.js";
import './index.css';

const api = new Api(constants.apiOptions);
const userInfo = new UserInfo(constants.userInfoSelectors);
const popupWithImage = new PopupWithImage(".view-popup");
const profileEditPopup = new PopupWithForm(".profile-popup", handleProfileEdit);
const avatarEditPopup = new PopupWithForm(".avatar-popup", handleAvatarEdit);
const commitDeleteCardPopup = new PopupWithForm(".commit-popup", handleDeleteCard);

const profileEditButton = document.querySelector(".profile__edit");
const avatarEditButton = document.querySelector(".profile__avatar-button");
const elementAddButton = document.querySelector(".profile__add-button");

function handleFormPopupPromise(popup, promise, loaderText) {
    const currentText = popup.getSubmitText();
    popup.setSubmitText(loaderText)
    promise()
        .then(() => popup.close())
        .catch(handleError)
        .finally(() => popup.setSubmitText(currentText));
}

function handleProfileEdit(inputsMap, popup) {
    const info = {
        name: inputsMap.get(constants.profileEditFormInputsId.name),
        info: inputsMap.get(constants.profileEditFormInputsId.info)
    }
    const setUserInfo = () => api.setUserInfo(info).then(userInfo.setUserInfo.bind(userInfo));
    handleFormPopupPromise(popup, setUserInfo, "Сохранение...");
}

function handleAvatarEdit(inputsMap, popup) {
    const avatar = inputsMap.get("profile-avatar");
    const setUserAvatar = () => api.setUserAvatar(avatar).then(() => userInfo.setAvatar(avatar));
    handleFormPopupPromise(popup, setUserAvatar, "Сохранение...");
}

function handleAddCardSubmit(inputsMap, section, userId, popup) {
    const cardInfo = {
        name: inputsMap.get("add-card-name"),
        link: inputsMap.get("add-card-link")
    }
    const addCard = () => api.addCard(cardInfo).then(item => section.addItem(item));
    handleFormPopupPromise(popup, addCard, "Сохранение...");
}

function handleDeleteCard(inputsMap, popup) {
    const cardId = inputsMap.get(constants.commitDeleteCardFormInputsId.cardId);
    const delCard = ()=> api.removeCard(cardId).then(() => document.querySelector("#card_" + cardId).remove());
    handleFormPopupPromise(popup, delCard, "Удаление...");
}

function openProfileEdit() {
    const info = userInfo.getUserInfo();
    const inputValues = new Map([
        [constants.profileEditFormInputsId.name, info.name],
        [constants.profileEditFormInputsId.info, info.info],
    ]);
    profileEditPopup.setInputValues(inputValues);
    profileEditPopup.open();
}

function renderItem(item, myId) {
    const cardInfo = {
        _id: item._id,
        name: item.name,
        link: item.link,
        likesInfo: createLikeInfo(item.likes, myId),
        isDeleteEnable: item.ownerId == myId,
    }
    const handleCardClick = popupWithImage.open.bind(popupWithImage);
    const handleLikeClick = (card, state) => {
        return api.setCardLikeState(card._id, state)
            .then(res => card.setLikeInfo(createLikeInfo(res, myId)))
            .catch(handleError);
    };

    const handleDelClick = (cardId) => {
        const inputs = new Map([[constants.commitDeleteCardFormInputsId.cardId, cardId]])
        commitDeleteCardPopup.setInputValues(inputs);
        commitDeleteCardPopup.open();
    }
    const card = new Card("#element-template", cardInfo, handleCardClick, handleLikeClick, handleDelClick);
    return card.render();
}

function createLikeInfo(likes, myId) {
    const state = likes.indexOf(myId) >= 0
    return {
        state: state,
        count: likes.length,
    };
}

function handleError(err) {
    console.log(err);
}

function initialize() {
    profileEditButton.addEventListener("click", openProfileEdit);
    avatarEditButton.addEventListener("click", () => avatarEditPopup.open());
    commitDeleteCardPopup.setEventListeners();
    profileEditPopup.setEventListeners();
    avatarEditPopup.setEventListeners();
    popupWithImage.setEventListeners();
    enableValidation(constants.formsValidationSettings);

    api.getUserInfo()
        .then(initializeUserInfo)
        .then(initializeCards)
        .catch(handleError);
}

function initializeUserInfo(info) {
    userInfo.setUserInfo(info)
    userInfo.setAvatar(info.avatar)
    return info._id;
}

function initializeCards(userId) {
    api.getInitialCards()
        .then(initialCards => initializeCardsSection(initialCards, userId))
        .catch(handleError);
}

function initializeCardsSection(initialCards, userId) {
    const sectionSettings = {items: initialCards, renderer: (item) => renderItem(item, userId)};
    const section = new Section(sectionSettings, ".elements");
    const addButtonCallback = (inputsMap, sender) => handleAddCardSubmit(inputsMap, section, userId, sender);

    const appCardPopup = new PopupWithForm(".add-card-popup", addButtonCallback);

    appCardPopup.setEventListeners();

    elementAddButton.addEventListener("click", () => appCardPopup.open());
    section.render();
}

function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(form => {
        const formValidator = new FormValidator(settings, form);
        formValidator.enableValidation();
    })
}

initialize();


