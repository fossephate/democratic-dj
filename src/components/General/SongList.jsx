// react:
import React, { PureComponent } from "react";
// import PropTypes from "prop-types";

// components:
import Song from "./Song.jsx";

// material ui:
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// redux:
import { connect } from "react-redux";

// recompose:
import { compose } from "recompose";

// libs:
import swal from "sweetalert2";

// jss:

const styles = (theme) => ({
	root: {
		// display: "flex",
		display: "grid",
		flexDirection: "column",
		gridGap: "10px",
	},
});

class SongList extends PureComponent {
	constructor(props) {
		super(props);

		// this.handleClick = this.handleClick.bind(this);

		this.state = {};
	}

	handleClick(event) {}

	mapSongs() {
		let songs = [];
		for (let i = 0; i < this.props.songList.length; i++) {
			let song = this.props.songList[i];
			songs.push(
				<Song
					key={i}
					serverConnection={this.props.serverConnection}
					username={this.props.username}
					songData={{ ...song }}
				/>,
			);
		}
		return songs;
	}

	render() {
		const { classes } = this.props;

		return (
			<Paper id="songList" className={classes.root} elevation={4}>
				{this.mapSongs()}
			</Paper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		songList: state.songs.songList,
	};
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
)(SongList);
