"use client";

import { AppStatePersistor, AppStateStore } from "@/redux/AppState";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={AppStateStore}>
      <PersistGate loading={null} persistor={AppStatePersistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
