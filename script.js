//DOM selection
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todo-filter");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);

//functions

function addTodo(event) {
  //prevent form default behaviour
  event.preventDefault();

  //creating div element to store item,done and delete button
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //creating list item
  const newtodo = document.createElement("li");
  newtodo.innerHTML = todoInput.value;

  //saving to local storage
  saveToLocal(todoInput.value);

  newtodo.classList.add("todo-item");
  todoDiv.appendChild(newtodo);
  todoInput.value = "";

  //add completed button to todo div
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "+";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //add deleted button to todo div
  const trashbutton = document.createElement("button");
  trashbutton.innerHTML = "-";
  trashbutton.classList.add("trash-btn");
  todoDiv.appendChild(trashbutton);

  //add tododiv to todolist
  todoList.appendChild(todoDiv);
}

function deleteTodo(event) {
  const item = event.target;
  //console.log(item);
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
}

function saveToLocal(todo) {
  let todos;
  //checking if todos is empty or not and saving in todos
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //adding new item in todos array.
  todos.push(todo);
  //saving back to local storage.
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoInput), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
