import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirmation) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleConfirmation = handleConfirmation;
    }
    
}