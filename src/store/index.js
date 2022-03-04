import theme from "./theme/reducers";
import loading from "./loading/reducers";
import users from "./users/reducers";
import user from "./user/reducers";
import likedUsers from "./likedUsers/reducers";
import { combineReducers } from "redux";

export default combineReducers({
    theme,
    likedUsers,
    users,
    user,
    loading,
});