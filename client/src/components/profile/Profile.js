import React, { createRef } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import themeObject from "../../util/theme";
import ProfileSkeleton from "../../util/ProfileSkeleton";
import MyButton from "../../util/MyButton";

// MUI Stuff
import {
    makeStyles,
    Button,
    Typography,
    Link as MuiLink,
    Paper,
} from "@material-ui/core";

// Icons
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import LinkIcon from "@material-ui/icons/Link";
import LocationOnIcon from "@material-ui/icons/LocationOn";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

// Custom styles
const useStyles = makeStyles(themeObject);

const Profile = () => {
    const {
        user: {
            authenticated,
            loading,
            credentials: {
                handle,
                createdAt,
                imageUrl,
                bio,
                website,
                location,
            },
        },
    } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch();
    const classes = useStyles();
    const editIconRef = createRef();

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        dispatch(uploadImage(formData));
    };

    const handleEditPicture = () => {
        editIconRef.current.click();
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    let profileMarkup = !loading ? (
        authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img
                            src={imageUrl}
                            alt="Profile avatar"
                            className="profile-image"
                        />
                        <input
                            type="file"
                            name="imageInput"
                            id="imageInput"
                            ref={editIconRef}
                            onChange={handleImageChange}
                            hidden
                        />
                        <MyButton
                            tip="Edit profile picture"
                            onClick={handleEditPicture}
                            btnClassName="button"
                        >
                            <EditIcon color="primary" />
                        </MyButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink
                            href={`/users/${handle}`}
                            color="primary"
                            variant="h5"
                            className={classes.anchor}
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
                                    {website}
                                </a>
                                <hr />
                            </>
                        )}
                        <CalendarTodayIcon color="primary" />{" "}
                        <span>
                            Joined {dayjs(createdAt).format("MMM YYYY")}
                        </span>
                    </div>
                    <MyButton tip="Logout" onClick={handleLogout}>
                        <KeyboardReturnIcon color="primary" />
                    </MyButton>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login"
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/signup"
                    >
                        Signup
                    </Button>
                </div>
            </Paper>
        )
    ) : (
        <ProfileSkeleton />
    );

    return profileMarkup;
};

export default Profile;
