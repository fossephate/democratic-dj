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
import Party from "src/Party.jsx";

// components:

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
		flexDirection: "column",
		justifyContent: "space-evenly",
		height: "500px",
		padding: "5% 20%",
		height: "95vh",
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
		// padding: "0 20%",
	},
	centerText: {
		display: "flex !important",
		justifyContent: "center !important",
	},
	joinButton: {
		whiteSpace: "nowrap",
	},
};

class App extends Component {
	constructor(props) {
		super(props);
		this.socket = null;

		this.handleJoin = this.handleJoin.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
		this.handleText = this.handleText.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			roomName: "",
			open: false,
		};
	}

	componentDidMount() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
		this.socket = this.props.serverConnection;

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

	handleJoin() {
		this.props.history.push(`party/${this.state.roomName}`);
	}

	handleCreate() {
		this.socket.emit("createRoom", null, (data) => {
			if (data.success) {
				this.setState({ open: true, roomName: data.roomName });
			} else {
				alert(data.reason);
			}
		});
	}

	handleClose() {
		this.props.history.push(`party/${this.state.roomName}`);
		this.setState({ open: false });
	}

	handleText(event) {
		// console.log(event.target.value);
		this.setState({ roomName: event.target.value });
	}

	render() {
		console.log("re-rendering app.");

		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Switch>
					<Route
						path="/party/:roomName"
						render={(props) => {
							return (
								<Party
									{...props}
									store={this.props.store}
									serverConnection={this.props.serverConnection}
									// sagaMiddleware={this.props.sagaMiddleware}
								/>
							);
						}}
					/>
					<Route
						path="/"
						render={(props) => {
							return (
								<Paper elevation={4} className={classes.mainContainer}>
									<h1 style={{ textAlign: "center" }}>Democratic DJ</h1>
									<div className={classes.formPart}>
										<TextField
											id="outlined-name"
											label="Room Name"
											className={classes.textField}
											value={this.state.roomName}
											onChange={this.handleText}
											margin="normal"
											variant="outlined"
										/>
										<Button
											className={classes.joinButton}
											variant="contained"
											color="primary"
											size="medium"
											onClick={this.handleJoin}
											onKeyPress={(event) => {
												if (event.key == "Enter") {
													this.handleJoin();
												}
											}}
										>
											Join Room
										</Button>
									</div>
									<h2 className={classes.centerText}>OR</h2>
									<div className={classes.formPart}>
										<Button
											variant="contained"
											color="secondary"
											size="large"
											onClick={this.handleCreate}
										>
											Create A Room
										</Button>
									</div>

									<Dialog
										open={this.state.open}
										onClose={this.handleClose}
										fullWidth={true}
										maxWidth="md"
									>
										<DialogTitle id="alert-dialog-title">{"Room Created!"}</DialogTitle>
										<DialogContent>
											<DialogContentText id="alert-dialog-description">
												A room has been created with the room name {this.state.roomName}
											</DialogContentText>
										</DialogContent>
										<DialogActions>
											<Button
												onClick={this.handleClose}
												color="primary"
												variant="contained"
											>
												OK
											</Button>
										</DialogActions>
									</Dialog>
								</Paper>
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
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)(App);
