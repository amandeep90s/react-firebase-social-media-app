import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ component: Component, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));

    return (
        <Route
            {...rest}
            render={(props) =>
                user && user.authenticated ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default AuthRoute;
