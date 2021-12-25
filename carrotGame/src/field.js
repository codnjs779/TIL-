"use strict";
const CARROT_SIZE = 80;
const carrotSound = new Audio("./sound/carrot_pull.mp3");
export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.field = document.querySelector(".gamefield");
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener("click", this.onClick);
    }

    init() {
        this.field.innerHTML = "";
        this._addItem("carrot", this.CARROT_COUNT, "img/carrot.png");
        this._addItem("bug", this.BUG_COUNT, "img/bug.png");
    }
    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _addItem = (className, count, imgPath) => {
        // 가장 원점 좌표 값 지정
        const x1 = 0;
        const y1 = 0;
        // 가장 마지막 좌표 값 지정
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;

        // 아이콘 갯수만큼 반복문 돌려서 위치 지정해주기
        for (let i = 0; i < count; i++) {
            const item = document.createElement("img");
            item.setAttribute("class", className);
            item.setAttribute("src", imgPath);
            item.style.position = "absolute";
            // absolute를 해야 해당 필드 내에서 값이 계산된다.

            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);

            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    };
    onClick(event) {
        const target = event.target;

        if (target.matches(".carrot")) {
            target.remove();
            playSound(carrotSound);
            this.onItemClick && this.onItemClick("carrot");
        } else if (target.matches(".bug")) {
            this.onItemClick && this.onItemClick("bug");
        }
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
