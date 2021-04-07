//DOM selection
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todo-filter");

//Event Listeners
todoButton.addEventListener("click", addTodo);
//functions

function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newtodo = document.createElement("li");
  newtodo.innerHTML = todoInput.value;

  //savetolocal()

  newtodo.classList.add("todo-item");

  todoDiv.appendChild(newtodo);

  todoInput.value = "";

  const completedButton = document.createElement("button");
  completedButton.innerHTML = "+";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashbutton = document.createElement("button");
  trashbutton.innerHTML = "-";
  trashbutton.classList.add("trash-btn");
  todoDiv.appendChild(trashbutton);

  todoList.appendChild(todoDiv);
}
