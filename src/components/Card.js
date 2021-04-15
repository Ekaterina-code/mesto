export class Card {
    constructor(selector, info, handleCardClick, handleLikeClick, handleDelClick) {
        const elementTemplate = document.querySelector(selector).content;
        this.element = elementTemplate.querySelector(".element").cloneNode(true);
        this.titleElement = this.element.querySelector(".element__title");
        this.likeElement = this.element.querySelector(".element__like");
        this.likeCounterElement = this.element.querySelector(".element__like-counter");
        this.deleteElement = this.element.querySelector(".element__delete");
        this.imageElement = this.element.querySelector(".element__image");
        this._id = info._id;
        this.link = info.link;
        this.name = info.name;
        this.likesInfo = info.likesInfo;
        this.isDeleteEnable = info.isDeleteEnable
        this.handleCardClick = handleCardClick;
        this.handleLikeClick = handleLikeClick;
        this.handleDelClick = handleDelClick;
    }

    render() {
        if (this.isDeleteEnable) {
            this._setDelEventListener();
        } else {
            this.deleteElement.remove()
        }
        this.element.id = "card_" + this._id;
        this._setLikeEventListener();
        this._setImageEventListener();
        this._setImage();
        this._setTitle();
        this._renderLike();

        return this.element;
    }

    setLikeInfo(likesInfo){
        this.likesInfo = likesInfo;
        this._renderLike();
    }

    _setImage() {
        this.imageElement.src = this.link;
        this.imageElement.alt = this.name;
    }

    _setTitle() {
        this.titleElement.textContent = this.name;
    }

    _setLikeEventListener() {
        this.likeElement.addEventListener("click", this._handleLikeClick.bind(this));
    }

    _handleLikeClick() {
        const newState = !this.likesInfo.state;
        this.likesInfo = {
            state: newState,
            count: this.likesInfo.count + (newState ? 1 : -1),
        };
        // проставляем предварительно рассчитаное likesInfo, чтобы создать иллюзию быстро работающего приложения
        // внутри handleLikeClick выполнится повторный вызов setLikeInfo с данными полученными от сервера
        this.setLikeInfo(this.likesInfo);
        this.handleLikeClick(this, newState);
    }

    _renderLike() {
        this.likeElement.classList.toggle("element__like_active", this.likesInfo.state);
        this.likeCounterElement.classList.toggle("element__like-counter_visible", this.likesInfo.count > 0);
        this.likeCounterElement.textContent = this.likesInfo.count;
    }

    _setDelEventListener() {
        this.deleteElement.addEventListener("click", () => this._handleDelClick());
    }

    _handleDelClick() {
        this.handleDelClick(this._id);
    }

    _setImageEventListener() {
        this.imageElement.addEventListener("click", () => this._handleCardClick());
    }

    _handleCardClick() {
        this.handleCardClick(this.link, this.name);
    }
}