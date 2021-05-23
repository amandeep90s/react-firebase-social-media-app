import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

const LikeButton = ({ screamId }) => {
    const {
        user: { authenticated, likes },
    } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch();

    const likedScream = () => {
        return likes.length > 0 &&
            likes.find((like) => like.screamId === screamId)
            ? true
            : false;
    };

    const handleLike = () => {
        dispatch(likeScream(screamId));
    };

    const handleUnlike = () => {
        dispatch(unlikeScream(screamId));
    };

    const likeButton = !authenticated ? (
        <Link to="/login">
            <MyButton tip="Like">
                <FavoriteBorderIcon color="primary" />
            </MyButton>
        </Link>
    ) : likedScream() ? (
        <MyButton tip="Unlike" onClick={handleUnlike}>
            <FavoriteIcon color="primary" />
        </MyButton>
    ) : (
        <MyButton tip="Like" onClick={handleLike}>
            <FavoriteBorderIcon color="primary" />
        </MyButton>
    );

    return likeButton;
};

export default LikeButton;

LikeButton.propTypes = {
    screamId: PropTypes.string.isRequired,
};
