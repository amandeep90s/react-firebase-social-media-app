import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { dataReducer } from "./reducers/dataReducer";
import { userReducer } from "./reducers/userReducer";
import { uiReducer } from "./reducers/uiReducer";

// Initial State
const initialState = {};

// Middleware
const middleware = [thunk];

// Combine reducers
const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer,
});

// Create Store
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, enhancer);

export default store;
