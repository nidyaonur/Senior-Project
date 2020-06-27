import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import chats from "./chat";
import subscribers from "./subscribers";
export default combineReducers({
    errors,
    messages,
    auth,
    chats,
    subscribers
});
