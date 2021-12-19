// react:
import React, { Component } from "react";

// react-router:
import { Route, Switch, withRouter } from "react-router";

// redux:
import { connect } from "react-redux";

// actions:
import { updateSettings } from "features/settings.js";

// redux-saga:

// main components:
import Main from "./Main.jsx";
import Room from "./Room.jsx";

// components:

// secondary components:

// material ui:
import { withStyles } from "@material-ui/core/styles";

// recompose:
import { compose } from "recompose";

// libs:
import { device } from "shared/libs/utils.js";

// jss:
const styles = {
	root: {
		display: "flex",
		justifyContent: "center",
		height: "100%",
	},
	[device.tablet]: {
		root: {},
	},
	[device.laptop]: {
		root: {},
	},
};

class App extends Component {
	constructor(props) {
		super(props);
		this.socket = null;

		this.state = {
			roomName: "",
			open: false,
		};
	}

	componentDidMount() {
		if (this.serverConnection) {
			this.serverConnection.close();
			this.serverConnection = null;
		}
		this.serverConnection = this.props.serverConnection;

		this.props.store.dispatch(updateSettings({ theme: "spotify" }));

		document.title = "Democratic DJ";

		// // listen to events and dispatch actions:
		// handleStreamEvents(this.socket, this.props.store.dispatch);
		// // handle outgoing events & listen to actions:
		// // and maybe dispatch more actions:
		// this.props.sagaMiddleware.run(handleStreamActions, {
		// 	socket: this.socket,
		// 	dispatch: this.props.store.dispatch,
		// });
	}

	//52#60952: *2 open() "/srv/www/fosse.co/htmlindex.html" failed (2: No such file or directory),
	// client: 107.199.173.141, server: fosse.co, request: "GET /dj/GKMLV/ HTTP/1.1", host: "fosse.co"
	// "/srv/www/fosse.co/html/projects/dj/public/dj/index.html" is not found (2: No such file or direc


	render() {
		console.log("re-rendering dj-app.");

		console.log(this.props.match.path);

		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Switch>
					<Route
						path={`${this.props.match.path}dj/:roomName`}
						render={(props) => {
							return (
								<Room
									{...props}
									store={this.props.store}
									serverConnection={this.props.serverConnection}
									// sagaMiddleware={this.props.sagaMiddleware}
								/>
							);
						}}
					/>
					<Route
						path={this.props.match.path}
						render={(props) => {
							return (
								<Main
									{...props}
									store={this.props.store}
									serverConnection={this.props.serverConnection}
									// sagaMiddleware={this.props.sagaMiddleware}
								/>
							);
						}}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default compose(
	withRouter,
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps),
)(App);
