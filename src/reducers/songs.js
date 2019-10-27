const songs = (state = {}, action) => {
	switch (action.type) {
		case "UPDATE_SONG_LIST":
			return { ...state, songList: action.payload.songList };
		case "UPDATE_SEARCH_RESULTS":
			return { ...state, searchResults: action.payload.searchResults };
		default:
			return state;
	}
};

export default songs;
