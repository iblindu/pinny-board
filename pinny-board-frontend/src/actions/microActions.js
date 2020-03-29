import axios from "axios";
import { returnErrors } from "./errorActions";

import { MADDED_SUCCESS, MADDED_FAIL } from "./types";

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