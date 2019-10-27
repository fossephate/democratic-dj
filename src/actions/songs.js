import * as types from "./ActionTypes.js";

export const updateSongName = (songName) => {
	return {
		type: types.UPDATE_SONG_NAME,
		payload: {
			songName: songName,
		},
	};
};

export const updateSongList = (songList) => {
	return {
		type: types.UPDATE_SONG_LIST,
		payload: {
			songList: songList,
		},
	};
};

export const updateSearchResults = (searchResults) => {
	return {
		type: types.UPDATE_SEARCH_RESULTS,
		payload: {
			searchResults: searchResults,
		},
	};
};
