import {
  PADDED_SUCCESS,
  PLANT_SELECTED,
  CLEAR_PLANT,
  PADDED_FAIL,
  RADDED_SUCCESS,
  RADDED_FAIL
} from "../actions/types";

const initialState = {
  isPlantAdded: false,
  selectedPlant: null,
  isReportAdded: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PADDED_SUCCESS:
      return {
        ...state,
        isPlantAdded: true
      };
    case PADDED_FAIL:
      return {
        ...state,
        isPlantAdded: false
      };
    case PLANT_SELECTED:
      return {
        ...state,
        selectedPlant: action.payload
      };
    case CLEAR_PLANT:
      return {
        ...state,
        selectedPlant: null,
        isPlantAdded: null
      };
    case RADDED_SUCCESS:
      return {
        ...state,
        isReportAdded: true
      };
    case RADDED_FAIL:
      return {
        ...state,
        isReportAdded: false
      };
    default:
      return state;
  }
}
