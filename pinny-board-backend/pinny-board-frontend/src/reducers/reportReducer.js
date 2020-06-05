import {
  PADDED_SUCCESS,
  PLANT_SELECTED,
  CLEAR_PLANT,
  PADDED_FAIL
} from "../actions/types";

const initialState = {
  isPlantAdded: false,
  selectedPlant: null
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
    default:
      return state;
  }
}
