import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./reducer"

export default function ConfigureStore() {
    return configureStore({
        reducer: rootReducer
    })
}