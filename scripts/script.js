let likes = document.querySelectorAll('.element__like');
for (let i=0; i<likes.length; i++) {
    likes[i].addEventListener(
        'click',
        function() {
            likes[i].classList.toggle('element__like_active');
        });
}

let profile = document.querySelector('.profile__edit');
profile.addEventListener(
    'click',
    function () {
        let input = document.querySelector('.input');
        input.style.display='grid';
        let title = document.querySelector('.profile__title');
        let subtitle = document.querySelector('.profile__subtitle');
        document.querySelector('.input__text_type_title').value=title.textContent;
        document.querySelector('.input__text_type_subtitle').value=subtitle.textContent;
});

function save() {
    document.querySelector('.profile__title').textContent=document.querySelector('.input__text_type_title').value;
    document.querySelector('.profile__subtitle').textContent=document.querySelector('.input__text_type_subtitle').value;
    closeForm();
}

function closeForm () {
    let input = document.querySelector('.input');
    input.style.display='none';
}

let close = document.querySelector('.input__close');
close.addEventListener('click',closeForm);

let button = document.querySelector('.input__button');
button.addEventListener('click',save);


