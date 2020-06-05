import {
  USER_LOADED,
  USER_LOADING,
  USER_SELECTED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_CLEARED,
  UEDITED_SUCCESS
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isAdded: false,
  isLoading: false,
  isUserEdited: false,
  selectedUser: null,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAdded: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isAdded: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAdded: false
      };
    case USER_SELECTED:
      return {
        ...state,
        selectedUser: action.payload
      };
    case USER_CLEARED:
      return {
        ...state,
        selectedUser: null,
        isUserEdited: false
      };
    case UEDITED_SUCCESS:
      return {
        ...state,
        isUserEdited: true
      };
    default:
      return state;
  }
}
