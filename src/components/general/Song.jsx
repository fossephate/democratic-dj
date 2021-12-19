// react:
import React, { PureComponent } from "react";

// material ui:
import { withStyles } from "@material-ui/core/styles";

// components:
import { IconButton, Paper, Button } from "@material-ui/core";
import SongPreview from "./SongPreview.jsx";

// icons:
import {
	ArrowUpward as ArrowUpwardIcon,
	ArrowDownward as ArrowDownwardIcon,
	Close as CloseIcon,
} from "@material-ui/icons";

// redux:
import { connect } from "react-redux";

import { updateSongName, updateSearchResults } from "features/songs.js";

// recompose:
import { compose } from "recompose";

// libs:
import { device } from "shared/libs/utils.js";
import classNames from "classnames";

// jss:

const styles = (theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		minHeight: "85px",
		fontSize: "16px",
	},
	upvoteArea: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		margin: "0 10px",
	},
	songUpvotes: {
		alignSelf: "center",
		// position: "absolute",
		fontSize: "0.8em",
	},
	placeNum: {
		textAlign: "center",
		alignSelf: "center",
		margin: "0 10px",
		fontSize: "0.8em",
	},
	[device.tablet]: {
		root: {
			minHeight: "150px",
			fontSize: "20px",
		},
		upvoteArea: {
			justifyContent: "space-between",
			margin: "0 5px",
		},
		songUpvotes: {
			// position: "relative",
			fontSize: "1em",
		},
		placeNum: {
			margin: "0 5px",
			fontSize: "1em",
		},
	},
	[device.laptop]: {
		root: {},
	},
	highlighted: {
		backgroundColor: "#FAFAD2AA",
	},
	songName: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		"& span:last-child": {
			fontSize: "0.8em",
		},
	},
	icon: {
		// width: "70px",
		// height: "70px",
	},

	songSuggester: {
		// marginLeft: "auto",
		// marginRight: "20px",
		fontSize: "0.8em",
		// alignSelf: "center",
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
		justifyContent: "center",
		whiteSpace: "nowrap",
	},
	removeArea: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		marginRight: "10px",
	},
	submitButton: {
		marginLeft: "auto",
		marginRight: "10px",
		marginTop: "auto",
		marginBottom: "auto",
	},
});

class Song extends PureComponent {
	constructor(props) {
		super(props);
		this.upvoteState = 0;
	}

	componentDidMount() {}

	// shouldComponentUpdate(nextProps, nextState) {

	// }

	componentWillUnmount() {
		// this.setState({ upvoteState: 0 });
	}

	handleSubmitSong = () => {
		this.props.serverConnection.emit(
			"submitSong",
			{
				songData: this.props.songData,
			},
			(data) => {
				if (!data.success) {
					alert(data.reason);
				}
			},
		);
		this.props.updateSongName("");
		this.props.updateSearchResults([]);
	};

	handleUpvote = () => {
		if (this.upvoteState === 1) {
			this.neutralVote();
			return;
		}

		this.props.serverConnection.emit(
			"vote",
			{
				songName: this.props.songData.songName,
				type: "up",
			},
			(data) => {
				if (data.success) {
					// this.upvoteState = 1;
				}
			},
		);
	};

	handleDownvote = () => {
		if (this.upvoteState === -1) {
			this.neutralVote();
			return;
		}

		this.props.serverConnection.emit(
			"vote",
			{
				songName: this.props.songData.songName,
				type: "down",
			},
			(data) => {
				if (data.success) {
					// this.upvoteState = -1;
				}
			},
		);
	};

	neutralVote = () => {
		this.props.serverConnection.emit(
			"vote",
			{
				songName: this.props.songData.songName,
				type: "neutral",
			},
			(data) => {
				if (data.success) {
					// this.upvoteState = 0;
				}
			},
		);
	};

	handleRemove = () => {
		this.props.serverConnection.emit(
			"removeSong",
			{
				songName: this.props.songData.songName,
			},
			(data) => {
				if (data.success) {
				}
			},
		);
	};

	render() {
		const { classes } = this.props;

		let isMobile = window.innerWidth < 768;
		let albumImage = this.props.songData.album.images[isMobile ? 2 : 1];
		let buttonSize = isMobile ? "small" : "medium";

		if (this.props.isResult) {
			return (
				<Paper className={classes.root} elevation={4}>
					<SongPreview
						imageURL={albumImage.url}
						audioURL={this.props.songData.preview_url}
						songName={this.props.songData.songName}
						artistName={this.props.songData.album.artists[0].name}
					/>
					<div style={{ width: "20px" }}></div>
					<div className={classes.songName}>
						<span>{this.props.songData.songName}</span>
						<span>{this.props.songData.album.artists[0].name}</span>
					</div>
					<Button
						className={classes.submitButton}
						onClick={this.handleSubmitSong}
						color="primary"
						variant="contained"
						size="large"
					>
						Submit
					</Button>
				</Paper>
			);
		} else {
			let votes = this.props.songData.votes;
			for (let i = 0; i < votes.length; i++) {
				let vote = votes[i];
				if (vote.username === this.props.username) {
					if (vote.type === "up") {
						this.upvoteState = 1;
					} else if (vote.type === "down") {
						this.upvoteState = -1;
					} else if (vote.type === "neutral") {
						this.upvoteState = 0;
					}
					break;
				}
			}
			return (
				<Paper className={classes.root} elevation={4}>
					<div className={classes.placeNum}>#{this.props.num + 1}</div>
					<div className={classes.upvoteArea}>
						<IconButton
							variant="contained"
							color="primary"
							size={buttonSize}
							onClick={this.handleUpvote}
							className={classNames(
								classes.icon,
								this.upvoteState === 1 && classes.highlighted,
							)}
						>
							<ArrowUpwardIcon />
						</IconButton>
						<div className={classes.songUpvotes}>{this.props.songData.upvotes}</div>
						<IconButton
							variant="contained"
							color="secondary"
							size={buttonSize}
							onClick={this.handleDownvote}
							className={classNames(
								classes.icon,
								this.upvoteState === -1 && classes.highlighted,
							)}
						>
							<ArrowDownwardIcon />
						</IconButton>
					</div>
					<SongPreview
						imageURL={albumImage.url}
						audioURL={this.props.songData.preview_url}
						songName={this.props.songData.songName}
						artistName={this.props.songData.album.artists[0].name}
					/>
					<div style={{ width: "20px" }}></div>

					<div className={classes.songName}>
						<span>{this.props.songData.songName}</span>
						<span>{this.props.songData.album.artists[0].name}</span>
					</div>
					<div style={{ minWidth: "10px", flex: "1" }}></div>
					{/* <div className={classes.songSuggester}>
						<span>{"suggested by: "}</span>
						<span>{this.props.songData.username}</span>
					</div> */}
					<div style={{ width: "10px" }}></div>

					{this.props.songData.username === this.props.username && (
						<div className={classes.removeArea}>
							<IconButton
								variant="contained"
								color="secondary"
								size={buttonSize}
								onClick={this.handleRemove}
								className={classNames(
									classes.icon,
									this.upvoteState === -1 && classes.highlighted,
								)}
							>
								<CloseIcon />
							</IconButton>
						</div>
					)}
				</Paper>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSongName: (data) => {
			dispatch(updateSongName(data));
		},
		updateSearchResults: (data) => {
			dispatch(updateSearchResults(data));
		},
	};
};

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true }),
)(Song);
