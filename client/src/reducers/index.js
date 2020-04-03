import { combineReducers } from "redux";

import usersReducer from "./user-reducer";
import chatReducer from "./chat-reducer";

const rootReducer = combineReducers({ usersReducer, chatReducer });
export default rootReducer;
