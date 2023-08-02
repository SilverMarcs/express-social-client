import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist"; // persistStore is used to persist the store, persistReducer is used to persist the reducer, and the rest are used to configure the persistor.
import { PersistGate } from "redux-persist/integration/react"; // stores the state in the browser's local storage
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import App from "./App";
import "./index.css";
import authReducer from "./state";

const persistConfig = { key: "root", storage, version: 1 }; // key is the key used in the local storage
const persistedReducer = persistReducer(persistConfig, authReducer); // persistReducer is used to persist the reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE], // ignore these actions
      },
    }),
}); // this store is used to persist the state.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// test comment
