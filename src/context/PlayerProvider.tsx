"use client";
import { getPlayers } from "@/utilities/pantryActions";
import { Player } from "@/utilities/types";
import { useEffect, useState } from "react";
import { PlayerContext } from "./PlayerContext";

interface PlayerProviderProps {
  children: React.ReactNode;
}

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [map, setMap] = useState<Map<string, Player>>(new Map());

  const loadPlayers = async () => {
    const players = await getPlayers();
    const newMap = new Map<string, Player>();
    players.forEach((player) => newMap.set(player.id, player));
    setMap(newMap);
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const updateMap = (player?: Player) => {
    if (player) {
      const newMap = structuredClone(map);
      newMap.set(player.id, player);
      setMap(newMap);
    } else {
      loadPlayers();
    }
  };

  const getFullName = (id: string) => {
    const player = map.get(id);
    return player ? `${player.firstName} ${player.lastName}` : "";
  };

  return (
    <PlayerContext.Provider
      value={{
        playerMap: map,
        updateMap,
        getFullName,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
