const form = document.querySelector(".js-form"), input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    //event.preventDefualt(); //이벤트 기본 동작 막기
    const currentValue =  input.value; //input 내용 (이름) 가져오기
    paintGreeting(currentValue);// 페이지에 보여주기
    saveName(currentValue); //로컬에 저장하기
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `${text}이 콩먹어 콩`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();