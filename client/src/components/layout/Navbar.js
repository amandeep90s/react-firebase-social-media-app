import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";

// MUI Stuff
import { AppBar, Toolbar, Button } from "@material-ui/core";

// Icon
import HomeIcon from "@material-ui/icons/Home";

const Navbar = () => {
    const {
        user: { authenticated },
    } = useSelector((state) => ({ ...state }));

    return (
        <AppBar>
            <Toolbar className="nav-container">
                {authenticated ? (
                    <>
                        <Link to="/">
                            <MyButton tip="Home">
                                <HomeIcon />
                            </MyButton>
                        </Link>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/signup">
                            Signup
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
