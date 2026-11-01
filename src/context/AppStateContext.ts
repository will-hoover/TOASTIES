"use client";
import { createContext } from "react";

export interface AppState {
  allowPlayerCreation: boolean;
}

export interface PartialState {
  allowPlayerCreation?: boolean;
}

export interface AppStateContextType {
  state: AppState;
  updateState: (state: PartialState) => void;
}

export const AppStateContext = createContext<AppStateContextType>({
  state: { allowPlayerCreation: false },
  updateState: () => {},
});
