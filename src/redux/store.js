import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";
import skillReducer from "./skillReducer";
import jobReducer from "./jobReducer";

const rootReducer = combineReducers({
  userReducer,
  skillReducer,
  jobReducer,
});

export default createStore(rootReducer);
