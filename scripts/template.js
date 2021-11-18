const cardContainer = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const deleteBtn = document.querySelectorAll('.element__delete-btn');

import {initialCards} from "./data/data_for_template.js";

export function addCard(title, url) {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__caption-text').textContent = title;
    cardElement.querySelector('.element__image').src = url;

    cardElement.querySelector('.element__heart').addEventListener('click', function(evt) {
        // console.log(evt.target)
        // const eventTarget = evt.target;
        // eventTarget.classList.toggle('song__like_active');
    });

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