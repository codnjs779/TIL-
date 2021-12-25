"use strict";

export default class Modal {
    constructor() {
        this.retryModal = document.querySelector(".retryModal--hide");
        this.modalState = document.querySelector(".userState");
        this.retryIcon = document.querySelector(".retryIcon");
        this.retryIcon.addEventListener("click", () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }
    // modal을 쓰는 사람이 원할 때 이벤트를 등록할 수 있다.
    // 등록된 함수 호출해줌
    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showModalWithTxt(text) {
        this.modalState.innerText = text;
        this.retryModal.classList.remove("retryModal--hide");
        this.retryModal.classList.add("retryModal");
    }

    hide() {
        this.modal.classList.add("retryModal--hide");
    }
}
// this는 기계로부터 생성되는 obj
