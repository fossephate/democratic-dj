import * as types from "./ActionTypes.js";

export const updateSongList = (songList) => {
	return {
		type: types.UPDATE_SONGLIST,
		payload: {
			songList: songList,
		},
	};
};
