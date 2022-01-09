import {openPopup, closePopup} from "./popupw.js";
import {renderCard} from "./render.js";
import {FormValidator} from "./FormValidator.js";
import {createCard} from "./render.js"
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";

const userName = document.querySelector('.profile__info-name'); // поле с именем пользователя в хедере
const userProfession = document.querySelector('.profile__info-description'); // поле  профессией пользователя в хедере
const editBtn = document.querySelector('.profile__edit-button'); // кнопка Изменить в хедере
const changePersonalInfoPopUp = document.querySelector('.popup_change_personal-info'); // поп-ап изменения данных профиля
const addNewPlacePopUp = document.querySelector('.popup_add_new-place'); // поп-ап добавления карточки
const changePersonalInfoForm = document.querySelector('.form_type_edit'); // форма изменения данных пользователя
const addNewLocationForm = document.querySelector('.form_type_add'); // форма добавления новой карточки
const nameInput = document.querySelector('#name'); // поле для ввода имени
const professionInput = document.querySelector('#additionalInfo'); // поле для ввода профессии
const place = addNewLocationForm.querySelector('#place'); // поле для ввода названия карточки
const url = addNewLocationForm.querySelector('#imageUrl'); // поле для ввода ссылки на картинку
const closeChangePersonalInfoPopUpBtn = document.querySelector('.popup_change_personal-info .popup__close-button');
const closeAddNewPlacePopUpBtn = document.querySelector('.popup_add_new-place .popup__close-button');
const addNewLocationBtn = document.querySelector('.profile__add-button'); // кнопка с плюсом в хедере
const popUpWithImg = document.querySelector('.popup_with_image'); // поп-ап с картинкой
const popUpWithImageCloseBtn = popUpWithImg.querySelector('.popup__close-button'); // кнопка закрытия поп-апа с картинкой
const popups = document.querySelectorAll('.popup');

const config = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_type_inactive',
    inputErrorClass: 'popup__input_type_error',
    inputActiveErrorClass: 'form__input-error_active'
};

const changePersonalInfoFormValidity = new FormValidator(config, changePersonalInfoForm);

changePersonalInfoFormValidity.enableValidation();

const addNewLocationFormValidity = new FormValidator(config, addNewLocationForm);

addNewLocationFormValidity.enableValidation();

const changePersonalInfoPopup = new Popup(changePersonalInfoPopUp);
changePersonalInfoPopup.setEventListeners();
const addNewLocationPopup = new Popup(addNewPlacePopUp);
addNewLocationPopup.setEventListeners();

const popupWithImage =new PopupWithImage(popUpWithImg);
popupWithImage.setEventListeners();

/**
 * Функция для действий по открытию поп-апа изменения данных профиля
 */
function openChangePersonalInfoPopup() {
    nameInput.value = userName.textContent;
    professionInput.value = userProfession.textContent;
    changePersonalInfoPopup.open();
}

/**
 * Функция для действий по открытию поп-апа добавления новой карточки
 */
function openAddNewPlacePopUp() {
    addNewLocationPopup.open();
    addNewLocationFormValidity.resetValidation();
}

/**
 * Функция для действий по отправке формы изменения данных пользователя
 * @param evt
 */
function submitChangePersonalInfoForm(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    userName.textContent = nameInput.value;
    userProfession.textContent = professionInput.value;
    changePersonalInfoPopup.close();
}

/**
 * Функция для действия по отправке формы добавления новой карточки
 * @param evt
 */
function submitAddNewLocationForm(evt) {
    evt.preventDefault();
    const info = {name: place.value, link: url.value, desc : place.value};
    renderCard(createCard(info), 'prepend');
    addNewLocationPopup.close();
    document.querySelector('.elements__no-items').style.display = 'none';
    place.value = '';
    url.value = '';
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
    openAddNewPlacePopUp();
});

/**
 * Обработка события "Отправка формы изменения данных пользователя"
 */
changePersonalInfoForm.addEventListener('submit', (evt) => submitChangePersonalInfoForm(evt));

/**
 * Обработка события "Отпавка формы добавления новой карточки"
 */
addNewLocationForm.addEventListener('submit', (evt) => submitAddNewLocationForm(evt));

/**
 * Обработка события "Клик на кнопку закрытия поп-апа с картинкой"
 */
popUpWithImageCloseBtn.addEventListener('click', function () {
    popupWithImage.close();
});