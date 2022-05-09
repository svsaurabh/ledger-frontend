import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    UPDATE_PROFILE,
    UPDATE_PROFILE_ERROR,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
};
if (initialState.token) {
    initialState.isAuthenticated = true;
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                user: payload,
                loading: false,
            };
        case LOGOUT:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case UPDATE_PROFILE_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
                token: null,
            };
        default:
            return state;
    }
}
