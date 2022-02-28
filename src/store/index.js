import search from "./search/reducers";
import users from "./users/reducers";
import { combineReducers } from "redux";

export default combineReducers({
    search,
    users,
});