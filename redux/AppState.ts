import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { api } from "./api";
import { uiStatePersistReducer } from "./ui";

export const AppStateStore = configureStore({
  reducer: {
    ui: uiStatePersistReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const AppStatePersistor = persistStore(AppStateStore);
export type AppStateType = ReturnType<typeof AppStateStore.getState>;
export type AppStateDispatch = typeof AppStateStore.dispatch;
