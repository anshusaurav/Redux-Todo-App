const initialState = [
    {
        text: 'React',
        completed: 'false',
        id: 0
    },
    {
        text: 'Hooks',
        completed: 'false',
        id: 1
    },
    {
        text: 'Redux',
        completed: 'false',
        id: 2
    }
]

function todos(state, action) {
    var state = state || initialState;
    switch (action.type) {
        case types.ADD_TODO:
            state.push({
                id: state.length,
                completed: false,
                text: action.text

            });
            return state;
        case types.DELETE_TODO:
            return state.filter((todo) => {
                return todo.id !== Number(action.id)
            });
        case types.EDIT_TODO:
            return state.map((todo) =>{
                todo.id === action.id ? {...todo, ...{text: action.text}} : todo
            });
        case types.COMPLETE_TODO:
            return state.map( (todo) => {
                Number(action.id) === todo.id ? {...todo, ...{completed: !todo.completed}} : todo
            });
        case types.COMPLETE_ALL:
            var areAllDone = state.every(function (todo) {
                todo.completed
            });
            return state.map((todo) => {
                return {...todo, ...{completed: areAllDone}}
            });
        case types.CLEAR_COMPLETED:
            return state.filter((todo) => {
                return todo.completed === false;
            });
        default:
            return state;
    }
}
var reducer = Redux.combineReduces({todo});
