// react:
import React, { Component } from "react";
import ReactDOM from "react-dom";
// react-router:
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

// material ui:
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

// components:
import App from "src/App.jsx";

// redux:
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "./reducers";

// actions:

// // redux-saga:
import createSagaMiddleware from "redux-saga";

// libs:
import socketio from "socket.io-client";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let preloadedState = {
	songs: {
		songList: [],
		searchResults: [],
	},
	form: {},
};

const store = createStore(
	rootReducer,
	preloadedState,
	composeEnhancers(applyMiddleware(sagaMiddleware)),
);

let serverConnection = socketio("https://democraticdj.io", {
	path: "/8099/socket.io",
	transports: ["polling", "websocket", "xhr-polling", "jsonp-polling"],
});

// import handleAccountEvents from "src/sockets/account";
// listen to events and dispatch actions:
// handleAccountEvents(accountServerConnection, store.dispatch);

// handle outgoing events & listen to actions:
// and maybe dispatch more actions:
// sagaMiddleware.run(handleActions, {
// 	socket,
// });

class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: createMuiTheme({}),
		};

		this.switchTheme = this.switchTheme.bind(this);
	}

	componentDidMount() {
		this.switchTheme("dark");
	}

	switchTheme(themeName) {
		let theme = {};
		switch (themeName) {
			case "light":
				theme = /*merge(this.state.theme, */ {
					palette: {
						type: "light",
						primary: {
							main: "#2181ff", // #2181ff
						},
						secondary: {
							main: "#ff3b3b",
						},
						background: {
							paper: "#fafafa",
						},
					},
				} /*)*/;
				break;
			case "dark":
				theme = {
					palette: {
						type: "dark",
						primary: {
							main: "#2181ff", // #2181ff
						},
						secondary: {
							main: "#ff3b3b",
						},
						background: {
							paper: "#424242",
						},
					},
				};
				break;
			case "spooky":
				theme = {
					palette: {
						type: "dark",
						primary: {
							main: "#ff7930",
						},
						secondary: {
							main: "#000",
							// main: "#a73ae7",
						},
						background: {
							paper: "#2f2f2f",
						},
					},
				};
				break;
		}
		// this.theme = createMuiTheme(this.theme);
		this.setState({ theme: createMuiTheme(theme) });
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	render() {
		console.log("re-rendering index");

		return (
			<Provider store={store}>
				<ThemeProvider theme={this.state.theme}>
					<CssBaseline />
					<BrowserRouter>
						{/* selects the first matching path: */}
						<Switch>
							<Route
								path="/"
								render={(props) => {
									return (
										<App
											{...props}
											store={store}
											serverConnection={serverConnection}
											sagaMiddleware={sagaMiddleware}
										/>
									);
								}}
							/>
						</Switch>
					</BrowserRouter>
				</ThemeProvider>
			</Provider>
		);
	}
}

export default Index;

ReactDOM.render(<Index />, document.getElementById("root"));
