import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from "./types";

// Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/auth`
        );
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register user
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

// Login User
export const login =
    ({ email, password }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ email, password });
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
                body,
                config
            );
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            dispatch(setAlert("You are logged in", "success"));
        } catch (error) {
            console.log(error);
            const errors = error.response.data.errors;
            if (errors) {
                errors.forEach((err) => {
                    return dispatch(setAlert(err.message, "error"));
                });
            }
            dispatch({
                type: LOGIN_FAIL,
            });
        }
    };
