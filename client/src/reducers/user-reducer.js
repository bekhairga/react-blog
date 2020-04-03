import { LOGIN_USER } from "../actions/types";
const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload
            };
        default:
            return state;
    }
};
export default usersReducer;
