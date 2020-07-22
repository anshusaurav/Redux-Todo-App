var input = document.querySelector("input[type=text]");
var list = document.querySelector("ul");
var all = document.querySelector(".all");
var active = document.querySelector(".active");
var completed = document.querySelector(".completed");
var clearCompleted = document.querySelector(".clear-completed");
var completeAll = document.querySelector(".toggle-all");
var todoCount = document.querySelector(".todo-count");
const enhancers = Redux.compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = Redux.createStore(rootReducer, undefined, enhancers);
function render() {
  var todos = store.getState();

  if (todos.tab === "Active") {
    console.log("active");
    var html = todos.allTodo
      .filter((todo) => !todo.completed)
      .map(function (todo) {
        return `<li id=" ${
          todo.id
        } " class=" ${todo.completed ? "completed" : ""}" >
				<div class="view">
		  			
					<input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""} />
          <label for="edit${todo.id}">${todo.text}</label>
            <input id="edit${todo.id}"type="text" class="edit-text"/>
					<button class="destroy"></button>
				</div>
              </li>`;
      });
    list.innerHTML = html;
    all.classList.remove("selected");
    completed.classList.remove("selected");
    active.classList.add("selected");
  } else if (todos.tab === "Completed") {
    console.log("Completed");
    var html = todos.allTodo
      .filter((todo) => todo.completed)
      .map(function (todo) {
        return `<li id=" ${
          todo.id
        } " class=" ${todo.completed ? "completed" : ""}" >
				<div class="view">
		  			
					<input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""} />
          <label for="edit${todo.id}">${todo.text}</label>
            <input id="edit${todo.id}"type="text" class="edit-text"/>
            
					<button class="destroy"></button>
				</div>
              </li>`;
      });
    list.innerHTML = html;

    all.classList.remove("selected");
    active.classList.remove("selected");
    completed.classList.add("selected");
  } else {
    var html = todos.allTodo.map(function (todo) {
      return `<li id=" ${
        todo.id
      } " class=" ${todo.completed ? "completed" : ""}" >
					<div class="view">
						  
						<input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""} />
            <label for="edit${todo.id}">${todo.text}</label>
            <input id="edit${todo.id}"type="text" class="edit-text"/>
						<button class="destroy"></button>
					</div>
				  </li>`;
    });
    list.innerHTML = html;

    active.classList.remove("selected");
    completed.classList.remove("selected");
    all.classList.add("selected");
  }
}

function getLeftCount() {
  var todos = store.getState();
  return todos.allTodo.reduce((acc, todo) => {
    if (todo.completed) return acc;
    else return acc + 1;
  }, 0);
}
input.addEventListener("change", function (e) {
  var value = e.target.value;
  store.dispatch(actions.addTodo(value));
  e.target.value = "";
  todoCount.innerHTML = `${getLeftCount()} ${
    getLeftCount() > 1 ? "items" : "item"
  } left`;
});

list.addEventListener("click", function (e) {
  var target = e.target,
    id;
  switch (target.tagName) {
    case "BUTTON":
      id = target.parentNode.parentNode.id;

      store.dispatch(actions.deleteTodo(id));
      break;
    case "INPUT":
      switch (target.type) {
        case "checkbox":
          id = target.parentNode.parentNode.id;
          console.log(id);
          store.dispatch(actions.completeTodo(id));
          break;
      }
  }

  todoCount.innerHTML = `${getLeftCount()} ${
    getLeftCount() > 1 ? "items" : "item"
  } left`;
});
list.addEventListener("dblclick", function (e) {
  var target = e.target,
    id;
  console.log("double click");

  console.dir(event.target);

  switch (target.tagName) {
    case "LABEL":
      id = target.parentNode.parentNode.id;
      target.classList.add("editing");
      target.nextElementSibling.value = target.textContent;
      target.nextElementSibling.style.display = "block";
      target.nextElementSibling.focus();
      target.style.display = "none";
      break;
    case "INPUT":
      switch (target.type) {
        case "text":
          console.log("Edit after double click");
      }
  }
});
list.addEventListener("keyup", function (e) {
  var target = e.target,
    id;

  console.log("Change");
  console.dir(e.target);
  // switch (target.tagName) {
  //   case "INPUT":
  switch (target.type) {
    case "text":
      id = target.parentNode.parentNode.id;
      console.log("editing");
      console.log(e.keyCode);
      if (e.keyCode === 13) {
        const text = target.value;
        store.dispatch(actions.editTodo(id, text));
        target.previousElementSibling.style.display = "block";
        target.style.display = "none";
      }
  }
  // }
});
all.addEventListener("click", function (e) {
  event.preventDefault();
  store.dispatch({
    type: "All",
  });
});
active.addEventListener("click", function (e) {
  event.preventDefault();
  store.dispatch({
    type: "Active",
  });
});
completed.addEventListener("click", function (e) {
  event.preventDefault();
  store.dispatch({
    type: "Completed",
  });
});
clearCompleted.addEventListener("click", function (e) {
  event.preventDefault();
  store.dispatch(actions.clearCompleted());

  todoCount.innerHTML = `${getLeftCount()} ${
    getLeftCount() > 1 ? "items" : "item"
  } left`;
});
completeAll.addEventListener("click", function (e) {
  store.dispatch(actions.completeAll());

  todoCount.innerHTML = `${getLeftCount()} ${
    getLeftCount() > 1 ? "items" : "item"
  } left`;
});
render();
store.subscribe(render);
