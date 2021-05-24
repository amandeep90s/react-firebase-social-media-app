import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI Stuff
import {
    Menu,
    MenuItem,
    IconButton,
    Tooltip,
    Typography,
    Badge,
} from "@material-ui/core";
// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

const Notifications = () => {
    const dispatch = useDispatch();
    const {
        user: { notifications },
    } = useSelector((state) => ({ ...state }));

    dayjs.extend(relativeTime);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onMenuOpened = () => {
        let unreadNotificationsIds = notifications
            .filter((not) => !not.read)
            .map((not) => not.notificationId);

        dispatch(markNotificationsRead(unreadNotificationsIds));
    };

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
        notifications.filter((not) => not.read === false).length > 0
            ? (notificationsIcon = (
                  <Badge
                      badgeContent={
                          notifications.filter((not) => not.read === false)
                              .length
                      }
                      color="secondary"
                  >
                      <NotificationsIcon />
                  </Badge>
              ))
            : (notificationsIcon = <NotificationsIcon />);
    } else {
        notificationsIcon = <NotificationsIcon />;
    }

    let notificationsMarkup =
        notifications && notifications.length > 0 ? (
            notifications.map((not) => {
                const verb = not.type === "like" ? "liked" : "commented on";
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? "primary" : "secondary";
                const icon =
                    not.type === "like" ? (
                        <FavoriteIcon
                            color={iconColor}
                            style={{ marginRight: 10 }}
                        />
                    ) : (
                        <ChatIcon
                            color={iconColor}
                            style={{ marginRight: 10 }}
                        />
                    );

                return (
                    <MenuItem key={not.createdAt} onClick={handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            color="inherit"
                            variant="body1"
                            to={`/users/${not.recipient}/scream/${not.screamId}`}
                        >
                            {not.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                );
            })
        ) : (
            <MenuItem onClick={handleClose}>
                You have no notifications yet
            </MenuItem>
        );

    return (
        <>
            <Tooltip placement="top" title="Notifications">
                <IconButton
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleOpen}
                >
                    {notificationsIcon}
                </IconButton>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onEntered={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu>
        </>
    );
};

export default Notifications;
