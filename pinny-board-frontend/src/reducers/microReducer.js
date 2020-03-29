import { MADDED_SUCCESS, MADDED_FAIL } from "../actions/types";

const initialState = {
  isMicroAdded: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MADDED_SUCCESS:
      return {
        ...state,
        isMicroAdded: true
      };
    case MADDED_FAIL:
      return {
        ...state,
        isMicroAdded: false
      };
    default:
      return state;
  }
}
