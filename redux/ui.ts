import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

type UiState = {
  sidebarCollapsed: boolean;
  sidebarProjectsCollapsed: boolean;
  sidebarPriorityCollapsed: boolean;
};

const initialState: UiState = {
  sidebarCollapsed: false,
  sidebarProjectsCollapsed: true,
  sidebarPriorityCollapsed: true,
};

const uiStateSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    collapseSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },

    collapseSidebarProjects: (state, action: PayloadAction<boolean>) => {
      state.sidebarProjectsCollapsed = action.payload;
    },

    collapseSidebarPriority: (state, action: PayloadAction<boolean>) => {
      state.sidebarPriorityCollapsed = action.payload;
    },
  },
});

export const {
  collapseSidebar,
  collapseSidebarProjects,
  collapseSidebarPriority,
} = uiStateSlice.actions;

const persistConfig: PersistConfig<UiState> = {
  key: "ui",
  storage: storage,
};

export const uiStatePersistReducer = persistReducer(
  persistConfig,
  uiStateSlice.reducer,
);
