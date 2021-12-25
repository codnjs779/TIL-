import Field from "./field.js";
import Modal from "./Modal.js";

// 1. game field

const CARROT_COUNT = 15;
const BUG_COUNT = 10;
const GAME_DURATION = 10;

const playIcon = document.querySelector(".playIcon");
const gameTimer = document.querySelector(".timer");
const catchCarrot = document.querySelector(".catchCarrot");

const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const gameWinSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new Modal();

gameFinishBanner.setClickListener(() => {
    startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if (!started) {
        return;
    }

    if (item === "carrot") {
        score++;
        updateScore();

        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (item === "bug") {
        finishGame(false);
    }
}

const initGame = () => {
    score = 0;
    catchCarrot.innerText = CARROT_COUNT;
    gameField.init();
};

// filed자체를 absolute를 해주면 필드를 기준으로 위치가 지정이 될게 할 수 있다.

//게임의 상태를 기억해줄 변수가 필요함

playIcon.addEventListener("click", () => {
    if (started) {
        stopGame();
    } else {
        console.log(`1`, started);
        console.log("현재상태 트루 -> 다음 코드때문에 펄스로 바뀐 상태로 유지 ");
        startGame();
    }
    // 조건문을 돌고나면 맨 처음 초기값 started = true이다. 이제 이걸 반대 연산자를 통해서 false로 바꿔주면 이제 첫번째 조건문을 통과하면서 stopGame함수를 수행하게 된다.
});

const startGame = () => {
    started = true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
};

const stopGame = () => {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showModalWithTxt("retry?");
    playSound(alertSound);
    stopSound(bgSound);
};

function stopSound(sound) {
    sound.pause();
}

//1. 정지 재생 아이콘 변환
const showStopBtn = () => {
    const icon = playIcon.querySelector(".fas");
    icon.classList.add("fa-pause");
    icon.classList.remove("fa-play");
    playIcon.style.visibility = "visible";
};

const showTimerAndScore = () => {
    gameTimer.style.visibility = "visible";
    catchCarrot.style.visibility = "visible";
};

const startGameTimer = () => {
    let remainingTimeSec = GAME_DURATION;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
};

const stopGameTimer = () => {
    clearInterval(timer);
};

const hideGameButton = () => {
    playIcon.style.visibility = "hidden";
};

const updateTimerText = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
};

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

const updateScore = () => {
    catchCarrot.innerText = CARROT_COUNT - score;
};

const finishGame = (win) => {
    started = false;
    hideGameButton();
    if (win) {
        playSound(gameWinSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    gameFinishBanner.showModalWithTxt(win ? "You Won!!" : "You Lost");
};

// retryIcon.addEventListener("click", () => {
//     startGame();
// });
