import React, { useState } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
// MUI Stuff
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    makeStyles,
} from "@material-ui/core";
// Icons
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// Redux
import { useDispatch } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

const DeleteScream = ({ screamId }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const classes = makeStyles({
        deleteButton: {
            position: "absolute",
            left: "90%",
            top: "10%",
        },
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch(deleteScream(screamId));
        setOpen(false);
    };

    return (
        <>
            <MyButton
                tip="Delete Scream"
                onClick={handleOpen}
                btnClassName={classes.deleteButton}
            >
                <DeleteOutlineIcon color="primary" />
            </MyButton>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Are you sure you want to delete this scream ?
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={handleDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteScream;

DeleteScream.propTypes = {
    screamId: PropTypes.string.isRequired,
};
