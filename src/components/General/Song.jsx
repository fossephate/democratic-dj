// react:
import React, { PureComponent } from "react";

// material ui:
import { withStyles } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

// components:
import { IconButton, Paper } from "@material-ui/core";

// redux:
import { connect } from "react-redux";

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
		display: "flex",
		flexDirection: "column",
		lineHeight: "38px",
		margin: "auto 0",
	},
	icon: {
		// width: "70px",
		// height: "70px",
	},
	songUpvotes: {
		// width: "30px",
		textAlign: "center",
		lineHeight: "48px",
	},
	upvoteArea: {
		display: "flex",
		flexDirection: "column",
	},
	songSuggester: {
		marginLeft: "auto",
		marginRight: "20px",
		fontSize: "15px",
	},
});

class Song extends PureComponent {
	constructor(props) {
		super(props);

		this.handleUpvote = this.handleUpvote.bind(this);
		this.handleDownvote = this.handleDownvote.bind(this);

		this.upvoteState = 0;
	}

	componentDidMount() {}

	// shouldComponentUpdate(nextProps, nextState) {

	// }

	componentWillUnmount() {
		// this.setState({ upvoteState: 0 });
	}

	handleUpvote() {
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
	}

	handleDownvote() {
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
	}

	neutralVote() {
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
	}

	render() {
		const { classes } = this.props;

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

		let isMobile = window.innerWidth < 900;
		let image = this.props.songData.album.images[isMobile ? 2 : 1];
		let size = isMobile ? 64 : 150;

		return (
			<Paper className={classes.root} elevation={4}>
				<div className={classes.upvoteArea}>
					<IconButton
						variant="contained"
						color="primary"
						size="medium"
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
						size="medium"
						onClick={this.handleDownvote}
						className={classNames(
							classes.icon,
							this.upvoteState === -1 && classes.highlighted,
						)}
					>
						<ArrowDownwardIcon />
					</IconButton>
				</div>

				<img src={image.url} width={size} height={size} />
				<div style={{ width: "20px" }}></div>

				<div className={classes.songName}>
					<span>{this.props.songData.songName}</span>
					<span>{this.props.songData.album.artists[0].name}</span>
				</div>
				<div className={classes.songSuggester}>
					suggested by: {this.props.songData.username}
				</div>
			</Paper>
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
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)(Song);
