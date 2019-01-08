import {
  FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, LOGIN_STATUS, FB_LOGOUT,
} from '../actions/types';

const defaultState = {
  token: null,
  loggedIn: null,
};

module.exports = (state = defaultState, { type, payload }) => {
  switch (type) {
    case FB_LOGIN_SUCCESS:
      return { ...state, token: payload };
    case FB_LOGIN_FAIL:
      return { ...state, token: null, loggedIn: null };
    case LOGIN_STATUS:
      return { ...state, loggedIn: payload };
    case FB_LOGOUT:
      return { ...state, loggedIn: false, token: null };
    default:
      return state;
  }
};
