import axios from "axios";
import {
    CLEAR_ERRORS,
    CREATE_COMMENT,
    CREATE_SCREAM,
    DELETE_SCREAM,
    LIKE_SCREAM,
    LOADING_DATA,
    LOADING_UI,
    SET_ERRORS,
    SET_SCREAM,
    SET_SCREAMS,
    STOP_LOADING_UI,
    UNLIKE_SCREAM,
} from "../types";

// Get all screams function
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get("/screams")
        .then((res) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data,
            });
        })
        .catch((error) => {
            dispatch({ type: SET_ERRORS, payload: [] });
        });
};

// Get single scream
export const getScream = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/scream/${screamId}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data,
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((error) => console.log(error));
};

// Create a scream function
export const createScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post("/scream", newScream)
        .then((res) => {
            dispatch({
                type: CREATE_SCREAM,
                payload: res.data,
            });
            dispatch(clearErrors());
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            });
        });
};

// Like a scream function
export const likeScream = (screamId) => (dispatch) => {
    axios
        .get(`/scream/${screamId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

// Unlike a scream function
export const unlikeScream = (screamId) => (dispatch) => {
    axios
        .get(`/scream/${screamId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

// Create a comment on scream function
export const createComment = (screamId, commentData) => (dispatch) => {
    axios
        .post(`/scream/${screamId}/comment`, commentData)
        .then((res) => {
            dispatch({
                type: CREATE_COMMENT,
                payload: res.data,
            });
            dispatch(clearErrors());
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            });
        });
};

// Delete a scream function
export const deleteScream = (screamId) => (dispatch) => {
    axios
        .delete(`/scream/${screamId}`)
        .then((res) => {
            if (res.status === 200) {
                dispatch({
                    type: DELETE_SCREAM,
                    payload: screamId,
                });
            }
        })
        .catch((err) => console.log(err));
};

// Get a single user data function
export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get(`/user/${userHandle}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams,
            });
        })
        .catch(() => {
            dispatch({
                type: SET_SCREAMS,
                payload: null,
            });
        });
};

// Clear errors function
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
