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
import swal from "sweetalert2";

// jss:

const styles = (theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		height: "70px",
		lineHeight: "70px",
		paddingLeft: "3%",
		fontSize: "20px",
	},
});

class Song extends PureComponent {
	constructor(props) {
		super(props);

		this.handleUpvote = this.handleUpvote.bind(this);
		this.handleDownvote = this.handleDownvote.bind(this);

		this.state = {};
	}

	componentDidMount() {}

	handleUpvote() {
		this.props.serverConnection.emit(
			"vote",
			{
				songName: this.props.songName,
				type: "up",
			},
			(data) => {
				console.log(data);
			},
		);
	}

	handleDownvote() {
		console.log("a");
		this.props.serverConnection.emit(
			"vote",
			{
				songName: this.props.songName,
				type: "down",
			},
			(data) => {
				console.log(data);
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
				>
					<ArrowUpwardIcon />
				</IconButton>
				{this.props.upvotes}
				<IconButton
					variant="contained"
					color="secondary"
					size="medium"
					onClick={this.handleDownvote}
				>
					<ArrowDownwardIcon />
				</IconButton>
				<div style={{ width: "100px" }}></div>
				{this.props.songName}
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
