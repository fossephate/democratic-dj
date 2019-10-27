// react:
import React, { PureComponent } from "react";
// import PropTypes from "prop-types";

// components:
// import SearchResults from "./SearchResults.jsx";

// material ui:
import { withStyles } from "@material-ui/core/styles";
import { Paper, TextField } from "@material-ui/core";

// redux:
import { connect } from "react-redux";

import { updateSongName, updateSearchResults } from "src/actions/songs.js";

// recompose:
import { compose } from "recompose";

// libs:
// import swal from "sweetalert2";

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	var later = function() {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function() {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
}

let searchForSong = throttle((self, value) => {
	self.socket.emit("searchSong", { songName: value }, (data) => {
		self.props.updateSearchResults(data.searchResults);
	});
}, 500);

// jss:

const styles = (theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		// marginBottom: "2%",
		minHeight: "14vh",
	},
	textField: {
		margin: "2%",
	},
});

class SongSubmitForm extends PureComponent {
	constructor(props) {
		super(props);

		this.socket = null;

		this.handleText = this.handleText.bind(this);

		this.state = {
			songName: "",
			searchResults: [],
		};
	}

	componentDidMount() {
		this.socket = this.props.serverConnection;
	}

	handleText(event) {
		// this.setState({ songName: event.target.value });
		this.props.updateSongName(event.target.value);

		// don't bother if the string is empty:
		if (event.target.value === "") {
			this.props.updateSearchResults([]);
			return;
		}

		// this.socket.emit("searchSong", { songName: event.target.value }, (data) => {
		// 	// console.log(data.searchResults);
		// 	this.props.updateSearchResults(data.searchResults);
		// });

		searchForSong(this, event.target.value);
	}

	render() {
		const { classes } = this.props;

		return (
			<Paper id="songSubmitForm" className={classes.root} elevation={4}>
				<TextField
					id="outlined-name"
					label="Enter a Song"
					className={classes.textField}
					value={this.props.songName}
					onChange={this.handleText}
					margin="normal"
					variant="outlined"
					fullWidth
				/>
			</Paper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		songName: state.songs.songName,
	};
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
)(SongSubmitForm);
