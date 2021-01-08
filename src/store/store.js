import { createStore } from "redux"
import { Provider } from "react-redux"

import rootReducer from "./reducers"

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default function GlobalStore(props) {
    return(
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}

