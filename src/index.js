import React from "react"
import { Provider } from "react-redux"
import ReactDOM from "react-dom"

import App from "./App"
import ConfigureStore from "./store/configureStore"

const store = ConfigureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)