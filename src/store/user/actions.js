import * as types from "./actionTypes";

export function userLoginSuccess(
  user
  //token
) {
  return {
    type: types.USER_LOGIN_SUCCESS,
    user
    //token
  };
}

export function userLogout() {
  return { type: types.USER_LOGOUT };
}
