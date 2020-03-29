import axios from "axios";
import { returnErrors } from "./errorActions";

import { MADDED_SUCCESS, MADDED_FAIL } from "../actions/types";

//AddMicrosera
//destructure the object right here
export const addMicrosera = ({
  code,
  type,
  city,
  street,
  number,
  facility
}) => dispatch => {
  // Request body
  console.log();
  const body = JSON.stringify({ code, type, city, street, number, facility });
  console.log(body);
  axios
    .post("http://localhost:4000/api/microsere/add", body)
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
