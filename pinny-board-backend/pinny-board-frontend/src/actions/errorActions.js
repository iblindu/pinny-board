import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// RETURN ERROS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS: remove errors when necessary such as when you close the modal and had errors in it.
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
