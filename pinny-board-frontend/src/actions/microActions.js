import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  MADDED_SUCCESS,
  MADDED_FAIL,
  MICRO_SELECTED,
  CLEAR_MICRO
} from "./types";

//AddMicrosera
//destructure the object right here
export const addMicrosera = ({
  code,
  type,
  city,
  street,
  number,
  facility
}) => (dispatch, getState) => {
  // Request body

  const body = JSON.stringify({
    code,
    type,
    city,
    street,
    number,
    facility
  });

  axios
    .post(
      "http://localhost:4000/api/microsere/add",
      body,
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: MADDED_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "MADDED_FAIL")
      );
      dispatch({
        type: MADDED_FAIL
      });
    });
};

//select Microsera
export const selectMicrosera = code => (dispatch, getState) => {
  const body = JSON.stringify({ code });
  axios
    .post(
      "http://localhost:4000/api/microsere/find",
      body,
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: MICRO_SELECTED,
        payload: res.data
      })
    )
    .catch(err => {
      //Have to import returnErrors above.  it takes in parameters of a message, a status and a apossible id (which we need to check for in RegisterModal before submitting).
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//Clear state
export const clearAll = () => {
  return {
    type: CLEAR_MICRO
  };
};

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
