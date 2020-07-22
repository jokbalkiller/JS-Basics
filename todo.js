const toDoForm = document.querySelector(".js-toDoForm"), toDoInput = toDoForm.querySelector("input")
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

//삭제 버튼 눌렸을때 함수
function deleteToDo(event) {
    const btn = event.target; //해당 이벤트가 발생한 버튼을 찾음 
    const li = btn.parentNode; //해당 이벤트가 발생한 li도 찾음
    toDoList.removeChild(li); //HTML 상에서 해당 li를 지움
    //filter() 배열의 해당 함수에 true인것만 남기고 걸름
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; //걸러진 리스트로 교체
    saveToDos(); //로컬스토리지에 저장
}

//로컬스토리지에 TODO 리스트 저장
function saveToDos() {
    //로컬스토리지는 String 형태만 저장이 가능하기때문에 Object타입의 toDos를 저장하려면 JSON.stringify 필요
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//띄우기 
function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.className = "delbtn"
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj)
    saveToDos();
}

//submit 이벤트 발생시 핸들러 
function handleSubmit(event) {
    event.preventDefault(); //디폴트 핸들러 지우기 필수!
    const currentValue = toDoInput.value; //값 가져오기
    paintToDo(currentValue); 
    toDoInput.value = "";
}

//리스트 가져와서 출력
function loadToDO() {
    const loadedToDos = localStorage.getItem(TODOS_LS); //로컬스토리지에서 가져옴
    if(loadedToDos !== null) { 
        const parsedToDos = JSON.parse(loadedToDos); //String으로 저장되있는 것을 다시 Object 배열로 바꿔줌.
        //각각 배열 원소 다 페인트
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    } 
}

function init() {
    loadToDO();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
