const userName = document.querySelector('.profile__info-name'); // поле с именем пользователя в хедере
const userProfession = document.querySelector('.profile__info-description'); // поле  профессией пользователя в хедере
const editBtn = document.querySelector('.profile__edit-button'); // кнопка Изменить в хедере
const popUp = document.querySelector('.popup'); // элемент поп-ап
const form = popUp.querySelector('.popup__form'); // форма на поп-апе
const formItem = popUp.querySelectorAll('.popup__form-item'); // поля ввода на форме
const nameInput = popUp.querySelector('#name'); // поле для ввода имени
const professionInput = popUp.querySelector('#profession'); // поле для ввода профессии
const closePopUpBtn = popUp.querySelector('.popup__close-button'); // кнопка закрытия поп-апа
const submitBtn = popUp.querySelector('.popup__submit-button'); // кнопка сохранения изменений
const heart = document.querySelectorAll('.element__heart');


// обработка события "Клик на кнопку изменить"
editBtn.addEventListener('click', () => {
    popUp.classList.add('popup_opened');
    // в value полей на форме кладем значения полей хедера
    formItem[0].setAttribute('value', userName.textContent);
    formItem[1].setAttribute('value', userProfession.textContent);
});

// обработка события "Клик на кнопку закрыть"
closePopUpBtn.addEventListener('click', () => {
    popUp.classList.remove('popup_opened');
});

// обработка события "Клик на кнопку сохранить"
submitBtn.addEventListener('click', () => {
    popUp.classList.remove('popup_opened');
});

// обработка события "Изменение текстового поля на форме"
nameInput.addEventListener('input', () => {
    nameInput.textContent = nameInput.value;
});

// обработка события "Изменение текстового поля на форме"
professionInput.addEventListener('input', () => {
    professionInput.textContent = professionInput.value;
});

// обработка события "Отправка формы"
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // если textContent === '' -> значение поля не изменялось, иначе помещаем измененную строку в поле в хедере
    if (nameInput.textContent !== '') {
        userName.textContent = nameInput.textContent;
    }
    // если textContent === '' -> значение поля не изменялось, иначе помещаем измененную строку в поле в хедере
    if (professionInput.textContent !== '') {
        userProfession.textContent = professionInput.textContent;
    }
    // обработка отправки формы через enter
    if (evt.keyCode === 13) {
        popUp.classList.remove('popup_opened');
    }
}

form.addEventListener('submit', formSubmitHandler);

// обработка нажатия на сердечко
function activateHeart() {
    // на каждое сердце на странице присоединяем событие на клик
    for(let index =0; index < heart.length; index += 1) {
        heart[index].addEventListener('click', () => {
            heart[index].setAttribute('src', 'images/heart_active.png'); // меняем картинку на active
        }) ;
    }
}
activateHeart();

