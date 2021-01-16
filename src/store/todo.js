import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect"

let todoID = 0;
const localStorageKey = "todo"

const todoSlice = createSlice({
    name: localStorageKey,
    // Get initial state from Local Storage
    initialState: JSON.parse(localStorage.getItem(localStorageKey)) || { removeDoneItems: false, todos: [] },
    reducers: {
        todoAdded: ({todos}, action) => {
            todos.push({
                id: ++todoID,
                text: action.payload.text,
                isDone: false
            })
        },
        todoDeleted: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        todoIsDoneToggled: ({todos}, action) => {
            todos.map(todo => 
                todo.id === action.payload.id 
                ? todo.isDone = !todo.isDone 
                : todo)
        },
        todoRemoveDoneItemsToggled: (state) => {
            state.removeDoneItems = !state.removeDoneItems
        },
        todoLocalStorageSaved: (state) => {
            // save the current state to Local Storage
            localStorage.setItem(localStorageKey, JSON.stringify(state))
        }
    }
})

/* Selector - using 'reselect' library for caching features */
export const getIsDoneTodos = createSelector(
    state => state.todos,
    todos => todos.filter(todo => todo.isDone)
)
export const getIsNotDoneTodos = createSelector(
    state => state.todos,
    todos => todos.filter(todo => todo.isDone === false)
)
/* Actions */
export const { 
    todoAdded, 
    todoDeleted, 
    todoIsDoneToggled, 
    todoRemoveDoneItemsToggled, 
    todoLocalStorageSaved 
} = todoSlice.actions
// export reducer
export default todoSlice.reducer