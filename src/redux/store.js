import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  authReducer,
  authSlice,
  likeReducer,
  likeSlice,
  postReducer,
  postSlice,
} from "@redux";

const rootReducers = combineReducers({
  [authSlice.name]: authReducer,
  [postSlice.name]: postReducer,
  [likeSlice.name]: likeReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
