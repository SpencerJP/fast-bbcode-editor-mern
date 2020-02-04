//This is our root reducer that we will input into our store

//Here we will combine all our reducers
import { combineReducers } from "redux"
import discordReducer from "./discordReducer"
import messageReducer from "./messageReducer"

const rootReducer = combineReducers({
	discordReducer: discordReducer,
	messageReducer: messageReducer,
})

export default rootReducer
