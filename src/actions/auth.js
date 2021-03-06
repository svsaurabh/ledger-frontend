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
    LOGOUT,
    UPDATE_PROFILE,
    UPDATE_PROFILE_ERROR,
} from "./types";

// Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get(`/api/auth`);
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
            const res = await axios.post(`/api/user`, body, config);
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
            const res = await axios.post(`/api/auth/login`, body, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            dispatch(setAlert("You are logged in", "success"));
        } catch (error) {
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

export const logout = () => async (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
    dispatch(setAlert("You are logged out", "success"));
};

export const updateUser = (user) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
    });
    try {
        const res = await axios.put(`/api/user/${user.email}`, body, config);
        const { data, message } = res.data;
        dispatch({
            type: UPDATE_PROFILE,
            payload: data,
        });
        dispatch(setAlert(message, "success"));
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_ERROR,
        });
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                return dispatch(setAlert(err.message, "error"));
            });
        }
    }
};
