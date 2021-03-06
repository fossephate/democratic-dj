// react:
import React, { PureComponent } from "react";

// react-router:
import { withRouter } from "react-router";

// redux:
import { connect } from "react-redux";

// redux-saga:
// import handleStreamActions from "src/sagas/stream";
// import handleStreamEvents from "src/sockets/stream";

import { updateSongList } from "src/actions/songs.js";

// main components:

// components:
import SongList from "src/components/General/SongList.jsx";
import SongSubmitForm from "src/components/General/SongSubmitForm.jsx";
import SearchResults from "src/components/General/SearchResults.jsx";

// secondary components:
import { Button, TextField } from "@material-ui/core";
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

// jss:
const styles = {
	root: {
		display: "flex",
		flexDirection: "column",
		// justifyContent: "space-between",
		height: "94vh",
		fontSize: "10px",
	},
	[device.tablet]: {
		root: {
			fontSize: "20px",
		},
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
	exportButton: {
		marginTop: "10px",
	},
};

class Party extends PureComponent {
	constructor(props) {
		super(props);
		this.socket = null;

		this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
		this.handleText = this.handleText.bind(this);
		this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this);

		this.state = {
			username: "",
			roomName: "",
			openUsernameDialog: true,
			// songList: [],
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

		this.socket = this.props.serverConnection;

		this.roomName = this.props.match.params.roomName;

		if (!this.roomName) {
			console.log("room name not set!");
		}

		this.socket.on("songList", (data) => {
			// this.songList = data.songList;
			// this.setState({ songList: data.songList });
			this.props.updateSongList(data.songList);
			// this.props.store.dispatch(updateSongList({ songList: data.songList }));
		});
	}

	componentWillUnmount() {}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return false;
	// }

	handleSubmitUsername() {
		if (this.state.username === "") {
			alert("username can't be empty");
			return;
		}

		this.socket.emit(
			"joinRoom",
			{ roomName: this.roomName, username: this.state.username },
			(data) => {
				if (data.success) {
					this.setState({ openUsernameDialog: false });
				} else {
					alert(data.reason);
				}
			},
		);
	}

	handleText(event) {
		this.setState({ username: event.target.value });
	}

	handleCreatePlaylist() {
		this.socket.emit("createPlaylist", null, (data) => {
			if (!data.success) {
				console.log(data.reason);
			} else {
				console.log(data.playlist);
			}
		});
	}

	render() {
		console.log("re-rendering party.");

		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<SongSubmitForm serverConnection={this.props.serverConnection} />
				{this.props.searchResults.length > 0 && (
					<SearchResults serverConnection={this.props.serverConnection} />
				)}
				{this.props.searchResults.length === 0 && (
					<>
						<div style={{ height: "30px" }} />
						<SongList
							serverConnection={this.props.serverConnection}
							username={this.state.username}
						/>
					</>
				)}
				<Button
					className={classes.exportButton}
					onClick={this.handleCreatePlaylist}
					color="primary"
					variant="contained"
				>
					Export to Spotify
				</Button>
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
							onKeyPress={(event) => {
								if (event.key == "Enter") {
									this.handleSubmitUsername();
								}
							}}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={this.handleSubmitUsername}
							color="primary"
							variant="contained"
						>
							Submit
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		searchResults: state.songs.searchResults,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSongList: (data) => {
			dispatch(updateSongList(data));
		},
	};
};

export default compose(
	withRouter,
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)(Party);
