// react:
import React, { Component } from "react";

// react-router:
import { Route, Switch, withRouter } from "react-router";

// redux:
import { connect } from "react-redux";

// redux-saga:
// import handleStreamActions from "src/sagas/stream";
// import handleStreamEvents from "src/sockets/stream";

// main components:

// components:
import SongList from "src/components/General/SongList.jsx";

// secondary components:
import { Button, Paper, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// material ui:
import { withStyles } from "@material-ui/core/styles";

// recompose:
import { compose } from "recompose";

// device sizes:
import { device } from "src/constants/DeviceSizes.js";

// libs:
import localforage from "localforage";
window.localforage = localforage;
import swal from "sweetalert2";
window.swal = swal;
import socketio from "socket.io-client";
import queryString from "query-string";

// jss:
const styles = {
	root: {},
	[device.tablet]: {
		root: {},
	},
	[device.laptop]: {
		root: {},
	},

	mainContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		height: "500px",
	},

	textField: {
		margin: "0px",
	},
	formPart: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		// width: "50%",
		height: "min-content",
	},
};

class Party extends Component {
	constructor(props) {
		super(props);
		this.socket = null;

		this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
		this.handleText = this.handleText.bind(this);

		this.state = {
			username: "",
			roomName: "",
			openUsernameDialog: true,
		};

		this.roomName = null;
	}

	componentDidMount() {
		// // listen to events and dispatch actions:
		// handleStreamEvents(this.socket, this.props.store.dispatch);
		// // handle outgoing events & listen to actions:
		// // and maybe dispatch more actions:
		// this.props.sagaMiddleware.run(handleStreamActions, {
		// 	socket: this.socket,
		// 	dispatch: this.props.store.dispatch,
		// });

		this.roomName = this.props.match.params.roomName;

		if (!this.roomName) {
			console.log("room name not set!");
		}
	}

	componentWillUnmount() {}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return false;
	// }

	handleSubmitUsername() {
		this.props.socket.emit("joinRoom", { room });

		this.setState({ openUsernameDialog: false });
	}

	handleText() {
		// todo:
		// submit text with enter key:
	}

	render() {
		console.log("re-rendering party.");

		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<div>a</div>

				<Dialog
					open={this.state.openUsernameDialog}
					onClose={() => {}}
					fullWidth={true}
					maxWidth="md"
				>
					<DialogTitle id="alert-dialog-title">Pick a username</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Username"
							type="username"
							value={this.state.username}
							onChange={this.handleText}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleSubmitUsername} color="primary">
							Submit
						</Button>
					</DialogActions>
				</Dialog>
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
)(Party);
