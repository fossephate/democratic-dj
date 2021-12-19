const IP = "https://fosse.co";
const PORT = 8001;
// react:
import React, { Component, lazy } from "react";
import ReactDOM from "react-dom";

// react-router:
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

// modals:

// material ui:
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

// notistack:
import { SnackbarProvider } from "notistack";

// components:
// import Loading from "shared/components/general/Loading.jsx";

// const Callback = lazy(() => import("components/Callback.jsx"));
import Callback from "components/Callback.jsx";

// const DJ = lazy(() => import("dj/App.jsx"));
// const Party = lazy(() => import("party/App.jsx"));

// redux:
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
let storeContext = React.createContext();

// import rootReducer from "./reducers";

import dj from "reducers/index.js";
import settings from "features/settings.js";

let rootReducer = combineReducers({
	dj,
	settings,
});

// components:
import App from "./App.jsx";

// libs:
import socketio from "socket.io-client";

class Index extends Component {
  constructor(props) {
    super(props);

    this.serverConnection = socketio(IP, {
      path: `/${PORT}/socket.io`,
      transports: ["polling", "websocket", "xhr-polling", "jsonp-polling"],
    });

    this.state = {
      theme: this.getTheme("spotify"),
    };

    let preloadedState = {
      settings: {},

      dj: {
        songs: {
          songName: "",
          songList: [],
          searchResults: [],
        },
      },

    //   form: {},
    };

	this.store = configureStore({
		reducer: rootReducer,
		preloadedState: preloadedState,
		// middleware: [this.sagaMiddleware],
	});

    // let currentValue = null;
    // this.store.subscribe(() => {
    //   let previousValue = currentValue;
    //   currentValue = this.store.getState().settings.theme;
    //   if (previousValue !== currentValue && previousValue !== null) {
    //     this.setState({ theme: this.getTheme(currentValue) });
    //   }
    // });
  }

  getTheme = (themeName) => {
    let theme = {};
    switch (themeName) {
      case "light":
        theme = {
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
        };
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
      case "spotify":
        theme = {
          palette: {
            type: "dark",
            primary: {
              main: "#1db954",
            },
            secondary: {
              main: "#121212",
            },
            background: {
              paper: "#424242",
            },
          },
        };
        break;
    }
    return createTheme(theme);
  };

  componentDidMount() {
    // this.switchTheme("dark");
    // this.switchTheme("spotify");
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    console.log("re-rendering dj-index");

    return (
      <Provider store={this.store}>
        <ThemeProvider theme={this.state.theme}>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            {/* <App
              {...this.props}
              serverConnection={this.serverConnection}
              // sagaMiddleware={this.sagaMiddleware}
            /> */}
            <BrowserRouter>
              <Switch>
                <Route
                  path="/dj/callback"
                  render={(props) => {
                    return <Callback {...props} store={this.store} />;
                  }}
                />
                <Route
                  path="/"
                  render={(props) => {
                    return <App {...props} store={this.store} serverConnection={this.serverConnection} />;
                  }}
                />
              </Switch>
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default Index;

ReactDOM.render(<Index />, document.getElementById("root"));
