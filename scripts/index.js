const userName = document.querySelector('.profile__info-name'); // поле с именем пользователя в хедере
const userProfession = document.querySelector('.profile__info-description'); // поле  профессией пользователя в хедере
const editBtn = document.querySelector('.profile__edit-button'); // кнопка Изменить в хедере
const popUpWithForm = document.querySelector('.popup_with_form'); // элемент поп-ап с формой
const popUpWithImage = document.querySelector('.popup_with_image');
const popUpContent = popUpWithForm.querySelector('.popup__container');
let form = document.querySelector('#form'); // форма на поп-апе
const closePopUpBtn = document.querySelector('.popup__close-button'); // кнопка закрытия поп-апа
const addNewLocationBtn = document.querySelector('.profile__add-button');

/*
const cardImage = document.querySelectorAll('.element__image'); // картинки на карточках

cardImage[3].addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const image = popUpWithImage.querySelector('.popup__image');
    image.src = '../../'.concat(eventTarget.getAttribute('src'));
    console.log(image.width)
    console.log(image.height)
    if(image.width > image.height) {
        image.width = 816;
        image.height = 540;
    } else {
        image.width = 433;
        image.height = 540;
    }
    openPopup(popUpWithImage);
});/

/**
 * Функция для действий по открытию поп-апа
 */
function openPopup(element) {
    element.classList.add('popup_opened');
}

/**
 * Функция для закрытия поп-апа
 */
function closePopup(element) {
    element.classList.remove('popup_opened');
}

// обработка события "Отправка формы"
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const nameInput = document.querySelector('.form').querySelector('#name'); // поле для ввода имени
    const professionInput = document.querySelector('.form').querySelector('#additionalInfo'); // поле для ввода профессии
    userName.textContent = nameInput.value;
    userProfession.textContent = professionInput.value;
    closePopup(popUpWithForm);
    // удаляем скопированный объект формы из DOM
    document.querySelector('.form').remove();
}

// переносит данные из хедера на поп-ап
function setNameAndProfessionOnPopup() {
    const clonedForm = document.querySelector('#form').content.querySelector('.form').cloneNode(true);
    clonedForm.querySelector('#name').value = userName.textContent;
    clonedForm.querySelector('#additionalInfo').value = userProfession.textContent;
    popUpContent.append(clonedForm);
    addEventListenerOnSubmit();
}

function addEventListenerOnSubmit() {
    // указываем, что теперь форма не шаблон, а конкретный элемент на странице
    form = document.querySelector('.form');
    form.addEventListener('submit', formSubmitHandler);
}

// обработка события "Клик на кнопку изменить"
editBtn.addEventListener('click', () => {
    setNameAndProfessionOnPopup();
    openPopup(popUpWithForm);
});

// обработка события "Клик на кнопку закрыть"
closePopUpBtn.addEventListener('click', () => {
    closePopup(popUpWithForm);
    // удаляем скопированный объект формы из DOM
    document.querySelector('.form').remove();
});

addNewLocationBtn.addEventListener('click', () => {
    const clonedForm = document.querySelector('#form').content.querySelector('.form').cloneNode(true);
    clonedForm.querySelector('.form__title').textContent = 'Новое место';
    clonedForm.querySelector('#name').placeholder = 'Название';
    clonedForm.querySelector('#additionalInfo').placeholder = 'Ссылка на картинку';
    // TODO: настроить маргины для адаптивности обоих поп-апов
    clonedForm.querySelector('.form__title').style.marginRight = '200px';
    clonedForm.querySelectorAll('.form__item').forEach((element) => {
        element.style.color = 'rgba(196, 196, 196, 1)'
    });
    clonedForm.querySelector('.form__submit-button').textContent = 'Создать';
    popUpContent.append(clonedForm);
    openPopup(popUpWithForm);
});