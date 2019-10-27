// react:
import React, { PureComponent } from "react";
// import PropTypes from "prop-types";

// components:
// import Message from "./Message.jsx";

// material ui:
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper, TextField } from "@material-ui/core";

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
		};
	}

	componentDidMount() {
		this.socket = this.props.serverConnection;
	}

	handleText(event) {
		this.setState({ songName: event.target.value });
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
	}

	render() {
		const { classes } = this.props;

		return (
			<Paper
				id="songSubmitForm"
				className={classes.root}
				elevation={4}
				ref={(el) => {
					this.rootRef = el;
				}}
			>
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
	return {};
};

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)(SongSubmitForm);
