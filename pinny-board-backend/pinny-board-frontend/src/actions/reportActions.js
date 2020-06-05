import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  PADDED_SUCCESS,
  PLANT_SELECTED,
  CLEAR_PLANT,
  PADDED_FAIL
} from "./types";

//AddPlant
//destructure the object right here
export const addPlant = ({ name }) => (dispatch, getState) => {
  // Request body

  const body = JSON.stringify({
    name
  });

  axios
    .post("/api/reporting/addPlant", body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: PADDED_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "PADDED_FAIL")
      );
      dispatch({
        type: PADDED_FAIL
      });
    });
};

//select Plant
export const selectPlant = id => dispatch => {
  dispatch({
    type: PLANT_SELECTED,
    payload: id
  });
};

//Clear state
export const clearAll = () => {
  return {
    type: CLEAR_PLANT
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
