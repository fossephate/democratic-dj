// react:
import React, { PureComponent } from "react";

// react-router:
import { withRouter } from "react-router";

// redux:
import { connect } from "react-redux";

// material ui:
import { withStyles } from "@material-ui/core/styles";

// recompose:
import { compose } from "recompose";

// libs:
import { device } from "shared/libs/utils.js";
import queryString from "query-string";
import localforage from "localforage";

// jss:
const styles = {
	root: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		// height: "100vh",
		justifyContent: "center",
		margin: "0 auto",
		maxWidth: "700px",
	},
	[device.tablet]: {
		root: {},
	},
	[device.laptop]: {
		root: {},
	},

	links: {
		display: "flex",
		flexDirection: "column",
	},
};

class Callback extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		let values = queryString.parse(this.props.location.search);
		// localforage
		// 	.setItem("dj:code", values.code)
		// 	.then(() => {
		// 		return localforage.getItem("dj:roomInfo");
		// 	})
		// 	.then((value) => {
		// 		this.props.history.replace(`/dj/${value.roomName}`);
		// 	})
		// 	.catch((error) => {
		// 		console.log("error getting/setting value!: " + error);
		// 	});

		if (values.code) {
			let roomName = null;
			localforage
				.getItem("dj:roomInfo")
				.then((value) => {
					roomName = value.roomName;
					return localforage.setItem("dj:roomInfo", { ...value, code: values.code });
				})
				.then(() => {
					this.props.history.replace(`/dj/${roomName}`);
				})
				.catch((error) => {
					console.log("error getting/setting value!: " + error);
				});
		} else {
			console.log("no access code!");
		}
	}

	componentWillUnmount() {}

	render() {

		const { classes } = this.props;

		return (
			<div className={classes.root}>
				{/* <StreamsAppBar
					history={this.props.history}
				/> */}

				{/* <ProjectList /> */}

				{/* selects the first matching path: */}
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
)(Callback);
