import {FormValidator} from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Section from "../scripts/Section.js";
import {initialCards} from "../data/data_for_template.js";
import {Card} from "../scripts/Card.js";
import './index.css';
import Api from "../scripts/Api.js";

const editBtn = document.querySelector('.profile__edit-button'); // кнопка Изменить в хедере
const changePersonalInfoPopUp = document.querySelector('.popup_change_personal-info'); // поп-ап изменения данных профиля
const addNewPlacePopUp = document.querySelector('.popup_add_new-place'); // поп-ап добавления карточки
const changePersonalInfoForm = document.querySelector('.form_type_edit'); // форма изменения данных пользователя
const addNewLocationForm = document.querySelector('.form_type_add'); // форма добавления новой карточки
const nameInput = document.querySelector('#name'); // поле для ввода имени
const professionInput = document.querySelector('#additionalInfo'); // поле для ввода профессии
const place = addNewLocationForm.querySelector('#place'); // поле для ввода названия карточки
const url = addNewLocationForm.querySelector('#imageUrl'); // поле для ввода ссылки на картинку
const addNewLocationBtn = document.querySelector('.profile__add-button'); // кнопка с плюсом в хедере
const popupWithImage = document.querySelector('.popup_with_image'); // поп-ап с картинкой
const noItemsBlock = document.querySelector('.elements__no-items');

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

const popupWithImageItem = new PopupWithImage(popupWithImage);
popupWithImageItem.setEventListeners();

const userInfo = new UserInfo('.profile__info-name', '.profile__info-description');

const changePersonalInfoPopupForm = new PopupWithForm(changePersonalInfoPopUp, (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const data = changePersonalInfoPopupForm.getInputValue();
    userInfo.setUserInfo(data[nameInput.name], data[professionInput.name]);
    changePersonalInfoPopupForm.close();
});
changePersonalInfoPopupForm.setEventListeners();

const addNewLocationPopupForm = new PopupWithForm(addNewPlacePopUp, (evt) => {
    evt.preventDefault();
    const data = addNewLocationPopupForm.getInputValue();
    const item = createCard({name: data[place.name], link: data[url.name], desc: data[place.name]});
    cardsList.addItem(item, 'prepend');
    addNewLocationPopupForm.close();
    noItemsBlock.style.display = 'none';
});
addNewLocationPopupForm.setEventListeners();

const cardsList = new Section({
        items: initialCards,
        renderer: (cardItem) => {
            const card = createCard(cardItem);
            cardsList.addItem(card, 'append');
        }
    },
    '.elements'
);

cardsList.renderItems();

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-34/users/me',
    headers: {
        authorization: '6a51e53e-46b7-4c82-b7df-ab43a73f6f4d'
    }
})

api.getUserInfo().then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    document.querySelector('img.profile__image').setAttribute('src', res.avatar);
})

function createCard(card){
    return new Card(card.name, card.link, card.desc, '#element-template', handleOpenPopup).createCard();
}

/**
 * Функция для действий по открытию поп-апа изменения данных профиля
 */
function openChangePersonalInfoPopup() {
    api.getUserInfo().then((res) => {
        nameInput.value = res.name;
        professionInput.value = res.about;
    });
    // nameInput.value = userInfo.getUserInfo().name;
    // professionInput.value = userInfo.getUserInfo().profession;
    changePersonalInfoPopupForm.open();
}

/**
 * Функция для действий по открытию поп-апа добавления новой карточки
 */
function openAddNewPlacePopUp() {
    addNewLocationPopupForm.open();
    addNewLocationFormValidity.resetValidation();
}

/**
 * Обработка события "Клик на кнопку изменить"
 */
editBtn.addEventListener('click', () => {
    openChangePersonalInfoPopup();
});

/**
 * Обработка события "Клик на кнопку добавления новой карточки"
 */
addNewLocationBtn.addEventListener('click', () => {
    openAddNewPlacePopUp();
});

function handleOpenPopup(data) {
    popupWithImageItem.open(data);
}