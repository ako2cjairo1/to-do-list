import { actionType } from "../actions/todoActions"

const initialState = JSON.parse(localStorage.getItem("todos")) || { removeDoneItems: false, todos: [] }

const todoReducer = (state = initialState, action) => {
    let updatedState
    switch(action.type) {
        case actionType.ADD_TODO:
            updatedState = {
                ...state,
                todos: [...state.todos, action.payload]
            }
            break
        case actionType.DELETE_TODO:
            updatedState = {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
            break
        case actionType.TOGGLE_TODO:
            updatedState = {
                ...state,
                todos: state.todos.map(todo => (
                    todo.id === action.payload
                    ? {...todo, isDone: !todo.isDone}
                    : todo
                ))
            }
            break
        case actionType.TOGGLE_ISDONE:
            updatedState = {
                ...state,
                removeDoneItems: action.payload
            }
            break
        default:
            updatedState = state
            break
    }
    localStorage.setItem("todos", JSON.stringify(updatedState))
    return updatedState
}

export default todoReducer