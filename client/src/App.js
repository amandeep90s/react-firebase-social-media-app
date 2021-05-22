import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import jwtDecode from "jwt-decode";
import axios from "axios";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { getUserData, logoutUser } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";

// Utilities
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";

// Components
const Navbar = lazy(() => import("./components/layout/Navbar"));

// Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const User = lazy(() => import("./pages/User"));

// Auth Token
const token = localStorage.getItem("FBIdToken");
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUserData());
    }
}

const theme = createMuiTheme(themeObject);

const App = () => {
    return (
        <Suspense
            fallback={
                <h3 style={{ textAlign: "center", marginTop: "5rem" }}>
                    Loading...
                </h3>
            }
        >
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Navbar />
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <AuthRoute
                                    exact
                                    path="/login"
                                    component={Login}
                                />
                                <AuthRoute
                                    exact
                                    path="/signup"
                                    component={Signup}
                                />
                                <Route
                                    exact
                                    path="/users/:handle"
                                    component={User}
                                />
                                <Route
                                    exact
                                    path="/users/:handle/scream/:screamId"
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        </Suspense>
    );
};

export default App;
