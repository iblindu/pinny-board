import { MADDED_SUCCESS, MADDED_FAIL, MICRO_SELECTED } from "../actions/types";

const initialState = {
  isMicroAdded: null,
  selectedMicro: null
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
    case MICRO_SELECTED:
      return {
        ...state,
        selectedMicro: action.payload
      };
    default:
      return state;
  }
}
