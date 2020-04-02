import { combineReducers } from "redux";

import usersReducer from "./user-reducer";
import chatReducer from "./chat-reducer";

const rootReducer = combineReducers({ users: usersReducer, chat: chatReducer });
