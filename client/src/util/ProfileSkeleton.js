import React from "react";
import NoImg from "../images/no-img.png";
import themeObject from "../util/theme";

// MUI Stuff
import { makeStyles, Paper } from "@material-ui/core";

// Icons
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LinkIcon from "@material-ui/icons/Link";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles(themeObject);

const ProfileSkeleton = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImg} alt="Profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle}></div>
                    <hr />
                    <div className={classes.fullLine}></div>
                    <div className={classes.fullLine}></div>
                    <hr />
                    <LocationOnIcon color="primary" /> <span>Location</span>
                    <hr />
                    <LinkIcon color="primary" /> https://website.com
                    <hr />
                    <CalendarTodayIcon color="primary" /> Joined date
                </div>
            </div>
        </Paper>
    );
};

export default ProfileSkeleton;
