import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this.viewPopupImage = this.popup.querySelector(".view-popup__image");
        this.viewPopupTitle = this.popup.querySelector(".view-popup__title");
    }

    open(link, name) {
        this.viewPopupImage.src = link;
        this.viewPopupImage.alt = name;
        this.viewPopupTitle.textContent = name;
        super.open();
    }
}
