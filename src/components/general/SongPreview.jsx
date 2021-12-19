// react:
import React, { PureComponent } from "react";

// material ui:
import { withStyles } from "@material-ui/core/styles";
// import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
// import CloseIcon from "@material-ui/icons/Close";

// components:
// import { IconButton, Paper, Button } from "@material-ui/core";
// import MySlider from "dj/components/General/MySlider.jsx";

// icons:
// import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PlayCircleFilledTwoToneIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
// import PauseIcon from "@material-ui/icons/Pause";
// import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
// import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PauseCircleFilledTwoToneIcon from "@material-ui/icons/PauseCircleFilledTwoTone";

// redux:
import { connect } from "react-redux";

// recompose:
import { compose } from "recompose";

// libs:
import { device } from "shared/libs/utils.js";

// jss:

const styles = (theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		minHeight: "75px",
		fontSize: "16px",
		position: "relative",
	},
	albumArt: {
		alignSelf: "center",
		width: "75px",
		height: "auto",
		cursor: "pointer",
		borderRadius: "8px",
	},
	icon: {
		pointerEvents: "none",
		fontSize: "50px",
		opacity: 0.7,
		position: "absolute",
		// left: "calc(50% - 0.5em)",
		// top: "calc(50% - 0.5em)",
		left: "50%",
		marginLeft: "-0.5em",
		top: "50%",
		marginTop: "-0.5em",
		filter: "brightness(0%)",
	},
	[device.tablet]: {
		root: {
			minHeight: "150px",
			fontSize: "20px",
		},
		albumArt: {
			width: "150px",
		},
		icon: {
			fontSize: "90px",
		},
	},
	[device.laptop]: {
		root: {},
	},
});

class SongPreview extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			playing: false,
		};

		this.audio = null;
	}

	componentDidMount() {
		if (this.props.audioURL) {
			this.audio = new Audio(this.props.audioURL);
			this.audio.volume = 0.1;
		}
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.audioURL !== prevProps.audioURL) {
			if (prevProps.audioURL) {
				this.audio.pause();
			}

			if (this.props.audioURL) {
				this.audio = new Audio(this.props.audioURL);
				this.audio.volume = 0.1;
			}
		}
	}

	// shouldComponentUpdate(nextProps, nextState) {

	// }

	componentWillUnmount() {
		// this.setState({ upvoteState: 0 });
	}

	handleClick = () => {
		if (this.state.playing) {
			if (this.audio) {
				this.audio.pause();
				this.audio.currentTime = 0;
			}
			document.title = "Democratic DJ";
			this.setState({ playing: false });
		} else {
			if (!this.audio && this.props.audioURL) {
				this.audio = new Audio(this.props.audioURL);
				this.audio.volume = 0.1;
			}
			if (this.props.audioURL) {
				this.audio.play();
			}
			document.title = `${this.props.songName}`;
			this.setState({ playing: true });
		}
	};

	render() {
		const { classes } = this.props;

		if (!this.props.audioURL) {
			console.log(this.props.songName);
		}

		if (this.props.audioURL) {
			return (
				<div className={classes.root} onClick={this.handleClick}>
					<img className={classes.albumArt} src={this.props.imageURL} />

					{this.state.playing ? (
						<PauseCircleFilledTwoToneIcon className={classes.icon} />
					) : (
						<PlayCircleFilledTwoToneIcon className={classes.icon} />
					)}
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<img className={classes.albumArt} src={this.props.imageURL} />
				</div>
			);
		}
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
)(SongPreview);
