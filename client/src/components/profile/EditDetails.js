import React, { useEffect, useState } from "react";
import themeObject from "../../util/theme";
import MyButton from "../../util/MyButton";
// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
// MUI stuff
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
} from "@material-ui/core";
// Icons
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

const useStyles = makeStyles({ ...themeObject, button: { float: "right" } });

const EditDetails = () => {
    const {
        user: { credentials },
    } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    useEffect(() => {
        mapUserDetailsToState(credentials);
        return () => mapUserDetailsToState({});
    }, [credentials]);

    const classes = useStyles();

    const [bio, setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [location, setLocation] = useState("");
    const [open, setOpen] = useState(false);

    const mapUserDetailsToState = (credentials) => {
        setBio(credentials.bio || "");
        setWebsite(credentials.website || "");
        setLocation(credentials.location || "");
    };

    const handleOpen = () => {
        setOpen(true);
        mapUserDetailsToState(credentials);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const userDetails = {
            bio,
            location,
            website,
        };
        dispatch(editUserDetails(userDetails));
        handleClose();
    };

    return (
        <>
            <MyButton
                tip="Edit Details"
                onClick={handleOpen}
                btnClassName={classes.button}
            >
                <PersonOutlineIcon color="primary" />
            </MyButton>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit you details</DialogTitle>
                <DialogContent>
                    <form noValidate>
                        <TextField
                            type="text"
                            name="bio"
                            id="bio"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            className={classes.textField}
                            value={bio}
                            onChange={(event) => setBio(event.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            type="text"
                            name="website"
                            id="website"
                            label="Website"
                            placeholder="Your personal/professional website"
                            className={classes.textField}
                            value={website}
                            onChange={(event) => setWebsite(event.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            type="text"
                            name="location"
                            id="location"
                            label="Location"
                            placeholder="Where you live"
                            className={classes.textField}
                            value={location}
                            onChange={(event) =>
                                setLocation(event.target.value)
                            }
                            fullWidth
                            required
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditDetails;
