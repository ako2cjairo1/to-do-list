import React, { useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import "./styles.css"
import ToDoItem from "./ToDoItem"
import Alert from "./Alert"
import { addTodo, toggleIsDone } from "../../../store/actions/todoActions"

const ToDo = () => {
    const initTodo = ""
    const dispatch = useDispatch()
    
    // Global STATES
    const todos = useSelector(state => state.todos.todos)
    const initIsIncludeDone = useSelector(state => state.todos.removeDoneItems)
    
    // LOCAL STATE
    const [isIncludeDone, setIsIncludeDone] = useState(initIsIncludeDone)
    const [todo, setTodo] = useState(initTodo)
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" })

    /* sort todo items by status 'isDone' */
    let localTodos = [].concat(todos).sort((a, b) => a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1)
    
    /* toggle filter todo items by status 'isDone' */
    localTodos = isIncludeDone ? localTodos.filter(todo => todo.isDone === false) : localTodos

    const filterIsDoneTodo = () => {
        const toggleRemoveDone = !isIncludeDone
        setIsIncludeDone(toggleRemoveDone)
        dispatch(toggleIsDone(toggleRemoveDone))
    }

    /* EVENT HANDLER */
    const inputText = useRef()
    const handleOnClear = () => {
        setTodo(initTodo)
        inputText.current.focus()
    }
    const handleTextOnChange = e => {
        e.preventDefault()

        const todoInput = e.target.value
        setTodo(todoInput)
        if(todoInput.trim()) showAlert()
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()

        let trimmedTodo = todo
        if(trimmedTodo.trim()) {
            const newTodo = {
                id: Math.random(),
                text: todo,
                isDone: false
            }
            dispatch(addTodo(newTodo))
            handleOnClear()
            // showAlert(true, "success", "Item added!")
        } else {
            showAlert(true, "danger", "Pleaser provide task detail")
        }
    }

    /* OPTIONAL RENDERING */
    const doneCount = todos.filter(({isDone}) => isDone).length
    const toggleDoneCountBadge = () => (
        doneCount > 0 &&   
        <div className="todo__toggle" onClick={filterIsDoneTodo}>
            <span className="todo__badge">{isIncludeDone ? "+" : "--"}</span>
            <span>Done</span>
            <span>({doneCount})</span>
        </div>
    )
    const renderClearButton = () => (
        todo && todo.length > 0 && 
        <button 
            className="todo__clearbutton" 
            onClick={handleOnClear}>clear
        </button>
    )
    const renderAlertMessage = () => (
        alert.show && 
        <Alert 
            type={alert.type} 
            msg={alert.msg} 
            removeAlert={showAlert}
        />
    )
    const renderTodoItems = () => (
        localTodos && localTodos.length > 0
        ? localTodos.map(({ id, text, isDone }) => (
            <ToDoItem 
                key={id} 
                id={id} 
                text={text} 
                isDone={isDone} 
            />
        ))
        : todos.length > 0
            ? <p>&#128526; No more tasks left &#128525;</p>
            : <p>No tasks found</p>
        
    )

    /* Alert display */
    const showAlert = (show=false, type, msg) => setAlert({ show, type, msg })

    return (
        <div className="todo">
            <div className="todo__label">
                <h3>To-Do List</h3>
                <div>
                    { toggleDoneCountBadge() }
                </div>
            </div>
            <div className="todo__container">
                { renderAlertMessage() }
                <div className="todo__submit">
                    <h3>+</h3>
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <input 
                            ref={inputText}
                            placeholder="New task..."
                            type="text"
                            maxLength="400"
                            value={todo}
                            onChange={handleTextOnChange}
                        />
                        <button type="submit" style={{ display: "none" }}></button>
                    </form>
                    { renderClearButton() }
                </div>
                <hr/>
                <div className="todo__items">
                    { renderTodoItems() }
                </div>
            </div>
        </div>
    )
}

export default ToDo
