import React from "react"
import "./App.css"
import LineBreakTag from "./components/tags/LineBreakTag"
import CenterAlignmentTag from "./components/tags/CenterAlignmentTag"
import parser from "bbcode-to-react"
import MOTD from "./container/MOTD"
import CommentTag from "./components/tags/CommentTag"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { CookiesProvider } from "react-cookie"
import store from "./redux/store"
import LoadingScreen from "./container/LoadingScreen"

parser.registerTag("br", LineBreakTag) // new line tag
parser.registerTag("cent", CenterAlignmentTag) // new line tag
parser.registerTag("comment", CommentTag) // new line tag

function App() {
	return (
		<Provider store={store}>
			<CookiesProvider>
				<Router>
					<Switch>
						<Route exact path="/jbmotd">
							<MOTD parser={parser} />
						</Route>
						<Route exact path="/loadingscreen">
							<LoadingScreen />
						</Route>
						<Route>
							<MOTD parser={parser} />
						</Route>
					</Switch>
				</Router>
			</CookiesProvider>
		</Provider>
	)
}

export default App
