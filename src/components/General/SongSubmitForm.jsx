// react:
import React, { PureComponent } from "react";
// import PropTypes from "prop-types";

// components:
// import SearchResults from "./SearchResults.jsx";

// material ui:
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper, TextField } from "@material-ui/core";

// redux:
import { connect } from "react-redux";

import { updateSearchResults } from "src/actions/songs.js";

// recompose:
import { compose } from "recompose";

// libs:
// import swal from "sweetalert2";

// jss:

const styles = (theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		marginBottom: "2%",
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
		this.handleSubmitSong = this.handleSubmitSong.bind(this);

		this.state = {
			songName: "",
			searchResults: [],
		};
	}

	componentDidMount() {
		this.socket = this.props.serverConnection;
	}

	handleText(event) {
		this.setState({ songName: event.target.value });

		// don't bother if the string is empty:
		if (event.target.value === "") {
			this.props.updateSearchResults([]);
			return;
		}

		this.socket.emit("searchSong", { songName: event.target.value }, (data) => {
			// console.log(data.searchResults);
			this.props.updateSearchResults(data.searchResults);
		});
	}

	handleSubmitSong() {
		this.socket.emit(
			"submitSong",
			{
				songName: this.state.songName,
			},
			(data) => {
				if (!data.success) {
					alert(data.reason);
				}
			},
		);
		this.setState({ songName: "" });
	}

	render() {
		const { classes } = this.props;

		return (
			<Paper id="songSubmitForm" className={classes.root} elevation={4}>
				<TextField
					id="outlined-name"
					label="Song Name"
					className={classes.textField}
					value={this.state.songName}
					onChange={this.handleText}
					onKeyPress={(event) => {
						if (event.key == "Enter") {
							this.handleSubmitSong();
						}
					}}
					margin="normal"
					variant="outlined"
					fullWidth
				/>
				<Button onClick={this.handleSubmitSong} color="primary">
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
