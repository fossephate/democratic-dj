// react:
import React, { Component } from "react";

// react-router:
import { Route, Switch, withRouter } from "react-router";

// redux:
import { connect } from "react-redux";

import { updateClientInfo } from "src/actions/clientInfo.js";
import { updateSettings } from "src/actions/settings.js";
import { updateMessages } from "src/actions/chat.js";
import { leavePlayerControlQueue, joinPlayerControlQueue } from "src/actions/players.js";

// redux-saga:
import handleStreamActions from "src/sagas/stream";
import handleStreamEvents from "src/sockets/stream";

// main components:

// loading circle:
// import LoadingCircle from "src/components/LoadingCircle.jsx";

// components:

// secondary components:

// material ui:
import { withStyles } from "@material-ui/core/styles";

// recompose:
import { compose } from "recompose";

// device sizes:
import { device } from "src/constants/DeviceSizes.js";

// libs:
// jquery:
let $ = require("jquery");
window.$ = $;

// input handler:

// const textFitPercent = require("js/textfitpercent.js");
import localforage from "localforage";
window.localforage = localforage;
import swal from "sweetalert2";
window.swal = swal;
import socketio from "socket.io-client";

// jss:
const styles = {
	root: {},
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

		this.state = {};
	}

	componentDidMount() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
		this.socket = socketio(`https://democraticdj.io`, {
			path: `/8099/socket.io`,
			transports: ["polling", "websocket", "xhr-polling", "jsonp-polling"],
		});
		window.socket = this.socket;

		// // listen to events and dispatch actions:
		// handleStreamEvents(this.socket, this.props.store.dispatch);
		// // handle outgoing events & listen to actions:
		// // and maybe dispatch more actions:
		// this.props.sagaMiddleware.run(handleStreamActions, {
		// 	socket: this.socket,
		// 	dispatch: this.props.store.dispatch,
		// });
	}

	componentWillUnmount() {}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return false;
	// }

	render() {
		console.log("re-rendering app.");

		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<div>bbbbb</div>
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
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)(App);
