import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  USER_SELECTED,
  USER_CLEARED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UEDITED_SUCCESS
} from "./types";

//Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //this is gonna call the auth reducer case for USER_LOADING
  dispatch({ type: USER_LOADING });

  //axios returns a promise; we use axios to send the token to a certain endpoint
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.date
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register User
//destructure the object right here
export const register = ({ name, email, password, chosenMicrosere, role }) => (
  dispatch,
  getState
) => {
  var body = {
    name: name,
    email: email,
    password: password,
    microsere: [],
    role: role
  };
  // Request body

  for (var i in chosenMicrosere) {
    var item = chosenMicrosere[i];
    body.microsere.push(item);
  }
  body = JSON.stringify(body);
  axios
    .post("/api/users", body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//Logout action
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//Login User
//destructure the object right here
export const login = ({ email, password }) => dispatch => {
  // Headers (takes an ovject in an object like so)
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  //Once we have the headers and body, we wanna send an axios request to the relevant endpoint with the header & body we just declared. This will give us a promise back with a repsponse.
  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      //Have to import returnErrors above.  it takes in parameters of a message, a status and a apossible id (which we need to check for in RegisterModal before submitting).
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
//EditUser
//destructure the object right here
export const editUser = ({
  id,
  name,
  email,
  password,
  chosenMicrosere,
  role
}) => (dispatch, getState) => {
  var body = {
    name: name,
    email: email,
    password: password,
    microsere: [],
    role: role
  };
  for (var i in chosenMicrosere) {
    var item = chosenMicrosere[i];
    body.microsere.push(item);
  }
  body = JSON.stringify(body);

  axios
    .post("/api/users/update/" + id, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UEDITED_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};
//select User
export const selectUser = _id => dispatch => {
  dispatch({
    type: USER_SELECTED,
    payload: _id
  });
};

//Clear state
export const clearUser = () => {
  return {
    type: USER_CLEARED
  };
};
//Setup config/headers and token. Now anyttime we want to sent the token to a certain endpoint we simply send tokenConfig(getState)
export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //If token exists, add it to header 'x-auth-token' property
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
