// react:
import React, { PureComponent } from "react";
// import PropTypes from "prop-types";

// components:
import Result from "./Result.jsx";

// material ui:
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// redux:
import { connect } from "react-redux";

// recompose:
import { compose } from "recompose";

// jss:

const styles = (theme) => ({
	root: {
		// display: "flex",
		display: "grid",
		flexDirection: "column",
		gridGap: "10px",
	},
});

class SearchResults extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}

	mapSearchResults() {
		let results = [];
		for (let i = 0; i < this.props.searchResults.length; i++) {
			let result = this.props.searchResults[i];
			results.push(<Result key={i} {...result} />);
		}
		return results;
	}

	render() {
		const { classes } = this.props;

		return (
			<Paper id="searchResults" className={classes.root} elevation={10}>
				{this.mapSearchResults()}
			</Paper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		searchResults: state.songs.searchResults,
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
)(SearchResults);
