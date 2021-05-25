import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";
import skillReducer from "./skillReducer";

const rootReducer = combineReducers({
  userReducer,
  skillReducer,
});

export default createStore(rootReducer);
