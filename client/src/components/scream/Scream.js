import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import DeleteScream from "./DeleteScream";
import LikeButton from "./LikeButton";
import ScreamDialog from "./ScreamDialog";
import MyButton from "../../util/MyButton";

// Redux
import { useSelector } from "react-redux";
// MUI Stuff
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    makeStyles,
} from "@material-ui/core";
// Icons
import CommentIcon from "@material-ui/icons/Comment";

// Custom Style
const useStyles = makeStyles({
    card: {
        position: "relative",
        display: "flex",
        marginBottom: 20,
    },
    content: {
        padding: 25,
        objectFit: "cover",
    },
    image: {
        minWidth: 200,
    },
});

const Scream = (props) => {
    const {
        user: {
            authenticated,
            credentials: { handle },
        },
    } = useSelector((state) => ({ ...state }));

    dayjs.extend(relativeTime);

    const classes = useStyles();
    const {
        body,
        commentCount,
        createdAt,
        likeCount,
        screamId,
        userHandle,
        userImage,
    } = props.scream;

    const deleteButton =
        authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null;

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                image={userImage}
                title="User Profile"
            />
            <CardContent className={classes.content}>
                <Typography
                    gutterBottom
                    variant="h5"
                    color="primary"
                    component={Link}
                    to={`/users/${userHandle}`}
                >
                    {userHandle}
                </Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary" component="p">
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1" component="p">
                    {body}
                </Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount}</span> Likes
                <MyButton tip="comments">
                    <CommentIcon color="primary" />
                </MyButton>
                <span>{commentCount} Comments</span>
                <ScreamDialog screamId={screamId} userHandle={userHandle} />
            </CardContent>
        </Card>
    );
};

export default Scream;

Scream.propTypes = {
    scream: PropTypes.object.isRequired,
};
