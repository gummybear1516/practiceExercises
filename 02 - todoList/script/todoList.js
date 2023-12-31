const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
const output = document.querySelector(".list");
const inputElement1 = document.querySelector(".input-todo");
const inputElement2 = document.querySelector(".input-date");
const errorMessage = document.querySelector(".js-error-message");
const addButton = document.querySelector(".js-add-button");
addButton.addEventListener('click',()=>{
  addTask();
})

displayTodoList();

function saveData() {
  const JSONTodoList = JSON.stringify(todoList);
  localStorage.setItem("todoList", JSONTodoList);
}

function addTask() {
  const name = inputElement1.value.trim();
  const dueDate = inputElement2.value.trim();
  if (name !== "" && dueDate !== "") {
    errorMessage.innerHTML = "";

    if (name.length > 23) {
      errorMessage.innerHTML =
        "Error: The input cannot be longer than 23 characters!";
      return;
    }

    todoList.push({ name, dueDate });
    saveData();

    inputElement1.value = "";
    inputElement2.value = "";
    displayTodoList();
  } else {
    errorMessage.innerHTML = "Error: input cannot be empty!";
  }
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveData();
  displayTodoList();
}

function displayTodoList() {
  let todoHTML = "";
  todoList.forEach((value, index) => {
    const todo = todoList[index];
    todoHTML += `<div>${value.name}</div>
    <div>${value.dueDate}</div>
    <button class="js-delete-button
    ">Delete</button></div>`;
  });
  output.innerHTML = todoHTML;

  const deleteButton = document.querySelectorAll(".js-delete-button");
  deleteButton.forEach((deleteButton,index)=>{
    deleteButton.addEventListener('click',()=>{
      deleteTodo(index);
    });
  });
}
