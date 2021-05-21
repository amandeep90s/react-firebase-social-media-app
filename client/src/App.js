import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Components
import Navbar from "./components/layout/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/users/:handle" component={User} />
                    <Route
                        exact
                        path="/users/:handle/scream/:screamId"
                        component={User}
                    />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
