// react:
import React, { PureComponent } from "react";

// material ui:
import { withStyles } from "@material-ui/core/styles";

// components:
import { Button, Paper } from "@material-ui/core";

// redux:
import { connect } from "react-redux";

import { updateSongName, updateSearchResults } from "src/actions/songs.js";

// recompose:
import { compose } from "recompose";

// libs:
import classNames from "classnames";

// device sizes:
import { device } from "src/constants/DeviceSizes.js";

// jss:

const styles = (theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		height: "64px",
		lineHeight: "64px",
		paddingLeft: "1%",
		fontSize: "14px",
	},
	[device.tablet]: {
		root: {
			height: "150px",
			lineHeight: "150px",
			fontSize: "20px",
		},
	},
	[device.laptop]: {
		root: {},
	},
	highlighted: {
		backgroundColor: "#FAFAD2AA",
	},
	songName: {
		// height: "70px",
	},
	// icon: {
	// 	width: "150px",
	// },
	// songUpvotes: {
	// 	width: "30px",
	// 	textAlign: "center",
	// },
	submitButton: {
		marginLeft: "auto",
		marginRight: "20px",
		marginTop: "auto",
		marginBottom: "auto",
	},
});

class Result extends PureComponent {
	constructor(props) {
		super(props);

		this.handleSubmitSong = this.handleSubmitSong.bind(this);
		// this.handleDownvote = this.handleDownvote.bind(this);

		this.state = {
			upvoteState: 0,
		};
	}

	componentDidMount() {
		this.socket = this.props.serverConnection;
	}

	handleSubmitSong() {
		this.socket.emit(
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
	}

	render() {
		const { classes } = this.props;

		let isMobile = window.innerWidth < 900;
		let image = this.props.songData.album.images[isMobile ? 2 : 1];
		let size = isMobile ? 64 : 150;

		return (
			<Paper className={classes.root} elevation={10}>
				<img src={image.url} width={size} height={size} />
				<div style={{ width: "20px" }}></div>
				<div className={classes.songName}>{this.props.songData.songName}</div>
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
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)(Result);
