"use strict";

export default class initGame {
    constructor() {
        this.field = document.querySelector(".gamefield");
        this.catchCarrot = document.querySelector(".catchCarrot");
        this.score = 0;

        this.field.innerHTML = "";
        // 게임이 재실행 될 때마다 기존 아이콘 삭제

        this.catchCarrot.innerText = CARROT_COUNT;
        // 딩근 수에 당근수 변수 넣어주기

        addItem("carrot", CARROT_COUNT, "img/carrot.png");
        addItem("bug", BUG_COUNT, "img/bug.png");
    }
}
