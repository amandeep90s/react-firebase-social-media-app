import React, { useState } from "react";
import PropTypes from "prop-types";
import themeObject from "../../util/theme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/actions/dataActions";
// MUI Stuff
import {
    makeStyles,
    Button,
    Grid,
    TextField,
    CircularProgress,
} from "@material-ui/core";
// Icons

const CommentForm = ({ screamId }) => {
    const dispatch = useDispatch();
    const {
        user: { authenticated },
        UI: { errors, loading },
    } = useSelector((state) => ({ ...state }));

    const [body, setBody] = useState("");

    const classes = makeStyles(themeObject);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createComment(screamId, { body }));

        if (Object.keys(errors).length === 0 && !loading) {
            setBody("");
        }
    };

    const commentFormMarkup = authenticated ? (
        <Grid item sm={12} style={{ textAlign: "center" }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="body"
                    type="text"
                    label="Comment on scream"
                    error={errors.comment ? true : false}
                    helperText={errors.comment}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    fullWidth
                    className={classes.textField}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={loading}
                    style={{ margin: "1rem 0" }}
                >
                    Submit
                    {loading && (
                        <CircularProgress
                            size={30}
                            className={classes.progressSpinner}
                        />
                    )}
                </Button>
            </form>
            <hr className={classes.visibleSeparator} />
        </Grid>
    ) : null;
    return commentFormMarkup;
};

export default CommentForm;
