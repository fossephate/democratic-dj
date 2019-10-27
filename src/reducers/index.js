import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import songs from "./songs.js";

const rootReducer = combineReducers({
	songs,
	form,
});

export default rootReducer;
