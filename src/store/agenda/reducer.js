import * as types from "./actionTypes";

export default function agendaReducer(state = [], action) {
  switch (action.type) {
    case types.ADD_TASK:
      state.push(action.task);
      return state;
    case types.REMOVE_TASK:
      state.splice(state.indexOf(action.task), 1);
      return state;
    default:
      return state;
  }
}
