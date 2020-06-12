import {
  MADDED_SUCCESS,
  MEDITED_SUCCESS,
  MADDED_FAIL,
  MICRO_SELECTED,
  CLEAR_MICRO,
  EADDED_FAIL,
  EADDED_SUCCES
} from "../actions/types";

const initialState = {
  isMicroAdded: false,
  isMicroEdited: false,
  isEventAdded: false,
  selectedMicro: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MADDED_SUCCESS:
      return {
        ...state,
        isMicroAdded: true
      };
    case MEDITED_SUCCESS:
      return {
        ...state,
        isMicroEdited: true
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
    case CLEAR_MICRO:
      return {
        ...state,
        selectedMicro: null,
        isMicroAdded: null,
        isMicroEdited: null
      };
    case EADDED_SUCCES:
      return {
        ...state,
        isEventAdded: true
      };
    case EADDED_FAIL:
      return {
        ...state,
        isEventAdded: false
      };
    default:
      return state;
  }
}
