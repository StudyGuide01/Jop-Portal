import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";  // your authSlice
import jobSlice from "./jobSlice";    // your jobSlice
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";  // localStorage/sessionStorage

// Persist configuration
const persistConfig = {
  key: "root",    // key for persisted storage
  version: 1,     // version of the store schema
  storage,        // which storage mechanism to use (localStorage)
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice, // user authentication data
  job: jobSlice,   // job-related data
});

// Apply persistence to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
