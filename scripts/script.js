import {Card} from "./card.js";
import {Section} from "./section.js";
import {enableValidation} from "./validate.js";

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

const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit");
const elementAddButton = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector(".profile-popup");
const inputTitle = profilePopup.querySelector(".popup__input_type_title");
const inputSubtitle = profilePopup.querySelector(".popup__input_type_subtitle");
const profileEditForm = profilePopup.querySelector(".popup__form");

const addCardPopup = document.querySelector(".add-card-popup");
const inputName = addCardPopup.querySelector(".popup__input_type_name");
const inputLink = addCardPopup.querySelector(".popup__input_type_link");
const elementAddForm = addCardPopup.querySelector(".popup__form");

const viewPopup = document.querySelector(".view-popup");
const viewPopupImage = viewPopup.querySelector(".view-popup__image");
const viewPopupTitle = viewPopup.querySelector(".view-popup__title");

const section = new Section(
    {
      items: initialCards,
      renderer: (item) => renderItem(item.link, item.name)
    },
    ".elements");


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

function openProfileEditForm() {
  profileEditForm.reset();
  openPopup(profilePopup);
  inputTitle.value = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}

function saveProfileEditForm(e) {
  e.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopup(profilePopup);
}

function openElementAddForm() {
  elementAddForm.reset();
  openPopup(addCardPopup);
}

function saveElementAddForm(e) {
  e.preventDefault();
  const element = renderItem(inputLink.value, inputName.value);
  section.addItem(element);
  closePopup(addCardPopup);
}

function renderItem(link, name){
  return new Card("#element-template", link, name, openView).getElement();
}

function initializeElements() {
  section.render();
}

function openView(link, name) {
  viewPopupImage.src = link;
  viewPopupImage.alt = name;
  viewPopupTitle.textContent = name;
  openPopup(viewPopup);
}

function inintializeClosePopup() {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__overlay')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
    })
  })
}

elementAddButton.addEventListener("click", openElementAddForm);
elementAddForm.addEventListener("submit", saveElementAddForm);

profileEditButton.addEventListener("click", openProfileEditForm);
profileEditForm.addEventListener("submit", saveProfileEditForm);

initializeElements();
inintializeClosePopup();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
