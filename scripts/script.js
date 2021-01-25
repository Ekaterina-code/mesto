let likes = document.querySelectorAll(".element__like");
for (let i = 0; i < likes.length; i++) {
  let like = likes[i];
  like.addEventListener("click", function () {
    like.classList.toggle("element__like_active");
  });
}

let title = document.querySelector(".profile__title");
let subtitle = document.querySelector(".profile__subtitle");
let inputTitle = document.querySelector(".input__text_type_title");
let inputSubtitle = document.querySelector(".input__text_type_subtitle");

let profile = document.querySelector(".profile__edit");
profile.addEventListener("click", function () {
  let input = document.querySelector(".input");
  input.style.display = "grid";
  inputTitle.value = title.textContent;
  inputSubtitle.value = subtitle.textContent;
});

function save() {
  title.textContent = inputTitle.value;
  subtitle.textContent = inputSubtitle.value;
  closeForm();
}

function closeForm() {
  let input = document.querySelector(".input");
  input.style.display = "none";
}

let close = document.querySelector(".input__close");
close.addEventListener("click", closeForm);

let button = document.querySelector(".input__button");
button.addEventListener("click", save);
