"use client";
import { Player } from "@/utilities/types";
import { createContext } from "react";

export interface PlayerContextType {
  playerMap: Map<string, Player>;
  updateMap: (player?: Player) => void;
  getFullName: (id: string) => string;
};

export const PlayerContext = createContext<PlayerContextType>({
  playerMap: new Map(),
  updateMap: () => {},
  getFullName: () => "",
});
