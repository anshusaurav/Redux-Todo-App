var initialState = {
    todoList: [
        {
            text: 'Use Redux',
            completed: false,
            id: 0
        },
        {
            text: 'Use React',
            completed: false,
            id: 1
        }
    ],
    activeTab: `all`
}

function todos(state, action) {
    var state = state || initialState;

    switch (action.type) {
        case types.ADD_TODO:
            // state.push({
            //     id: state.length ? state.reduce(function (maxId, todo) {
            //         return Math.max(todo.id, maxId);
            //     }, -1) + 1 : 0,
            //     completed: false,
            //     text: action.text
            // });
            // return state;
            return {
                ...state, ...state.todoList.concat([{
                    text: action.text, completed: false, id: state.todoList.length ? state.reduce((maxId, todo) => {
                        return Math.max(todo.id, maxId);
                    }, -1) + 1 : 0,
                }])
            };


        case types.DELETE_TODO:
            return state.filter(function (todo) {
                return todo.id !== parseInt(action.id, 10);
            });
        case types.EDIT_TODO:
            return state.map(function (todo) {
                todo.id === action.id ? Object.assign({}, todo, {text: action.text}) : todo
            });
        case
        types.COMPLETE_TODO
        :
            return state.map(function (todo) {
                return todo.id === parseInt(action.id, 10) ? Object.assign({}, todo, {completed: !todo.completed}) : todo;
            });
        case
        types.COMPLETE_ALL
        :
            var areAllMarked = state.every(function (todo) {
                todo.completed
            });
            return state.map(function (todo) {
                return Object.assign({}, todo, {completed: !areAllMarked});
            });
        case
        types.CLEAR_COMPLETED
        :
            return state.filter(function (todo) {
                return todo.completed === false;
            });

        default:
            return state
    }
}

function changeTabs(state, action) {
    var state = state || initialState;

}

var rootReducer = Redux.combineReducers({todos});
