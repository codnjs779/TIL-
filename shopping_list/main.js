const listBox = document.querySelector(".listBox");
const input = document.querySelector("input");
const plusButton = document.querySelector(".plusBtn");

const onAdd = () => {
    // 1.사용자 입력 텍스트 받아옴
    const text = input.value;
    if (text === "") {
        input.focus();
        return;
    }

    // 2.새로운 아이템 만듦
    const createList = createItem(text);
    console.log(`createlist`, createList);

    // 3. items 컨테이너안에 새로 만든 아이템을 추가함
    listBox.appendChild(createList);

    // 4. 인풋 초기화
    input.value = "";
    input.focus();
};

let id = 0;

const createItem = (text) => {
    const listLi = document.createElement("li");
    listLi.setAttribute("class", "list");
    listLi.setAttribute("data-id", id);
    listLi.innerHTML = `
    <div class="listItems">
        <span class="listname">${text}</span>
        <button class="trash">
    <i class="fas fa-trash" data-id=${id}></i>
    </button>
    </div>
`;
    id++;
    return listLi;
};

plusButton.addEventListener("click", (e) => {
    e.preventDefault();
    onAdd();
});

listBox.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
        const deletedList = document.querySelector(`.list[data-id="${id}"]`);
        deletedList.remove();
    }
});
