import { combineReducers } from "redux";
import { GlobalStateReducer } from "./GlobalStateReducer";

const RootReducer = combineReducers({
    GlobalState: GlobalStateReducer,
});

export default RootReducer;
