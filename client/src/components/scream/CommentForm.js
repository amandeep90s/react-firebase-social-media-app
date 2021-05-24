import React, { useEffect, useState } from "react";
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
        UI,
    } = useSelector((state) => ({ ...state }));

    const [body, setBody] = useState("");
    const [errors, setErrors] = useState("");

    useEffect(() => {
        if (UI.errors) {
            setErrors(UI.errors);
        }

        if (!Object.keys(UI.errors).length && !UI.loading) {
            setBody("");
        }
    }, [UI.errors, UI.loading]);

    const classes = makeStyles(themeObject);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createComment(screamId, { body }));
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
                    disabled={UI.loading}
                    style={{ margin: "1rem 0" }}
                >
                    Submit
                    {UI.loading && (
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

CommentForm.propTypes = {
    screamId: PropTypes.string.isRequired,
};
