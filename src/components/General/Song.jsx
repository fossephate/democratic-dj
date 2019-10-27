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

// jss:

const styles = (theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		// height: "70px",
		// lineHeight: "48px",
		lineHeight: "70px",
		paddingLeft: "3%",
		fontSize: "20px",
	},
	highlighted: {
		backgroundColor: "#FAFAD2AA",
	},
	songName: {
		// height: "70px",
	},
	icon: {
		width: "70px",
	},
	songUpvotes: {
		width: "30px",
		textAlign: "center",
	},
});

class Song extends PureComponent {
	constructor(props) {
		super(props);

		this.handleUpvote = this.handleUpvote.bind(this);
		this.handleDownvote = this.handleDownvote.bind(this);

		this.state = {
			upvoteState: 0,
		};
	}

	componentDidMount() {}

	handleUpvote() {
		if (this.state.upvoteState === 1) {
			this.neutralVote();
			return;
		}

		this.props.serverConnection.emit(
			"vote",
			{
				songName: this.props.songName,
				type: "up",
			},
			(data) => {
				if (data.success) {
					this.setState({ upvoteState: 1 });
				}
			},
		);
	}

	handleDownvote() {
		if (this.state.upvoteState === -1) {
			this.neutralVote();
			return;
		}

		this.props.serverConnection.emit(
			"vote",
			{
				songName: this.props.songName,
				type: "down",
			},
			(data) => {
				if (data.success) {
					this.setState({ upvoteState: -1 });
				}
			},
		);
	}

	neutralVote() {
		this.props.serverConnection.emit(
			"vote",
			{
				songName: this.props.songName,
				type: "neutral",
			},
			(data) => {
				if (data.success) {
					this.setState({ upvoteState: 0 });
				}
			},
		);
	}

	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.root} elevation={4}>
				<IconButton
					variant="contained"
					color="primary"
					size="medium"
					onClick={this.handleUpvote}
					className={classNames(
						classes.icon,
						this.state.upvoteState === 1 && classes.highlighted,
					)}
				>
					<ArrowUpwardIcon />
				</IconButton>
				<div className={classes.songUpvotes}>{this.props.upvotes}</div>
				{/* <div className={classes.spacer}></div> */}
				<IconButton
					variant="contained"
					color="secondary"
					size="medium"
					onClick={this.handleDownvote}
					className={classNames(
						classes.icon,
						this.state.upvoteState === -1 && classes.highlighted,
					)}
				>
					<ArrowDownwardIcon />
				</IconButton>
				<div style={{ width: "100px" }}></div>
				<div className={classes.songName}>{this.props.songName}</div>
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
