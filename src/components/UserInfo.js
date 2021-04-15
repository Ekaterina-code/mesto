export class UserInfo {
    constructor(selectors) {
        this.nameElement = document.querySelector(selectors.nameElement);
        this.infoElement = document.querySelector(selectors.infoElement);
        this.avatarElement = document.querySelector(selectors.avatarElement);
    }

    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            info: this.infoElement.textContent,
        }
    }

    setUserInfo(userInfo) {
        this.nameElement.textContent = userInfo.name;
        this.infoElement.textContent = userInfo.info;
    }

    getAvatar() {
        return this.avatarElement.src;
    }

    setAvatar(image) {
        this.avatarElement.src = image;
    }
}