import {
    LOADING_USER,
    LIKE_SCREAM,
    MARK_NOTIFICATIONS_READ,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER,
    UNLIKE_SCREAM,
} from "../types";

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_USER:
            return { ...state, loading: true };
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId,
                    },
                ],
            };
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach((not) => (not.read = true));
            return { ...state };
        case SET_AUTHENTICATED:
            return { ...state, authenticated: true };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                loading: false,
                ...action.payload,
            };
        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.screamId !== action.payload.screamId
                ),
            };
        default:
            return state;
    }
};
