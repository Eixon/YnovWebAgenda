import * as types from "./actionTypes";

const initialState = {
  me: null,
  token: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      return {
        user: action.user
        //token: action.token
      };
    case types.USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
