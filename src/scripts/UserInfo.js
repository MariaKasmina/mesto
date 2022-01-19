export default class UserInfo {
    constructor(nameSelector, noteAboutUserSelector) {
        this._name = document.querySelector(nameSelector);
        this._note = document.querySelector(noteAboutUserSelector);
    }

    // Получение информации профиля
    getUserInfo(){
        const data = {};
        data.name = this._name.textContent;
        data.profession = this._note.textContent;
        return data;
    }

    // Установка данных профиля
    setUserInfo(newName, newNote){
        this._name.textContent = newName;
        this._note.textContent = newNote;
    }

}