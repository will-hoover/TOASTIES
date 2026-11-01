"use client";
import { checkPlayerCreation, getPlayers } from "@/utilities/pantryActions";
import { Player } from "@/utilities/types";
import { useEffect, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import { AppState, PartialState, AppStateContext } from "./AppStateContext";

interface AppStateProviderProps {
  children: React.ReactNode;
}

const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [state, setState] = useState<AppState>({ allowPlayerCreation: false });

  const getPlayerCreationAllowed = async () => {
    const allowed = await checkPlayerCreation();
    setState({
      allowPlayerCreation: allowed,
    });
  };

  useEffect(() => {
    getPlayerCreationAllowed();
  }, []);

  const updateState = (updates: PartialState) => {
    setState({
      allowPlayerCreation:
        updates.allowPlayerCreation ?? state.allowPlayerCreation,
    });
  };

  return (
    <AppStateContext.Provider
      value={{
        state,
        updateState,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
