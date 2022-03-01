import theme from "./theme/reducers";
import search from "./search/reducers";
import users from "./users/reducers";
import { combineReducers } from "redux";

export default combineReducers({
    theme,
    search,
    users,
});