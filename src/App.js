import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alerts from "./components/layout/Alerts";
import Profile from "./components/profile/Profile";
import PrivateRoute from "./components/routes/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Dashboard from "./components/layout/Dashboard";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";

import store from "./store";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});
if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Router>
                    <Fragment>
                        <Navbar />
                        <Alerts />
                        <Routes>
                            <Route exact path="/login" element={<Login />} />
                            <Route
                                exact
                                path="/register"
                                element={<Register />}
                            />
                            <Route element={<PrivateRoute />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                        </Routes>
                    </Fragment>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
