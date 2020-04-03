import axios from "axios";

import { LOGIN_USER } from "./types";

const loginUser = dataToSubmit => {
    const request = axios
        .post("/api/users/login", dataToSubmit)
        .then(res => res.data);
    return {
        type: LOGIN_USER,
        payload: request
    };
};
export { loginUser };
