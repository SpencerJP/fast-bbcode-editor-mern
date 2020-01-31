import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import rootReducer from "./reducers"

const initialState = {}

const middleware = [thunk, logger, promise]

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)))

export default store
