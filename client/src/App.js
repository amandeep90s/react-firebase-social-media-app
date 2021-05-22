import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Components
import Navbar from "./components/layout/Navbar";

// Utilities
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";

// Auth Token
let authenticated;
const token = localStorage.getItem("FBIdToken");
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken * 1000 < Date.now()) {
        window.location.href = "/login";
        authenticated = false;
    } else {
        authenticated = true;
    }
}

const theme = createMuiTheme(themeObject);

const App = () => {
    return (
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
                                authenticated={authenticated}
                            />
                            <AuthRoute
                                exact
                                path="/signup"
                                component={Signup}
                                authenticated={authenticated}
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
    );
};

export default App;
