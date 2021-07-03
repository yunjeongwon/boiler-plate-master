import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, success: action.payload };
    case REGISTER_USER:
      return { ...state, success: action.payload };
    case AUTH_USER:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}
