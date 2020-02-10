import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import rootReducer from "./reducers"

const initialState = {}

const middleware = [thunk, logger, promise]
const middlewareNoLogger = [thunk, promise]
let store
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
	store = createStore(
		rootReducer,
		initialState,
		compose(applyMiddleware(...middleware))
	)
} else {
	store = createStore(
		rootReducer,
		initialState,
		compose(applyMiddleware(...middlewareNoLogger))
	)
}

export function getNewStore() {
	return createStore(
		rootReducer,
		initialState,
		compose(applyMiddleware(...middleware))
	)
}

export function getTestMiddleware() {
	return middlewareNoLogger
}

export default store
