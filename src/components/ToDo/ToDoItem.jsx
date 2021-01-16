import React from 'react'
import { useDispatch } from "react-redux"

import "./styles.css"
import { todoIsDoneToggled, todoDeleted } from "../../store/todo"

export default function ToDoItem({ id, text, isDone }) {
    const doneTodoStyle = {
        textDecoration: isDone ? "line-through" : "none",
        color: isDone ? "gray" : "black"
    }
    const dispatch = useDispatch()
    const handleCheckBoxToggle = () => dispatch(todoIsDoneToggled({ id }))
    const handleDeleteTodo = () => dispatch(todoDeleted({ id }))

    return (
        <li className="todo__item">
            <input 
                type="checkbox"
                checked={isDone}
                onChange={handleCheckBoxToggle}
            />
            <p style={doneTodoStyle}>{text}</p>
            <button onClick={handleDeleteTodo}>delete</button>
        </li>
    )
}
