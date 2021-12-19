import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		theme: "dark",
	},
	reducers: {
		updateSettings(state, action) {
			return { ...state, ...action.payload }; // sets entire state
		},
	},
});
export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
