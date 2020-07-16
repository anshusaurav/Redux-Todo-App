var store = Redux.createStore(rootReducer);
var input = document.querySelector('input');
var list = document.querySelector('ul');

function render() {
    var todos = store.getState().todos;
    var html = todos.map((todo) => {
        return `<li id=${todo.id} class=${todo.completed ? 'completed' : ''}>
                <div class="view">
                <input class=""toggle" type="checkbox" ${todo.completed ? 'checked' : ''}/>
                <label>${todo.text}</label>
                <button class="destroy"></button>
                </div>
            </li>`

    })
    list.innerHTML = html;
}

list.addEventListener('change', (event) => {
    var value = e.target.value;
    store.dispatch(actions.addTodo(value));
    e.target.value = '';
});

list.addEventListener('click', (event) =>{
    var target = e.target, id;
    switch(target.tagName) {
        case 'BUTTON':
            id=target.parentNode.parentNode.id;
            store.dispatch(actions.deleteTodo(id));
            break;
        case 'INPUT':
            id = target.parentNode.parentNode.id;
            store.dispatch(actions.completeTodo(id));
            break;

    }
})
render();
store.subscribe(render);
