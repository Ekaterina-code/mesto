export class Card {
    constructor(selector, link, name, handleCardClick) {
        this.selector = selector;
        this.link = link;
        this.name = name;
        this.handleCardClick = handleCardClick;
    }

    getElement() {
        const element = this._getRawElement();
        this._setLikeEventListener(element);
        this._setDelEventListener(element);
        this._setImageEventListener(element);
        this._setImage(element);
        this._setTitle(element);
        return element;
    }

    _setImage(element) {
        const image = this._getImage(element);
        image.src = this.link;
        image.alt = this.name;
    }

    _setTitle(element) {
        const title = this._getTitle(element);
        title.textContent = this.name;
    }

    _setLikeEventListener(element) {
        const like = this._getLike(element);
        like.addEventListener("click", this._handleLikeClick);
    }

    _handleLikeClick(evt) {
        const like = evt.target;
        like.classList.toggle("element__like_active");
    }

    _setDelEventListener(element) {
        const del = this._getDel(element);
        del.addEventListener("click", () => this._handleDelClick(element));
    }

    _handleDelClick(element) {
        element.remove();
    }

    _setImageEventListener(element) {
        const image = this._getImage(element);
        image.addEventListener("click", () => this._handleCardClick());
    }

    _getRawElement() {
        const elementTemplate = document.querySelector(this.selector).content;
        return elementTemplate.querySelector(".element").cloneNode(true);
    }

    _getTitle(element) {
        return element.querySelector(".element__title");
    }

    _getLike(element) {
        return element.querySelector(".element__like");
    }

    _getDel(element) {
        return element.querySelector(".element__delete");
    }

    _getImage(element) {
        return element.querySelector(".element__image");
    }

    _handleCardClick() {
        this.handleCardClick(this.link, this.name);
    }
}