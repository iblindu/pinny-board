import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// import { logout } from "./actions/authActions";

// const checkTokenExpirationMiddleware = store => next => action => {
//   const token =
//     JSON.parse(localStorage.getItem("user")) &&
//     JSON.parse(localStorage.getItem("user"))["token"];
//   if (jwtDecode(token).exp < Date.now() / 1000) {
//     next(logout);
//     localStorage.clear();
//   }
// };

const middleware = [thunk];

const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default { store, persistor };
