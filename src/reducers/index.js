import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import songList from "./songList.js";

const rootReducer = combineReducers({
	songList,
	form,
});

export default rootReducer;
