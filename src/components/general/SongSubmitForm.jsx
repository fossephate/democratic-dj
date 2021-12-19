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

import { updateSongName, updateSearchResults } from "features/songs.js";

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
	let context, args, result;
	let timeout = null;
	let previous = 0;
	if (!options) {
		options = {};
	}
	let later = () => {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) {
			context = args = null;
		}
	};
	return function() {
		let now = Date.now();
		if (!previous && options.leading === false) previous = now;
		let remaining = wait - (now - previous);
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
	// moved to debounce fn bc otherwise it can happen out of order:
	if (value === "") {
		self.props.updateSearchResults([]);
		return;
	}

	self.socket.emit("searchSong", { songName: value }, (data) => {
		self.props.updateSearchResults(data.searchResults);
	});
}, 500);

// jss:

const styles = (theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
	},
	textField: {
		margin: "2%",
	},
});

class SongSubmitForm extends PureComponent {
	constructor(props) {
		super(props);

		this.socket = null;

		this.state = {
			songName: "",
			searchResults: [],
		};
	}

	componentDidMount() {
		this.socket = this.props.serverConnection;
	}

	handleText = (event) => {
		this.props.updateSongName(event.target.value);
		searchForSong(this, event.target.value);
	};

	render() {
		const { classes } = this.props;

		return (
			<Paper id="songSubmitForm" className={classes.root} elevation={4}>
				<TextField
					id="songSearchField"
					label="Enter a Song or Artist Name"
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
		songName: state.dj.songs.songName,
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
	connect(mapStateToProps, mapDispatchToProps),
)(SongSubmitForm);
