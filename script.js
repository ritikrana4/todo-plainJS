//DOM selection
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoCompleteList = document.querySelector(".todo-complete-list");

todoButton.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", getToDos);
todoList.addEventListener("click", deleteTodo);

function addTodo(event) {
  //prevent form default behaviour
  event.preventDefault();

  if (todoInput.value.length == 0) {
    return;
  }
  //creating div element to store item,done and delete button
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create complete icon
  const completedButton = document.createElement("span");
  completedButton.innerHTML = `<i class="far fa-check-circle fa-lg"></i>`;
  completedButton.classList.add("delete-btn");
  todoDiv.appendChild(completedButton);

  //creating list item
  const newtodo = document.createElement("li");
  newtodo.innerHTML = todoInput.value;

  //saving to local storage
  saveToLocal(todoInput.value);

  todoDiv.appendChild(newtodo);
  todoInput.value = "";

  //add completed button to todo div
  const deletebutton = document.createElement("span");
  deletebutton.innerHTML = `<i class="fas fa-trash"></i>`;
  deletebutton.classList.add("delete-btn");
  todoDiv.appendChild(deletebutton);

  //add tododiv to todolist
  todoList.appendChild(todoDiv);
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

function deleteTodo(event) {
  const item = event.target;
  //console.log(item);

  if (item.classList[0] === "fas") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }

  if (item.classList[0] === "far") {
    const todo = item.parentElement.parentElement;
    //add to complete list
    addtocompletelist(todo);
    removeLocalTodos(todo);
    todo.remove();
  }
}

function addtocompletelist(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //creating list item
  const newtodo = document.createElement("li");
  newtodo.innerHTML = todo.children[1].innerText;

  todoDiv.appendChild(newtodo);

  //add tododiv to todolist
  todoCompleteList.appendChild(todoDiv);
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const completedButton = document.createElement("span");
    completedButton.innerHTML = `<i class="far fa-check-circle fa-lg"></i>`;
    completedButton.classList.add("delete-btn");
    todoDiv.appendChild(completedButton);
    //Create list

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //Create Completed Button

    const deletebutton = document.createElement("span");
    deletebutton.innerHTML = `<i class="fas fa-trash"></i>`;
    deletebutton.classList.add("delete-btn");
    todoDiv.appendChild(deletebutton);

    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}
