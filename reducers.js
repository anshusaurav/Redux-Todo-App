function todos(state = [], action) {
  switch (action.type) {
    case types.ADD_TODO:
      return state.concat([
        {
          text: action.text,
          completed: false,
          id: state.length
            ? state.reduce((maxId, todo) => {
                return Math.max(todo.id, maxId);
              }, -1) + 1
            : 0,
        },
      ]);

    case types.DELETE_TODO:
      return state.filter((todo) => {
        return todo.id !== Number(action.id);
      });

    case types.EDIT_TODO:
      return state.map((todo) => {
        return todo.id === Number(action.id)
          ? Object.assign({}, todo, { text: action.text })
          : todo;
      });
    case types.COMPLETE_TODO:
      return state.map((todo) => {
        return todo.id === Number(action.id)
          ? Object.assign({}, todo, { completed: !todo.completed })
          : todo;
      });

    case types.COMPLETE_ALL:
      return state.map(function (todo) {
        return Object.assign({}, todo, { completed: !todo.completed });
      });

    case types.CLEAR_COMPLETED:
      return state.filter((todo) => {
        return !todo.completed;
      });

    default:
      return state;
  }
}

function changeTabs(state = "All", action) {
  switch (action.type) {
    case types.ACTIVE:
      return "Active";
    case types.COMPLETED:
      return "Completed";
    case types.ALL:
      return "All";
    default:
      return state;
  }
}

var rootReducer = Redux.combineReducers({ allTodo: todos, tab: changeTabs });
