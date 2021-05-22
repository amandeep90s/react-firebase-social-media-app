import {
    CREATE_COMMENT,
    CREATE_SCREAM,
    DELETE_SCREAM,
    LIKE_SCREAM,
    LOADING_DATA,
    SET_SCREAM,
    SET_SCREAMS,
    UNLIKE_SCREAM,
} from "../types";

const initialState = {
    screams: [],
    scream: {},
    loading: false,
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false,
            };
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload,
            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(
                (scream) => scream.screamId === action.payload.screamId
            );
            state.screams[index] = action.payload;
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload;
            }
            return {
                ...state,
            };
        case DELETE_SCREAM:
            index = state.screams.findIndex(
                (scream) => scream.screamId === action.payload
            );
            state.screams.splice(index, 1);
            return {
                ...state,
            };
        case CREATE_SCREAM:
            return {
                ...state,
                screams: [action.payload, ...state.screams],
            };
        case CREATE_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments],
                },
            };
        default:
            return state;
    }
};
