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
		lineHeight: "150px",
		paddingLeft: "3%",
		fontSize: "20px",
		height: "150px",
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
});

class Result extends PureComponent {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		// this.handleDownvote = this.handleDownvote.bind(this);

		this.state = {
			upvoteState: 0,
		};
	}

	componentDidMount() {}

	handleClick() {
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

	render() {
		const { classes } = this.props;

		let image = this.props.album.images[1];

		return (
			<Paper className={classes.root} elevation={4}>
				<img src={image.url} width={150} height={150} />
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
)(Result);
