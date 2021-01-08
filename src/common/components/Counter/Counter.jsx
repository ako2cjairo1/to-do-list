import React from "react"

import "./styles.css"

const Counter = () => {
    return(
        <div className="container">
            <span className="counter">0</span>
            <div className="counter__buttons">
                <button> + </button>
                <button> - </button>
            </div>
        </div>
    )
}

export default Counter