import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import microReducer from "./microReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["error", "auth", "micro"]
};

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  micro: microReducer
});

export default persistReducer(persistConfig, rootReducer);
