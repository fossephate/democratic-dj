// react:
import React, { PureComponent } from "react";

// react-router:
import { withRouter } from "react-router";

// redux:
import { connect } from "react-redux";

// actions:
import { updateSettings } from "features/settings.js";

// redux-saga:

// main components:

// components:

// secondary components:
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";

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
		flexDirection: "column",
		justifyContent: "space-evenly",
		height: "100vh",
		width: "100%",
		maxWidth: "600px",
		maxHeight: "700px",
		margin: "auto 0",
	},
	[device.tablet]: {
		root: {},
	},
	[device.laptop]: {
		root: {
			maxWidth: "none",
			maxHeight: "none",
		},
	},

	textField: {
		margin: "0px",
	},
	formPart: {
		display: "flex",
		flexDirection: "row",
		// justifyContent: "space-evenly",
		justifyContent: "center",
		// width: "50%",
		height: "min-content",
		// padding: "0 20%",
		// margin: "0 5px",
	},
	centerText: {
		display: "flex !important",
		justifyContent: "center !important",
	},
	joinButton: {
		whiteSpace: "nowrap",
	},
};

class Main extends PureComponent {
	constructor(props) {
		super(props);
		this.socket = null;

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

		this.props.store.dispatch(updateSettings({ theme: "spotify" }));

		// // listen to events and dispatch actions:
		// handleStreamEvents(this.socket, this.props.store.dispatch);
		// // handle outgoing events & listen to actions:
		// // and maybe dispatch more actions:
		// this.props.sagaMiddleware.run(handleStreamActions, {
		// 	socket: this.socket,
		// 	dispatch: this.props.store.dispatch,
		// });
	}

	componentWillUnmount = () => {
		this.props.store.dispatch(updateSettings({ theme: "dark" }));
	};

	handleJoin = () => {
		this.props.history.push(`/dj/${this.state.roomName}`);
	};

	handleCreate = () => {
		this.socket.emit("createRoom", null, (data) => {
			if (data.success) {
				this.setState({ open: true, roomName: data.roomName });
			} else {
				alert(data.reason);
			}
		});
	};

	handleClose = () => {
		this.props.history.push(`/dj/${this.state.roomName}`);
		this.setState({ open: false });
	};

	handleText = (event) => {
		// console.log(event.target.value);
		this.setState({ roomName: event.target.value });
	};

	render() {
		console.log("re-rendering main");

		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<h1 style={{ textAlign: "center" }}>Democratic DJ</h1>

				<h2 className={classes.centerText}>Join a Room</h2>
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
					<div style={{ width: "10px" }} />
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
					maxWidth="sm"
				>
					<DialogTitle id="alert-dialog-title">{"Room Created!"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							A room has been created with the room name {this.state.roomName}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary" variant="contained">
							OK
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
	connect(mapStateToProps, mapDispatchToProps),
)(Main);
