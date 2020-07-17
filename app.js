var store = Redux.createStore(rootReducer);
var input = document.querySelector('input[type=text]');
var list = document.querySelector('ul');
var all = document.querySelector('.all');
var active = document.querySelector('.active');
var completed = document.querySelector('.completed');

function render() {
    var todos = store.getState().todos;
    console.log(todos);
    var html = todos.todoList.map(function(todo) {
      return `<li id=" ${todo.id} " class=" ${todo.completed ? 'completed' : ''}" >
				<div class="view">
		  			
					<input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''} />
					<label>${todo.text}</label>
					<button class="destroy"></button>
				</div>
              </li>`;
    });
    list.innerHTML = html;
}

input.addEventListener('change', function(e) {
	console.log('wew');
	var value = e.target.value;
	store.dispatch(actions.addTodo(value));
 	e.target.value = '';
});

list.addEventListener('click', function(e) {
	var target = e.target, id;

	switch (target.tagName) {
		case 'BUTTON' :
			id = target.parentNode.parentNode.id;

			store.dispatch(actions.deleteTodo(id));
	  	break;
		case 'INPUT' :
			id = target.parentNode.parentNode.id;
			console.log(id);
			store.dispatch(actions.completeTodo(id));
			break;
	}
});
all.addEventListener('click', function(e){
	store.dispatch({
		type: 'All'
	})
})
active.addEventListener('click', function(e){
	store.dispatch({
		type: 'Active'
	})
})
completed.addEventListener('click', function(e){
	store.dispatch({
		type: 'Completed'
	})
})
render();
store.subscribe(render);
