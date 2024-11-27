import { combineReducers } from "redux";
import authReducer from "./Slice/authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
