const userName = document.querySelector('.profile__info-name'); // поле с именем пользователя в хедере
const userProfession = document.querySelector('.profile__info-description'); // поле  профессией пользователя в хедере
const editBtn = document.querySelector('.profile__edit-button'); // кнопка Изменить в хедере
const popUpWithForm = document.querySelector('.popup_with_form'); // элемент поп-ап с формой
const popUpWithImage = document.querySelector('.popup_with_image');
const popUpContent = popUpWithForm.querySelector('.popup__container');
let form = document.querySelector('#form'); // форма на поп-апе
const closePopUpBtn = document.querySelector('.popup__close-button'); // кнопка закрытия поп-апа
const addNewLocationBtn = document.querySelector('.profile__add-button');
const popUpWithImageCloseBtn = popUpWithImage.querySelector('.popup__close-button');

import {addCard} from "./template.js";
import {openPopup, closePopup} from "./popup.js";

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

// обработка клика на кнопку добавления сущности
addNewLocationBtn.addEventListener('click', () => {
    const clonedForm = document.querySelector('#form').content.querySelector('.form').cloneNode(true);
    // задаем значения для новой формы
    clonedForm.querySelector('.form__title').textContent = 'Новое место';
    clonedForm.querySelector('#name').placeholder = 'Название';
    clonedForm.querySelector('#additionalInfo').placeholder = 'Ссылка на картинку';
    clonedForm.querySelector('.form__submit-button').textContent = 'Создать';
    // обрабатываем отправку формы
    clonedForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        const place = clonedForm.querySelector('#name').value;
        const url = clonedForm.querySelector('#additionalInfo').value;
        // создаем карточку
        addCard(place, url);
        closePopup(popUpWithForm);
        // удаляем созданную форму
        document.querySelector('.form').remove();
    });
    popUpContent.append(clonedForm);
    openPopup(popUpWithForm);
});

popUpWithImageCloseBtn.addEventListener('click', function () {
    closePopup(popUpWithImage);
});

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