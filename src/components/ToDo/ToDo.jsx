import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import "./styles.css"
import DoneCountBadge from "./CountBadge"
import ToDoItem from "./ToDoItem"
import Alert from "../AlertMessage/Alert"

import { todoAdded, todoLocalStorageSaved, getIsNotDoneTodos } from "../../store/todo"

export default function ToDo() {
    /* GLOBAL STATE */
    const state = useSelector(state => state.todo)
    const { todos, removeDoneItems } = state
    /* LOCAL STATE */
    const todoInit = "";
    const [todo, setTodo] = useState(todoInit);
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
    /* sort todo items by 'isDone' */
    const todosByIsDone = [].concat(todos).sort((a, b) => a.isDone === b.isDone ? 0 : b.isDone ? -1 : 1);
    /* filter todo items by status 'isDone' */
    const todoAll = removeDoneItems ? getIsNotDoneTodos(state) : todosByIsDone;

    /* EVENT HANDLER */
    const dispatch = useDispatch()
    const handleSaveLocalStorage = () => {
        dispatch(todoLocalStorageSaved(state))
        showAlert(true, "success", "Changes saved in local storage")
    }
    const handleOnChangeTodo = (e) => {
        const todoInput = e.target.value
        setTodo(todoInput)
        // remove alert when user starts typing valid input
        if(todoInput.trim())
            showAlert();
    }

    const todoRef = useRef()
    const handleClearTodo = () => {
        setTodo(todoInit)
        // set the cursor focus to textbox 
        todoRef.current.focus()
    }
    const handleOnSubmitForm = (e) => {
        e.preventDefault();

        let trimmedTodo = todo
        if(trimmedTodo.trim()) {
            dispatch(todoAdded({ text: todo }));
            handleClearTodo()
            // showAlert(true, "success", "Item added!")
        } else {
            showAlert(true, "danger", "Pleaser provide task detail")
        }
    }

    /* OPTIONAL RENDERING */
    const createButtonClear = () => (
        todo && todo.length > 0 &&
        <button
            className="todo__clearbutton"
            onClick={handleClearTodo}>clear
        </button>
    )
    const createTodoItems = () => (
        todoAll && todoAll.length > 0
            ? todoAll.map(({ id, ...rest }) => (
                <ToDoItem key={id} id={id} {...rest} />
            ))
            : todosByIsDone.length > 0
                ? <p>&#128526; No more tasks left &#128525;</p>
                : <p>No tasks found</p>
    )
    /* Alert display */
    const showAlert = (show=false, type, msg) => setAlert({ show, type, msg })
    const createAlert = ({ show, ...rest}) => show && <Alert {...rest} removeAlert={showAlert} />;

    return (
        <div className="todo">
            <div className="todo__label">
                <h3>To-Do List <button onClick={handleSaveLocalStorage}>save</button></h3>
                <div>
                    <DoneCountBadge />
                </div>
            </div>
            { createAlert(alert) }
            <div className="todo__container">
                <div className="todo__submit">
                    <h3>+</h3>
                    <form onSubmit={handleOnSubmitForm}>
                        <input
                            ref={todoRef}
                            placeholder="New task..."
                            type="text"
                            maxLength="400"
                            value={todo}
                            onChange={handleOnChangeTodo} />
                        <button type="submit" style={{ display: "none" }}></button>
                    </form>
                    { createButtonClear() }
                </div>
                <hr />
                <div className="todo__items">
                    { createTodoItems() }
                </div>
            </div>
        </div>
    )
}