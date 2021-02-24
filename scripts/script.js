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

const elements = document.querySelector(".elements");

const elementTemplate = document.querySelector("#element-template").content;

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
  addElement(inputLink.value, inputName.value);
  closePopup(addCardPopup);
}

function addElement(link, name) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);

  const like = element.querySelector(".element__like");
  like.addEventListener("click", () => like.classList.toggle("element__like_active")
  );

  const del = element.querySelector(".element__delete");
  del.addEventListener("click", () => element.remove());

  const image = element.querySelector(".element__image");
  image.addEventListener("click", () => openView(link, name));
  image.src = link;
  image.alt = name;

  const title = element.querySelector(".element__title");
  title.textContent = name;

  elements.prepend(element);
}

function inintializeElements() {
  initialCards.forEach((item) => addElement(item.link, item.name));
}

function openView(link, name) {
  openPopup(viewPopup);
  viewPopupImage.src = link;
  viewPopupImage.alt = name;
  viewPopupTitle.textContent = name;
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

inintializeElements();
inintializeClosePopup();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
