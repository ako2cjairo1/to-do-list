import React from 'react'
import { useDispatch } from "react-redux"

import "./styles.css"
import { deleteTodo, toggleTodo } from "../../../store/actions/todoActions"

export default function ToDoItem({ id, text, isDone }) {
    const doneTodoStyle = {
        textDecoration: isDone ? "line-through" : "none",
        color: isDone ? "gray" : "black"
    }

    const dispatch = useDispatch()
    const handleDelete = () => dispatch(deleteTodo(id))
    const handleToggle = () => dispatch(toggleTodo(id))

    return (
        <li className="todo__item">
            <input 
                type="checkbox"
                checked={isDone}
                onChange={handleToggle}
            />
            <p style={doneTodoStyle}>{text}</p>
            <button onClick={handleDelete}>delete</button>
        </li>
    )
}
