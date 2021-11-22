import {openPopup, closePopup} from "./popup.js";
import {createCard, renderCard} from "./template.js";

const userName = document.querySelector('.profile__info-name'); // поле с именем пользователя в хедере
const userProfession = document.querySelector('.profile__info-description'); // поле  профессией пользователя в хедере
const editBtn = document.querySelector('.profile__edit-button'); // кнопка Изменить в хедере
const changePersonalInfoPopUp = document.querySelector('.popup_change_personal-info'); // поп-ап изменения данных профиля
const addNewPlacePopUp = document.querySelector('.popup_add_new-place'); // поп-ап добавления карточки
const changePersonalInfoForm = document.querySelector('.popup_change_personal-info .form'); // форма изменения данных пользователя
const addNewLocationForm = document.querySelector('.popup_add_new-place .form'); // форма добавления новой карточки
const nameInput = document.querySelector('#name'); // поле для ввода имени
const professionInput = document.querySelector('#additionalInfo'); // поле для ввода профессии
const place = addNewLocationForm.querySelector('#place'); // поле для ввода названия карточки
const url = addNewLocationForm.querySelector('#imageUrl'); // поле для ввода ссылки на картинку
const closeChangePersonalInfoPopUpBtn = document.querySelector('.popup_change_personal-info .popup__close-button');
const closeAddNewPlacePopUpBtn = document.querySelector('.popup_add_new-place .popup__close-button');
const addNewLocationBtn = document.querySelector('.profile__add-button'); // кнопка с плюсом в хедере
const popUpWithImage = document.querySelector('.popup_with_image'); // поп-ап с картинкой
const popUpWithImageCloseBtn = popUpWithImage.querySelector('.popup__close-button'); // кнопка закрытия поп-апа с картинкой

/**
 * Функция для действий по открытию поп-апа изменения данных профиля
 */
function openChangePersonalInfoPopup(element) {
    element.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    professionInput.value = userProfession.textContent;
}

/**
 * Обработка события "Клик на кнопку изменить"
 */
editBtn.addEventListener('click', () => {
    openChangePersonalInfoPopup(changePersonalInfoPopUp);
});

/**
 * Обработка события "Клик на кнопку добавления новой карточки"
 */
addNewLocationBtn.addEventListener('click', () => {
    place.value = '';
    url.value = '';
    openPopup(addNewPlacePopUp);
});

/**
 * Обработка события "Клик на кнопку закрытия поп-апа изменения данных о пользователе"
 */
closeChangePersonalInfoPopUpBtn.addEventListener('click', () => {
   closePopup(changePersonalInfoPopUp);
});

/**
 * Обработка события "Клик на кнопку закрытия поп-апа добавления новой карточки"
 */
closeAddNewPlacePopUpBtn.addEventListener('click', () => {
    closePopup(addNewPlacePopUp);
});

/**
 * Обработка события "Отправка формы изменения данных пользователя"
 */
changePersonalInfoForm.addEventListener('submit', (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    userName.textContent = nameInput.value;
    userProfession.textContent = professionInput.value;
    closePopup(changePersonalInfoPopUp);
});

/**
 * Обработка события "Отпавка формы добавления новой карточки"
 */
addNewLocationForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderCard(createCard(place.value, url.value), 'prepend');
    closePopup(addNewPlacePopUp);
    document.querySelector('.elements__no-items').style.display = 'none';
});

/**
 * Обработка события "Клик на кнопку закрытия поп-апа с картинкой"
 */
popUpWithImageCloseBtn.addEventListener('click', function () {
    closePopup(popUpWithImage);
});
