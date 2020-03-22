import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["error", "auth"]
};

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer
});

export default persistReducer(persistConfig, rootReducer);
