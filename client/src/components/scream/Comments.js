import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import themeObject from "../../util/theme";
//  Stuff
import { Grid, Typography, makeStyles } from "@material-ui/core";

// Custom style
const useStyles = makeStyles({
    ...themeObject,
    commentImage: {
        maxWidth: 100,
        height: 100,
        width: 100,
        objectFit: "cover",
        borderRadius: "50%",
    },
    commentData: {
        marginLeft: 20,
    },
});

const Comments = ({ comments }) => {
    const classes = useStyles();

    return (
        <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAt, userImage, userHandle } = comment;

                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={3}>
                                    <img
                                        src={userImage}
                                        alt="Comment"
                                        className={classes.commentImage}
                                    />
                                </Grid>
                                <Grid item sm={8}>
                                    <div className={classes.commentData}>
                                        <Typography
                                            component={Link}
                                            color="primary"
                                            variant="h5"
                                            to={`/users/${userHandle}`}
                                        >
                                            {userHandle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {dayjs(createdAt).format(
                                                "h:mm a, MMMM DD YYYY"
                                            )}
                                        </Typography>
                                        <hr
                                            className={
                                                classes.invisibleSeparator
                                            }
                                        />
                                        <Typography variant="body1">
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index !== comments.length - 1 && (
                            <hr className={classes.visibleSeparator} />
                        )}
                    </Fragment>
                );
            })}
        </Grid>
    );
};

export default Comments;

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
};
