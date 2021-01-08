const ADD_TODO = "ADD_TODO",
    DELETE_TODO = "DELETE_TODO",
    TOGGLE_TODO = "TOGGLE_TODO",
    TOGGLE_ISDONE = "TOGGLE_ISDONE"

// action name constant object
const actionType = { ADD_TODO, DELETE_TODO, TOGGLE_TODO, TOGGLE_ISDONE }

const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}
const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        payload: id
    }
}
const toggleTodo = (id) => {
    return {
        type: TOGGLE_TODO,
        payload: id
    }
}
const toggleIsDone = (status) => {
    return {
        type: TOGGLE_ISDONE,
        payload: status
    }
}

export { addTodo, deleteTodo, toggleTodo, toggleIsDone, actionType }