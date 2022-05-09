import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const initialState = {};

export default configureStore({
    reducer: rootReducer,
    middleware: middleware,
    devTools: composeWithDevTools(applyMiddleware(...middleware)),
    preloadedState: initialState,
});
