import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

export const register =
    ({ firstName, lastName, email, password }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ firstName, lastName, email, password });
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/users`,
                body,
                config
            );
            dispatch({
                type: REGISTER_SUCCESS,
            });
            dispatch(setAlert(res.data.message, "success"));
            return true;
        } catch (error) {
            const errors = error.response.data.errors;
            if (errors) {
                errors.forEach((err) => {
                    return dispatch(setAlert(err.message, "error"));
                });
            }
            dispatch({
                type: REGISTER_FAIL,
            });
            return false;
        }
    };
