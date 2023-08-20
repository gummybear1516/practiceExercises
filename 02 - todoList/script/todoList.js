const todoList = [];
const output = document.querySelector(".list");
const inputElement1 = document.querySelector(".input-todo");
const inputElement2 = document.querySelector(".input-date");
const errorMessage = document.querySelector(".js-error-message");

displayTodoList();

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
    inputElement1.value = "";
    inputElement2.value = "";
    displayTodoList();
  } else {
    errorMessage.innerHTML = "Error: input cannot be empty!";
  }
}

function displayTodoList() {
  let todoHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    todoHTML += `<div>${todo.name}</div>
    <div>${todo.dueDate}</div>
    <button class="js-delete-button" 
    onclick="deleteTodo(${i});
    ">Delete</button></div>`;
  }
  output.innerHTML = todoHTML;
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  displayTodoList();
}
