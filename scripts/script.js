let title = document.querySelector(".profile__title");
let subtitle = document.querySelector(".profile__subtitle");
let inputTitle = document.querySelector(".input__text_type_title");
let inputSubtitle = document.querySelector(".input__text_type_subtitle");
let profile = document.querySelector(".profile__edit");
let input = document.querySelector(".input");
let close = document.querySelector(".input__close");
let form = document.querySelector(".input__edit-form");

function openForm() {
  input.classList.add("input_opened");
  inputTitle.value = title.textContent;
  inputSubtitle.value = subtitle.textContent;
}

function closeForm() {
  input.classList.remove("input_opened");
}

function save(e) {
  e.preventDefault();
  title.textContent = inputTitle.value;
  subtitle.textContent = inputSubtitle.value;
  closeForm();
}

profile.addEventListener("click", openForm);

close.addEventListener("click", closeForm);

form.addEventListener("submit", save);
