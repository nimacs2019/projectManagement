import { combineReducers } from "redux";
import authReducer from "./Slice/authSlice";
import projectReducer from "./Slice/projectSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    project:projectReducer
});

export default rootReducer;
