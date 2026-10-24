import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import { use, KeyboardEvent } from "react";
import { PlayerContext } from "@/context/PlayerContext";

interface PlayerSelectProps {
  playerIds: string[];
  playerId: string | null;
  setPlayerId: (value: string | null) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  label?: string;
  autoFocus?: boolean;
}

const PlayerSelect = ({
  playerIds,
  playerId,
  setPlayerId,
  onKeyDown = (e) => {},
  label,
  autoFocus
}: PlayerSelectProps) => {
  const { getFullName } = use(PlayerContext);

  const renderAutocompleteTextField = (
    params: AutocompleteRenderInputParams,
  ) => (
    <TextField
      {...params}
      label={label}
      sx={{ backgroundClip: "white" }}
      size="small"
      autoFocus={autoFocus}
    />
  );

  return (
    <Autocomplete
      autoSelect
      autoHighlight
      popupIcon={null}
      onKeyDown={(e: KeyboardEvent) => onKeyDown(e)}
      options={playerIds}
      getOptionLabel={(id) => getFullName(id)}
      onChange={(event, value) => {
        setPlayerId(value);
      }}
      value={playerId}
      renderInput={(params) => renderAutocompleteTextField(params)}
      sx={{ pr: "1vw", minWidth: "10vw" }}
    />
  );
};

export default PlayerSelect;
