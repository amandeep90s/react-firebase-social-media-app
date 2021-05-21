import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

// MUI Stuff
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
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
                <Typography variant="body1" color="textSecondary" component="p">
                    {moment(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {body}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Scream;

Scream.propTypes = {
    scream: PropTypes.object.isRequired,
};
