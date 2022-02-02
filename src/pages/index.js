import {FormValidator} from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Section from "../scripts/Section.js";
import {Card} from "../scripts/Card.js";
import './index.css';
import Api from "../scripts/Api.js";

const editBtn = document.querySelector('.profile__edit-button'); // кнопка Изменить в хедере
const changePersonalInfoPopUp = document.querySelector('.popup_change_personal-info'); // поп-ап изменения данных профиля
const addNewPlacePopUp = document.querySelector('.popup_add_new-place'); // поп-ап добавления карточки
const changePersonalInfoForm = document.querySelector('.popup_change_personal-info .form_type_edit'); // форма изменения данных пользователя
const addNewLocationForm = document.querySelector('.form_type_add'); // форма добавления новой карточки
const nameInput = document.querySelector('#name'); // поле для ввода имени
const professionInput = document.querySelector('#additionalInfo'); // поле для ввода профессии
const place = addNewLocationForm.querySelector('#place'); // поле для ввода названия карточки
const url = addNewLocationForm.querySelector('#imageUrl'); // поле для ввода ссылки на картинку
const addNewLocationBtn = document.querySelector('.profile__add-button'); // кнопка с плюсом в хедере
const popupWithImage = document.querySelector('.popup_with_image'); // поп-ап с картинкой
const noItemsBlock = document.querySelector('.elements__no-items');
const popupAreYouSure = document.querySelector('.popup_are_you-sure');
const changeProfileImageForm = document.querySelector('.popup_change-profile-image .form_type_edit');
const changeProfileImagePopup = document.querySelector('.popup_change-profile-image');
const avatar = document.querySelector('.profile__image-container');
const changeAvatarInput = document.querySelector('#profileImg');

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1',
    headers: {
        authorization: '6a51e53e-46b7-4c82-b7df-ab43a73f6f4d'
    }
});

const userInfo = new UserInfo('.profile__info-name', '.profile__info-description');

const initialInfoPromises = Promise.all([api.getInitialCards(), api.getUserInfo()]);

let cardList = null;
initialInfoPromises.then((res) => {
    cardList = new Section({
            items: res[0][0],
            renderer: (cardItem) => {
                createCard(cardItem).then((res) => {
                    cardList.addItem(res, 'append');
                }).catch((err) => console.log(err));
            }
        },
        '.elements'
    );
    cardList.renderItems();
    return cardList;
})


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

const changeProfileImageFormValidity = new FormValidator(config, changeProfileImageForm);
changeProfileImageFormValidity.enableValidation();

const areYouSurePopup = new PopupWithForm(popupAreYouSure);
areYouSurePopup.setEventListeners();

const changeProfileImagePopupItem = new PopupWithForm(changeProfileImagePopup, (data) => {
    renderLoading(true, '.popup_change-profile-image');
    api.changeAvatar(data[changeAvatarInput.name]).then((res) => {
        userInfo.updateAvatar(res.avatar);
        changeProfileImagePopupItem.close();
    }).catch((err) => {
        console.log(`Ошибка запроса ${err}`);
    }).finally(() => {
        renderLoading(false, '.popup_change-profile-image');
    });
});
changeProfileImagePopupItem.setEventListeners();

const popupWithImageItem = new PopupWithImage(popupWithImage);
popupWithImageItem.setEventListeners();

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

avatar.addEventListener('click', () => {
    changeProfileImagePopupItem.open();
});

const changePersonalInfoPopupForm = new PopupWithForm(changePersonalInfoPopUp, (data) => {
    renderLoading(true, '.popup_change_personal-info');
    api.updateUserInfo(data[nameInput.name], data[professionInput.name]).then((res) => {
        userInfo.setUserInfo(res.name, res.about); // после изменения данных подтягиваем их на страницу
        changePersonalInfoPopupForm.close();
    }).catch((err) => console.log(err)).finally(() => renderLoading(false, '.popup_change_personal-info'));
});
changePersonalInfoPopupForm.setEventListeners();

const addNewLocationPopupForm = new PopupWithForm(addNewPlacePopUp, (data) => {
    renderLoading(true, '.popup_add_new-place');
    api.putNewImage(data[place.name], data[url.name]).then((res) => {
        createCard({name: res.name, link: res.link, desc: 'Место'}).then((res) => {
            cardList.addItem(res, 'prepend');
        });
        noItemsBlock.style.display = 'none';
        addNewLocationPopupForm.close();
    }).catch((err) => console.log(err)).finally(() => renderLoading(false, '.popup_add_new-place'));
});
addNewLocationPopupForm.setEventListeners();

// установка данных пользователя в хедере
function setUserInfo() {
    api.getUserInfo().then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        userInfo.updateAvatar(res.avatar);
    }).catch((err) => console.log(err));
}

setUserInfo();

// функция создания карточки
function createCard(card) {
    return initialInfoPromises.then((res) => {
        if (card.likes === undefined) { // для новых карточек выставяем значение лайков 0
            return new Card(card._id, card.name, card.link, 'Место', 0, '#element-template', res[1].id, res[1].id, handleOpenPopup, (element) => {
                areYouSurePopup.open();
                areYouSurePopup.setSubmitAction(() => {
                    handleDeleteCardSubmitAction(element, card._id);
                });
            }, setLike, removeLike).createCard();
        }
        return new Card(card._id, card.name, card.link, 'Место', card.likes.length, '#element-template', card.owner._id, res[1].id, handleOpenPopup, (element) => {
            areYouSurePopup.open();
            areYouSurePopup.setSubmitAction(() => {
                handleDeleteCardSubmitAction(element, card._id);
            });
        }, setLike, removeLike).createCard();
    })
}

function handleDeleteCardSubmitAction(element, id) {
    api.removeCard(id).then(() => {
        element.remove();
        element = null;
        if (document.querySelector('.element') === null) {
            document.querySelector('.elements__no-items').style.display = 'block';
        }
        areYouSurePopup.close();
    }).catch((err) => console.log(`Ошибка удаления ${err}`));
}

/**
 * Функция для действий по открытию поп-апа изменения данных профиля
 */
function openChangePersonalInfoPopup() {
    nameInput.value = userInfo.getUserInfo().name;
    professionInput.value = userInfo.getUserInfo().profession;
    changePersonalInfoPopupForm.open();
}

/**
 * Функция для действий по открытию поп-апа добавления новой карточки
 */
function openAddNewPlacePopUp() {
    addNewLocationPopupForm.open();
    addNewLocationFormValidity.resetValidation();
}

function handleOpenPopup(data) {
    popupWithImageItem.open(data);
}

// функция добавления лайка
function setLike(id) {
    return api.addLike(id).then((res) => {
        return res;
    }).catch((err) => {
        console.log(`Ошибка запроса ${err}`);
    });
}

// функция удаления лайка
function removeLike(id) {
    return api.removeLike(id).then((res) => {
        return res;
    }).catch((err) => {
        console.log(`Ошибка запроса ${err}`);
    });
}

// функция отрисовки загрузки на кнопках отправки форм
function renderLoading(isLoading, form) {
    const submitBtn = document.querySelector(form).querySelector('.form__submit-button');
    const prevSubmitBtnText = submitBtn.textContent;
    if (isLoading) {
        submitBtn.textContent = 'Сохранение...';
    } else {
        submitBtn.textContent = prevSubmitBtnText;
    }
}