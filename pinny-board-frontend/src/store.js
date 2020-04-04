import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// function saveToLocalStorage(state) {
//   try {
//     const serializedstate = JSON.stringify(state);
//     localStorage.setItem("state", serializedstate);
//   } catch (e) {
//     console.log(e);
//   }
// }

// function loadFromLocalStorage() {
//   try {
//     const serializedstate = localStorage.getItems("state");
//     if (serializedstate === null) return undefined;
//     return JSON.parse(serializedstate);
//   } catch (e) {
//     console.log(e);
//     return undefined;
//   }
// }

const middleware = [thunk];

const initialState = {};
// const persistedState = loadFromLocalStorage();

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// store.subscribe(() => saveToLocalStorage(store.getState()));

export const persistor = persistStore(store);

export default { store, persistor };
