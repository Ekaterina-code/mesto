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

const input = document.querySelector(".input");
const addCard = document.querySelector(".add-card");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputProfileTitle = document.querySelector(".input__text_type_title");
const inputProfileSubtitle = document.querySelector(".input__text_type_subtitle");
const profileEditForm = document.querySelector(".input__edit-form");
const inputProfile = document.querySelector(".input__profile");
const inputClose = document.querySelector(".input__close");

const inputElementName = document.querySelector(".add-card__text_type_name");
const inputElementLink = document.querySelector(".add-card__text_type_link");
const elementAddForm = document.querySelector(".add-card__add-form");
const inputAddCard = document.querySelector(".add-card__add-card");
const addCardClose = document.querySelector(".add-card__close");

const profileEditButton = document.querySelector(".profile__edit");
const elementAddButton = document.querySelector(".profile__add-button");

const elements = document.querySelector(".elements");

const elementTemplate = document.querySelector("#element-template").content;

const view = document.querySelector(".view");
const viewClose = document.querySelector(".view__close");

function openProfileEditForm() {
  input.classList.add("input_opened");
  inputProfileTitle.value = profileTitle.textContent;
  inputProfileSubtitle.value = profileSubtitle.textContent;
}

function closeProfileEditForm() {
  input.classList.remove("input_opened");
}

function saveProfileEditForm(e) {
  e.preventDefault();
  profileTitle.textContent = inputProfileTitle.value;
  profileSubtitle.textContent = inputProfileSubtitle.value;
  closeProfileEditForm();
}

function openElementAddForm() {
  addCard.classList.add("add-card_opened");
  resetAddCardText(inputElementLink);
  resetAddCardText(inputElementName);
}

function resetAddCardText(inputText) {
  inputText.value = "";
  inputText.classList.remove("add-card__text_failed");
}

function closeElementAddForm() {
  addCard.classList.remove("add-card_opened");
}

function saveElementAddForm(e) {
  e.preventDefault();

  validateAddCardText(inputElementLink);
  validateAddCardText(inputElementName);

  const link = inputElementLink.value;
  const name = inputElementName.value;

  if (name && link) {
    addElement(link, name);
    closeElementAddForm();
  }
}

function validateAddCardText(inputText) {
  if (!inputText.value) {
    inputText.classList.add("add-card__text_failed");
  }
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
  view.classList.add("view__opened");
  const viewImage = document.querySelector(".view__image");
  const viewTitle = document.querySelector(".view__title");
  viewImage.src = link;
  viewImage.alt = name;
  viewTitle.textContent = name;
}

function closeView() {
  view.classList.remove("view__opened");
}

viewClose.addEventListener("click", closeView);

elementAddButton.addEventListener("click", openElementAddForm);

addCardClose.addEventListener("click", closeElementAddForm);

profileEditButton.addEventListener("click", openProfileEditForm);

inputClose.addEventListener("click", closeProfileEditForm);

profileEditForm.addEventListener("submit", saveProfileEditForm);

elementAddForm.addEventListener("submit", saveElementAddForm);

inintializeElements();
