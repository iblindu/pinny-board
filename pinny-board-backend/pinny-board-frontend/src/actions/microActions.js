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
    .post("/api/microsere/add", body, tokenConfig(getState))
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
  dispatch({
    type: MICRO_SELECTED,
    payload: code
  });
};

// //find Microsera
// export const findMicrosera = code => getState => {
//   const body = JSON.stringify({ code });
//   axios
//     .post(
//       "/api/microsere/find",
//       body,
//       tokenConfig(getState)
//     )
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

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
