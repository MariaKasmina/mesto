import {openPopup, closePopup} from "./popup.js";
import {createCard, renderCard} from "./template.js";

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
const popUpWithImage = document.querySelector('.popup_with_image'); // поп-ап с картинкой
const popUpWithImageCloseBtn = popUpWithImage.querySelector('.popup__close-button'); // кнопка закрытия поп-апа с картинкой
const submitBtn = document.querySelectorAll('.form__submit-button');
const popupContainer = document.querySelectorAll('.popup__container');

/**
 * Функция для действий по открытию поп-апа изменения данных профиля
 */
function openChangePersonalInfoPopup() {
    nameInput.value = userName.textContent;
    professionInput.value = userProfession.textContent;
    openPopup(changePersonalInfoPopUp);
}

/**
 * Функция для действий по открытию поп-апа добавления новой карточки
 */
function openAddNewPlacePopUp() {
    place.value = '';
    url.value = '';
    openPopup(addNewPlacePopUp);
}

/**
 * Функция для действий по отправке формы изменения данных пользователя
 * @param evt
 */
function submitChangePersonalInfoForm(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    userName.textContent = nameInput.value;
    userProfession.textContent = professionInput.value;
    submitBtn.forEach((btn) => {
        btn.classList.add('form__submit-button_type_inactive');
    });
    closePopup(changePersonalInfoPopUp);
}

/**
 * Функция для действия по отправке формы добавления новой карточки
 * @param evt
 */
function submitAddNewLocationForm(evt) {
    evt.preventDefault();
    renderCard(createCard(place.value, url.value), 'prepend');
    closePopup(addNewPlacePopUp);
    document.querySelector('.elements__no-items').style.display = 'none';
    submitBtn.forEach((btn) => {
        btn.classList.add('form__submit-button_type_inactive');
    });
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
changePersonalInfoForm.addEventListener('submit', (evt) => submitChangePersonalInfoForm(evt));

/**
 * Обработка события "Отпавка формы добавления новой карточки"
 */
addNewLocationForm.addEventListener('submit', (evt) => submitAddNewLocationForm(evt));

/**
 * Обработка события "Клик на кнопку закрытия поп-апа с картинкой"
 */
popUpWithImageCloseBtn.addEventListener('click', function () {
    closePopup(popUpWithImage);
});

/**
 * Отмена всплытия события клика на оверлей в области непосредственно поп-апа
 */
popupContainer.forEach((container) => {
    container.addEventListener('click', (evt => { evt.stopPropagation(); }));
});

/**
 * Закрытие поп-апа кликом на оверлей
 */
changePersonalInfoPopUp.addEventListener('click', () => {
    closePopup(changePersonalInfoPopUp);
});

/**
 * Закрытие поп-апа кликом на оверлей
 */
addNewPlacePopUp.addEventListener('click', () => {
    closePopup(addNewPlacePopUp);
});

/**
 * Закрытие поп-апа кликом на оверлей
 */
popUpWithImage.addEventListener('click', () => {
    closePopup(popUpWithImage);
});

/**
 * Закрытие поп-апа кликом на esc
 */
document.addEventListener('keydown', (evt) => {
    // для текущего открытого поп-апа
    const popup = document.querySelector('.popup_opened');
    if(evt.key === 'Escape') {
        closePopup(popup);
    }
});