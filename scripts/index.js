const userName = document.querySelector('.profile__info-name'); // поле с именем пользователя в хедере
const userProfession = document.querySelector('.profile__info-description'); // поле  профессией пользователя в хедере
const editBtn = document.querySelector('.profile__edit-button'); // кнопка Изменить в хедере
const popUp = document.querySelector('.popup'); // элемент поп-ап
const popUpContent = popUp.querySelector('.popup__container');
let form = document.querySelector('#form'); // форма на поп-апе
const closePopUpBtn = document.querySelector('.popup__close-button'); // кнопка закрытия поп-апа
const addNewLocationBtn = document.querySelector('.profile__add-button');

/**
 * Функция для действий по открытию поп-апа
 */
function openPopup() {
    popUp.classList.add('popup_opened');
}

/**
 * Функция для закрытия поп-апа
 */
function closePopup() {
    popUp.classList.remove('popup_opened');
}

// обработка события "Отправка формы"
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const nameInput = document.querySelector('.form').querySelector('#name'); // поле для ввода имени
    const professionInput = document.querySelector('.form').querySelector('#additionalInfo'); // поле для ввода профессии
    userName.textContent = nameInput.value;
    userProfession.textContent = professionInput.value;
    closePopup();
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
    openPopup();
});

// обработка события "Клик на кнопку закрыть"
closePopUpBtn.addEventListener('click', () => {
    closePopup();
    // удаляем скопированный объект формы из DOM
    document.querySelector('.form').remove();
});

addNewLocationBtn.addEventListener('click', () => {
    const clonedForm = document.querySelector('#form').content.querySelector('.form').cloneNode(true);
    clonedForm.querySelector('.form__title').textContent = 'Новое место';
    clonedForm.querySelector('#name').value = 'Название';
    clonedForm.querySelector('#additionalInfo').value = 'Ссылка на картинку';
    // TODO: настроить маргины для адаптивности обоих поп-апов
    clonedForm.querySelector('.form__title').style.marginRight = '200px';
    clonedForm.querySelectorAll('.form__item').forEach((element) => {
        element.style.color = 'rgba(196, 196, 196, 1)'
    });
    clonedForm.querySelector('.form__submit-button').textContent = 'Создать';
    popUpContent.append(clonedForm);
    openPopup();
});