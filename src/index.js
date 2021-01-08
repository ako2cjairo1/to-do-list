import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import GlobalStore from "./store/store"

ReactDOM.render(
    <GlobalStore>
        <App />
    </GlobalStore>,
    document.getElementById("root")
)