const songList = (state = {}, action) => {
	switch (action.type) {
		case "UPDATE_MESSAGES":
			return { ...state, songList: action.payload.songList };
		default:
			return state;
	}
};

export default songList;
