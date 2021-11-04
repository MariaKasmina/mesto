const userName = document.querySelector('.profile__info-name'); // поле с именем пользователя в хедере
const userProfession = document.querySelector('.profile__info-description'); // поле  профессией пользователя в хедере
const editBtn = document.querySelector('.profile__edit-button'); // кнопка Изменить в хедере
const popUp = document.querySelector('.popup'); // элемент поп-ап
const form = document.querySelector('.form'); // форма на поп-апе
const nameInput = document.querySelector('#name'); // поле для ввода имени
const professionInput = document.querySelector('#profession'); // поле для ввода профессии
const closePopUpBtn = document.querySelector('.popup__close-button'); // кнопка закрытия поп-апа

/**
 * Функция для действий по открытию поп-апа
 */
function openPopup() {
    popUp.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    professionInput.value = userProfession.textContent;
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
    userName.textContent = nameInput.value;
    userProfession.textContent = professionInput.value;
    closePopup();
}

// обработка события "Клик на кнопку изменить"
editBtn.addEventListener('click', () => {
    openPopup();
});

// обработка события "Клик на кнопку закрыть"
closePopUpBtn.addEventListener('click', () => {
    closePopup();
});

form.addEventListener('submit', formSubmitHandler);
