

function todos(state={todoList:[], tab:'All'}, action) {


    switch (action.type) {
        case types.ADD_TODO:

            return {
                ...state, todoList: state.todoList.concat([{
                    text: action.text, completed: false, id: state.todoList.length ? state.todoList.reduce((maxId, todo) => {
                        return Math.max(todo.id, maxId);
                    }, -1) + 1 : 0,
                }])
            };


        case types.DELETE_TODO:
            return {
                ...state,
                todoList: state.todoList.filter( todo => {
                    return todo.id !== Number(action.id)
                })
            }

        case types.COMPLETE_TODO:
            return {
                ...state,
                todoList: state.todoList.map(todo => {
                    return todo.id === Number(action.id)? Object.assign({}, todo, {completed: !todo.completed}) : todo;
                })
            }
        case types.COMPLETE_ALL:
            var areAllMarked = state.todoList.every(function (todo) {
                todo.completed
            });
            return {...state, todoList: state.todoList.map(function (todo) {
                return Object.assign({}, todo, {completed: !areAllMarked});
            })
            }
        case types.CLEAR_COMPLETED :
            return {...state, todoList: state.todoList.filter(function (todo) {
                return todo.completed === false;
            })}

        default:
            return state
    }
}

function changeTabs(state={todoList:[], tab:'All'}, action) {
    switch(action.type) {
        case 'Active':
            return {...state, tab:'Active'};
        case 'Completed':
            return {...state, tab:'Completed'};
        default:
            return {...state, tab: 'All'};
    }

}

var rootReducer = Redux.combineReducers({todos, changeTabs});
