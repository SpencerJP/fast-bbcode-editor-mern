import React from "react"
import "./App.css"
import MOTD from "./container/MOTD/MOTD"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { CookiesProvider } from "react-cookie"
import store from "./redux/store"
import LoadingScreen from "./container/LoadingScreen/LoadingScreen"
import CustomParser from "./components/tags/CustomParser"
const parser = CustomParser()
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
