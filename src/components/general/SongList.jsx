// react:
import React, { PureComponent } from "react";
// import PropTypes from "prop-types";

// components:
import Song from "./Song.jsx";

// material ui:
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

// redux:
import { connect } from "react-redux";

// recompose:
import { compose } from "recompose";

// libs:
import FlipMove from "react-flip-move";
// import swal from "sweetalert2";

// jss:

const styles = (theme) => ({
	root: {
		// display: "flex",
		display: "grid",
		flexDirection: "column",
		gridGap: "5px",
		padding: "10px",
		overflowY: "auto",
		overflowX: "hidden",
		position: "relative",
		margin: "10px 0",
	},
	noSongs: {
		textAlign: "center",
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

		for (let i = 0; i < this.props.source.length; i++) {
			let song = this.props.source[i];
			songs.push(
				<Song
					key={song.uri}
					num={i}
					serverConnection={this.props.serverConnection}
					username={this.props.username}
					songData={{ ...song }}
					isResult={this.props.type === "results"}
				/>,
			);
		}

		if (songs.length === 0) {
			songs.push(
				<div key={0} className={this.props.classes.noSongs}>
					{this.props.type === "songs" ? "No songs submitted yet!" : "No Songs Found!"}
				</div>,
			);
		}
		return songs;
	}

	render() {
		const { classes } = this.props;

		if (this.props.source.length === 0) {
			return (
				<Paper id="songList" className={classes.root} elevation={4}>
					<div key={0} className={this.props.classes.noSongs}>
						{this.props.type === "songs" ? "No songs submitted yet!" : "No Songs Found!"}
					</div>
				</Paper>
			);
		}

		return (
			<Paper id="songList" className={classes.root} elevation={4}>
				{/* {this.mapSongs()} */}
				<FlipMove
					typeName={null}
					duration={250}
					staggerDelayBy={0}
					enterAnimation="fade"
					leaveAnimation="fade"
				>
					{this.mapSongs()}
				</FlipMove>
				<div style={{ height: "4px" }} />
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
	connect(mapStateToProps, mapDispatchToProps),
)(SongList);
