var input = document.querySelector('input[type=text]')
var list = document.querySelector('ul')
var all = document.querySelector('.all')
var active = document.querySelector('.active')
var completed = document.querySelector('.completed')
var clearCompleted = document.querySelector('.clear-completed')
const enhancers = Redux.compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const store = Redux.createStore(rootReducer, undefined, enhancers)
function render () {
  var todos = store.getState()

  if (todos.tab === 'Active') {
    console.log('active')
    var html = todos.allTodo
      .filter(todo => !todo.completed)
      .map(function (todo) {
        return `<li id=" ${
          todo.id
        } " class=" ${todo.completed ? 'completed' : ''}" >
				<div class="view">
		  			
					<input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''} />
					<label>${todo.text}</label>
					<button class="destroy"></button>
				</div>
              </li>`
      })
    list.innerHTML = html
    all.classList.remove('selected')
    completed.classList.remove('selected')
    active.classList.add('selected')
  } else if (todos.tab === 'Completed') {
    console.log('Completed')
    var html = todos.allTodo
      .filter(todo => todo.completed)
      .map(function (todo) {
        return `<li id=" ${
          todo.id
        } " class=" ${todo.completed ? 'completed' : ''}" >
				<div class="view">
		  			
					<input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''} />
					<label>${todo.text}</label>
					<button class="destroy"></button>
				</div>
              </li>`
      })
    list.innerHTML = html

    all.classList.remove('selected')
    active.classList.remove('selected')
    completed.classList.add('selected')
  } else {
    var html = todos.allTodo.map(function (todo) {
      return `<li id=" ${
        todo.id
      } " class=" ${todo.completed ? 'completed' : ''}" >
					<div class="view">
						  
						<input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''} />
						<label>${todo.text}</label>
						<button class="destroy"></button>
					</div>
				  </li>`
    })
    list.innerHTML = html

    active.classList.remove('selected')
    completed.classList.remove('selected')
    all.classList.add('selected')
  }
}

input.addEventListener('change', function (e) {
  var value = e.target.value
  store.dispatch(actions.addTodo(value))
  e.target.value = ''
})

list.addEventListener('click', function (e) {
  var target = e.target,
    id

  switch (target.tagName) {
    case 'BUTTON':
      id = target.parentNode.parentNode.id

      store.dispatch(actions.deleteTodo(id))
      break
    case 'INPUT':
      id = target.parentNode.parentNode.id
      console.log(id)
      store.dispatch(actions.completeTodo(id))
      break
  }
})
list.addEventListener('dblclick', function (e) {
  var target = e.target,
    id
  switch (target.tagName) {
    case 'LABEL':
      id = target.parentNode.parentNode.id
  }
})
all.addEventListener('click', function (e) {
  event.preventDefault()
  store.dispatch({
    type: 'All'
  })
})
active.addEventListener('click', function (e) {
  event.preventDefault()
  store.dispatch({
    type: 'Active'
  })
})
completed.addEventListener('click', function (e) {
  event.preventDefault()
  store.dispatch({
    type: 'Completed'
  })
})
clearCompleted.addEventListener('click', function (e) {
  event.preventDefault()
  store.dispatch(actions.clearCompleted())
})
render()
store.subscribe(render)
