import {Card} from "../components/Card.js";
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithDialog} from "../components/PopupWithDialog.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";
import {enableValidation} from "../components/Validate.js";
import './index.css';

const apiOptions = {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
    headers: {
        authorization: "924721bb-884c-4ec6-8021-01d6ed242f97",
        'Content-Type': 'application/json'
    }
}

const api = new Api(apiOptions);

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
    info: "profile-subtitle",
}

const avatarEditFormInputsId = {
    avatar: "profile-avatar",
}

const userInfoSelectors = {
    nameElement: ".profile__title",
    infoElement: ".profile__subtitle",
    avatarElement: ".profile__avatar",
}

const userInfo = new UserInfo(userInfoSelectors);
const popupWithImage = new PopupWithImage(".view-popup");
const profileEditPopup = new PopupWithForm(".profile-popup", handleProfileEdit);
const avatarEditPopup = new PopupWithForm(".avatar-popup", handleAvatarEdit);
const commitDeleteCardDialog = new PopupWithDialog(".commit-popup", handleDeleteCard);

const profileEditButton = document.querySelector(".profile__edit");
const avatarEditButton = document.querySelector(".profile__avatar-button");
const elementAddButton = document.querySelector(".profile__add-button");

function handleFormPopupPromise(popup, promise) {
    const currentText = popup.getSubmitText();
    popup.setSubmitText("Сохранение...")
    promise()
        .catch(handleError)
        .finally(() => {
            popup.setSubmitText(currentText);
            popup.close()
        });
}

function handleProfileEdit(inputsMap, popup) {
    const info = {
        name: inputsMap.get(profileEditFormInputsId.name),
        info: inputsMap.get(profileEditFormInputsId.info)
    }
    const setUserInfo = () => api.setUserInfo(info).then(userInfo.setUserInfo.bind(userInfo));
    handleFormPopupPromise(popup, setUserInfo);
}

function handleAvatarEdit(inputsMap, popup) {
    const avatar = inputsMap.get(avatarEditFormInputsId.avatar);
    const setUserAvatar = () => api.setUserAvatar(avatar).then(() => userInfo.setAvatar(avatar));
    handleFormPopupPromise(popup, setUserAvatar);
}

function handleAddCardSubmit(inputsMap, section, userId, popup) {
    const cardInfo = {
        name: inputsMap.get("add-card-name"),
        link: inputsMap.get("add-card-link")
    }
    const addCard = () => api.addCard(cardInfo).then(item => section.addItem(item));
    handleFormPopupPromise(popup, addCard);
}

function handleDeleteCard(context, popup) {
    const currentText = popup.getButtonText();
    popup.setButtonText("Удаление...")
    api.removeCard(context._id)
        .then(() => context.element.remove())
        .catch(handleError)
        .finally(() => {
            popup.close();
            popup.setButtonText(currentText);
        });
}

function openPopupWithFilledInputs(popup, inputValues) {
    popup.setInputValues(inputValues);
    popup.open();
}

function openProfileEdit() {
    const info = userInfo.getUserInfo();
    const inputValues = new Map([
        [profileEditFormInputsId.name, info.name],
        [profileEditFormInputsId.info, info.info],
    ]);
    openPopupWithFilledInputs(profileEditPopup, inputValues);
}

function openAvatarEdit() {
    const avatar = userInfo.getAvatar();
    const inputValues = new Map([
        [avatarEditFormInputsId.avatar, avatar],
    ]);
    openPopupWithFilledInputs(avatarEditPopup, inputValues);
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
    const handleLikeClick = (cardId, state) => {
        const likes = state
            ? api.setCardLike(cardId)
            : api.removeCardLike(cardId);

        return likes.then(res => {
            return createLikeInfo(res, myId)
        });
    };

    const handleDelClick = (context) => commitDeleteCardDialog.open(context);
    return new Card("#element-template", cardInfo, handleCardClick, handleLikeClick, handleDelClick)
        .render();
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
    avatarEditButton.addEventListener("click", openAvatarEdit);
    profileEditPopup.setEventListeners();
    avatarEditPopup.setEventListeners();
    popupWithImage.setEventListeners();
    commitDeleteCardDialog.setEventListeners();
    enableValidation(formsValidationSettings);

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
    const submitButtonCallback = (inputsMap, sender) => handleAddCardSubmit(inputsMap, section, userId, sender);

    const appCardPopup = new PopupWithForm(".add-card-popup", submitButtonCallback);
    appCardPopup.setEventListeners();

    elementAddButton.addEventListener("click", () => appCardPopup.open());
    section.render();
}

initialize();


