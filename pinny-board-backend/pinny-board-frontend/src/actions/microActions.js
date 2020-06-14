import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  MADDED_SUCCESS,
  MADDED_FAIL,
  MEDITED_SUCCESS,
  MICRO_SELECTED,
  CLEAR_MICRO,
  EADDED_SUCCES,
  EADDED_FAIL
} from "./types";

//AddMicrosera
//destructure the object right here
export const addMicrosera = ({
  code,
  client_id,
  type,
  levels,
  modules,
  electrovalves,
  leds,
  fans,
  heating,
  country,
  city,
  street,
  number,
  facility,
  longitude,
  latitude
}) => (dispatch, getState) => {
  // Request body

  const body = JSON.stringify({
    code,
    client_id,
    type,
    levels,
    modules,
    electrovalves,
    leds,
    fans,
    heating,
    country,
    city,
    street,
    number,
    facility,
    longitude,
    latitude
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

//EditMicrosera
//destructure the object right here
export const editMicrosera = ({
  id,
  code,
  client_id,
  type,
  levels,
  modules,
  electrovalves,
  leds,
  fans,
  heating,
  country,
  city,
  street,
  number,
  facility,
  longitude,
  latitude
}) => (dispatch, getState) => {
  // Request body

  const body = JSON.stringify({
    code,
    client_id,
    type,
    levels,
    modules,
    electrovalves,
    leds,
    fans,
    heating,
    country,
    city,
    street,
    number,
    facility,
    longitude,
    latitude
  });

  axios
    .post("/api/microsere/update/" + id, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: MEDITED_SUCCESS,
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

//control Microsera

export const controlMicrosera = ({
  micro_id,
  user_id,
  user_name,
  user_email,
  client_id,
  element,
  value
}) => (dispatch, getState) => {
  const body = JSON.stringify({
    micro_id,
    user_id,
    user_name,
    user_email,
    client_id,
    element,
    value
  });

  axios
    .post("/api/connect/control", body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: EADDED_SUCCES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "EADDED_FAIL")
      );
      dispatch({
        type: EADDED_FAIL
      });
    });
};

//select Microsera
export const selectMicrosera = code => dispatch => {
  dispatch({
    type: MICRO_SELECTED,
    payload: code
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
