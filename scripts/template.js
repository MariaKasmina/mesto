const cardContainer = document.querySelector('.elements');
const popUpWithImage = document.querySelector('.popup_with_image');

import {initialCards} from "./data/data_for_template.js";
import {openPopup} from "./popup.js";

export function addCard(title, url) {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__caption-text').textContent = title;
    cardElement.querySelector('.element__image').src = url;

    cardElement.querySelector('.element__heart').addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('element__heart_active');
    });

    cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        const image = popUpWithImage.querySelector('.popup__image');
        image.src = eventTarget.getAttribute('src');
        const desc = popUpWithImage.querySelector('.popup__image-description');
        desc.textContent = cardElement.querySelector('.element__caption-text').textContent;
        if (image.width > image.height) {
            image.width = 816;
            image.height = image.width / 1.51;
        } else {
            image.width = 433;
            image.height = image.width * 1.25;
        }
        openPopup(popUpWithImage)
    })

    cardElement.querySelector('.element__delete-btn').addEventListener('click', function () {
        cardElement.remove();
        if(document.querySelector('.element') === null){
            renderNoCards();
        }
    });

    cardContainer.prepend(cardElement);
}

initialCards.map((card, index) => {
    addCard(card.name, card.link);
});

function renderNoCards(){
    document.querySelector('.elements__no-items').style.display = 'block';
}