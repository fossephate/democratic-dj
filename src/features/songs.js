import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
	name: "songs",
	initialState: {
		songName: "",
		songList: [],
		searchResults: [],
	},
	reducers: {
		updateSongName(state, action) {
			state.songName = action.payload;
		},
		updateSongList(state, action) {
			state.songList = action.payload;
		},
		updateSearchResults(state, action) {
			state.searchResults = action.payload;
		},
	},
});
export const { updateSongName, updateSongList, updateSearchResults } = songsSlice.actions;
export default songsSlice.reducer;
