import React from "react";
import PropTypes from "prop-types";
import themeObject from "../../util/theme";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import {
    makeStyles,
    Paper,
    Typography,
    Link as MuiLink,
} from "@material-ui/core";
// Icons
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LinkIcon from "@material-ui/icons/Link";
import LocationOnIcon from "@material-ui/icons/LocationOn";
// Custom style
const useStyles = makeStyles(themeObject);

const StaticProfile = ({ profile }) => {
    const { handle, createdAt, imageUrl, bio, website, location } = profile;

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img
                        src={imageUrl}
                        alt="profile"
                        className="profile-image"
                    />
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink
                        component={Link}
                        to={`/users/${handle}`}
                        color="primary"
                        variant="h5"
                    >
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <>
                            <LocationOnIcon color="primary" />{" "}
                            <span>{location}</span>
                            <hr />
                        </>
                    )}
                    {website && (
                        <>
                            <LinkIcon color="primary" />
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {" "}
                                {website}
                            </a>
                            <hr />
                        </>
                    )}
                    <CalendarTodayIcon color="primary" />{" "}
                    <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                </div>
            </div>
        </Paper>
    );
};

export default StaticProfile;

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
};
