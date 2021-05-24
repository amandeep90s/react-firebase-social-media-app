import React, { useState } from "react";
import themeObject from "../../util/theme";
import MyButton from "../../util/MyButton";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { createScream, clearErrors } from "../../redux/actions/dataActions";
// MUI Stuff
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    CircularProgress,
    makeStyles,
} from "@material-ui/core";
// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { display } from "@material-ui/system";

const useStyles = makeStyles({
    ...themeObject,
    submitButton: {
        position: "relative",
        float: "right",
        marginTop: 10,
    },
    progressSpinner: {
        position: "absolute",
    },
    closeButton: {
        position: "absolute",
        left: "91%",
        top: "6%",
    },
});

const CreateScream = () => {
    const dispatch = useDispatch();
    const {
        UI: { errors, loading },
    } = useSelector((state) => ({ ...state }));

    const [body, setBody] = useState("");
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        display(clearErrors());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createScream({ body }));

        if (Object.keys(errors).length && !loading) {
            setOpen(false);
            setBody("");
        }
    };

    return (
        <>
            <MyButton onClick={handleOpen} tip="Post a scream">
                <AddIcon />
            </MyButton>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <MyButton
                    tip="Close"
                    onClick={handleClose}
                    tipClassName={classes.closeButton}
                >
                    <CloseIcon />
                </MyButton>

                <DialogTitle>Post a new scream</DialogTitle>
                <DialogContent>
                    <form action="POST" onSubmit={handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="SCREAM!!"
                            multiline
                            rows="3"
                            placeholder="Scream at your fellow apes"
                            error={errors.body ? true : false}
                            helperText={errors.body}
                            className={classes.textField}
                            onChange={(event) => setBody(event.target.value)}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            disabled={loading}
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
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateScream;
