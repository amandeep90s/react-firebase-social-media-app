import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    CircularProgress,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import AppIcon from "../images/icon.png";
import themeObject from "../util/theme";
import { loginUser } from "../redux/actions/userActions";

// Custom styles
const useStyles = makeStyles(themeObject);

const Login = ({ history }) => {
    const {
        UI: { loading, errors },
    } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = { email, password };
        dispatch(loginUser(userData, history));
    };

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.form}
        >
            <Grid item sm={4} xs={12}>
                <img src={AppIcon} alt="Monkey" className={classes.image} />
                <Typography variant="h5" className={classes.pageTitle}>
                    Login Form
                </Typography>

                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        onChange={(event) => setEmail(event.target.value)}
                        fullWidth
                        required
                    />

                    <TextField
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        onChange={(event) => setPassword(event.target.value)}
                        fullWidth
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={loading}
                    >
                        Login{" "}
                        {loading && (
                            <CircularProgress
                                size={30}
                                className={classes.progress}
                            />
                        )}
                    </Button>

                    {errors.general && (
                        <Typography
                            variant="body2"
                            className={classes.customError}
                        >
                            {errors.general}
                        </Typography>
                    )}

                    <br />
                    <br />
                    <small>
                        Don't have an account ? Sign up{" "}
                        <Link to="/signup" className={classes.anchor}>
                            here
                        </Link>
                    </small>
                </form>
            </Grid>
        </Grid>
    );
};

export default Login;
