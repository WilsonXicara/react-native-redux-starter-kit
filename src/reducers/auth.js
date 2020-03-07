import * as ACTION_TYPES from "../constants/action-types";

const initialState = {
  token: undefined,
  isAuthenticating: false,
  error: undefined,
  isFailed: false
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ACTION_TYPES.USER_LOGIN_REQUESTED:
      return {
        ...state,
        isAuthenticating: true,
        isFailed: false
      };
    case ACTION_TYPES.USER_LOGIN_SUCCESS:
      console.log(ACTION_TYPES.USER_LOGIN_SUCCESS, ' -> ', payload);
      return {
        token: payload.data.token,
        isAuthenticating: false,
        isFailed: false
      };
    case ACTION_TYPES.USER_LOGIN_FAILED:
      console.log(ACTION_TYPES.USER_LOGIN_FAILED, ' -> ', action);
      return {
        error: error.response.data.message,
        isAuthenticating: false,
        isFailed: true
      };
    case ACTION_TYPES.USER_LOGOUT_REQUESTED:
      console.log(ACTION_TYPES.USER_LOGOUT_REQUESTED, ' -> ', action);
      return {
        ...initialState
      };
    default:
      return state;
  }
};
