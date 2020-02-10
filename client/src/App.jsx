import React from "react"
import "./App.css"
import MOTD from "./container/MOTD/MOTD"
import Demo from "./container/Demo/Demo"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { CookiesProvider } from "react-cookie"
import { QueryParamProvider } from "use-query-params"

import store from "./redux/store"
import LoadingScreen from "./container/LoadingScreen/LoadingScreen"
import CustomParser from "./components/tags/CustomParser"
const parser = CustomParser()
function App() {
	return (
		<Provider store={store}>
			<CookiesProvider>
				<Router>
					<QueryParamProvider ReactRouterRoute={Route}>
						<Switch>
							<Route exact path="/jbmotd">
								<MOTD parser={parser} />
							</Route>
							<Route exact path="/loadingscreen">
								<LoadingScreen />
							</Route>
							<Route exact path="/demo">
								<Demo parser={parser} />
							</Route>
							<Route>
								<MOTD parser={parser} />
							</Route>
						</Switch>
					</QueryParamProvider>
				</Router>
			</CookiesProvider>
		</Provider>
	)
}

export default App
