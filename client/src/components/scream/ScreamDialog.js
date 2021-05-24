import React, { useState } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import themeObject from "../../util/theme";
// MUI Stuff
import {
    Dialog,
    DialogContent,
    CircularProgress,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

const useStyles = makeStyles({
    ...themeObject,
    profileImage: {
        maxWidth: 150,
        height: 150,
        width: 150,
        borderRadius: "50%",
        objectFit: "cover",
    },
    dialogContent: {
        padding: 20,
    },
    closeButton: {
        position: "absolute",
        left: "90%",
    },
    expandButton: {
        position: "absolute",
        left: "90%",
    },
    spinnerDiv: {
        textAlign: "center",
        marginTop: 50,
        marginBottom: 50,
    },
});

const ScreamDialog = ({ screamId, userHandle }) => {
    const dispatch = useDispatch();
    const {
        UI: { loading },
        data: {
            scream: {
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                comments,
            },
        },
    } = useSelector((state) => ({ ...state }));

    const [oldPath, setOldPath] = useState("");
    const [newPath, setNewPath] = useState("");
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        let oldPathName = window.location.pathname;
        const newPathName = `/users/${userHandle}/scream/${screamId}`;

        if (oldPathName === newPathName) oldPathName = `/users/${userHandle}`;

        window.history.pushState(null, null, newPathName);

        setOpen(true);
        setOldPath(oldPathName);
        setNewPath(newPathName);
        dispatch(getScream(screamId));
    };

    const handleClose = () => {
        window.history.pushState(null, null, oldPath);
        setOpen(false);
        dispatch(clearErrors());
    };

    const dialogMarkup = loading ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size={200} thickness={2} />
        </div>
    ) : (
        <Grid container spacing={2}>
            <Grid item sm={5}>
                <img
                    src={userImage}
                    alt="Profile"
                    className={classes.profileImage}
                />
            </Grid>
            <Grid item sm={7}>
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${userHandle}`}
                >
                    @{userHandle}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">{body}</Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount} likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{commentCount} comments</span>
            </Grid>
            <hr className={classes.visibleSeparator} />
            <CommentForm screamId={screamId} />
            <Comments comments={comments || []} />
        </Grid>
    );

    return (
        <>
            <MyButton
                onClick={handleOpen}
                tip="Expand scream"
                tipClassName={classes.expandButton}
            >
                <UnfoldMore color="primary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <MyButton
                    tip="Close"
                    onClick={handleClose}
                    tipClassName={classes.closeButton}
                >
                    <CloseIcon />
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ScreamDialog;

ScreamDialog.propTypes = {
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
};
