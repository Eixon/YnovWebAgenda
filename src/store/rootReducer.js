import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import agendaReducer from "./agenda/reducer";

const rootReducer = combineReducers({
  user: userReducer, // WIP pour le Nest
  agenda: agendaReducer
});

export default rootReducer;
