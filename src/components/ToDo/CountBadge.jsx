import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { todoRemoveDoneItemsToggled, getIsDoneTodos } from "../../store/todo"

export default function DoneCountBadge() {
    // Global state(s) 
    const { removeDoneItems, ...state } = useSelector(state => state.todo)

    // Handler(s)
    const dispatch = useDispatch()
    const handleToggleIsIncludeDone = () => dispatch(todoRemoveDoneItemsToggled());
    
    // Selector(s)
    const doneCount = getIsDoneTodos(state).length

    return(
        doneCount > 0 &&
        <div>
            <div className="todo__toggle" onClick={handleToggleIsIncludeDone}>
                <span className="todo__badge">{removeDoneItems ? "+" : "--"}</span>
                <span>Done</span>
                <span>({doneCount})</span>
            </div>
        </div>
    )
}