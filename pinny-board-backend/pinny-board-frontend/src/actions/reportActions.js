import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  PADDED_SUCCESS,
  PLANT_SELECTED,
  CLEAR_PLANT,
  PADDED_FAIL,
  RADDED_SUCCESS
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

//AddSalesReport
//destructure the object right here
export const addSalesReport = ({
  user_id,
  user_name,
  user_email,
  micro_code,
  species,
  initial,
  loses,
  added,
  date
}) => (dispatch, getState) => {
  // Request body

  const body = JSON.stringify({
    user_id,
    user_name,
    user_email,
    micro_code,
    species,
    initial,
    loses,
    added,
    date
  });

  axios
    .post("/api/reporting/addSalesReport", body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: RADDED_SUCCESS,
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

//AddProductionReport
//destructure the object right here
export const addProductionReport = ({
  user_id,
  user_name,
  user_email,
  micro_code,
  species,
  initial,
  loses,
  added,
  date
}) => (dispatch, getState) => {
  // Request body

  const body = JSON.stringify({
    user_id,
    user_name,
    user_email,
    micro_code,
    species,
    initial,
    loses,
    added,
    date
  });

  axios
    .post("/api/reporting/addProductionReport", body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: RADDED_SUCCESS,
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
