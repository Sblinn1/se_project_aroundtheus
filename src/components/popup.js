export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", closeModalByPressingESC);
  }

  close() {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeModalByPressingESC);
  }

  _handleEscClose() {
    if (evt.key === "Esacpe") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
