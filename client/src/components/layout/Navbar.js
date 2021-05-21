import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MUI Stuff
import { AppBar, Toolbar, Button } from "@material-ui/core";

// Icon
import HomeIcon from "@material-ui/icons/Home";

const Navbar = () => {
    return (
        <AppBar>
            <Toolbar className="nav-container">
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                    Signup
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
