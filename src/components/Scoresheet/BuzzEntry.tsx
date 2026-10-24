"use client";
import { Buzz, Points } from "@/utilities/types";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import PlayerSelect from "../PlayerSelect";

type BuzzEntryProps = {
  addBuzz: (buzz: Buzz) => void;
  roster: string[];
  onUnfocus: () => void;
};

const BuzzEntry = ({ addBuzz, roster, onUnfocus }: BuzzEntryProps) => {
  const [player, setPlayer] = useState<string | null>(null);
  const [points, setPoints] = useState<Points>(10);
  const [selecting, setSelecting] = useState(true);

  const handlePointsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPoints(parseInt(e.target.value) as Points);
  };

  const handleSubmit = () => {
    if (!player) return;
    const buzz = {
      player,
      points,
    };
    addBuzz(buzz);
    setPlayer("");
    setPoints(10);
  };

  const handleKeyPresses = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        if (e.shiftKey) {
          break;
        }
        if (player) {
          handleSubmit();
          setSelecting(true);
        } else {
          setSelecting(false);
        }
        break;
      case "Tab":
        e.preventDefault();
        if (points === 15) {
          setPoints(10);
        } else if (points === 10) {
          setPoints(-5);
        } else {
          setPoints(15);
        }
        break;
      default:
        return undefined;
    }
  };

  return (
    <Stack
      direction={"row"}
      sx={{ padding: 0.5, border: "1px solid black", borderRadius: 2 }}
      onKeyDown={handleKeyPresses}
      onBlur={onUnfocus}
    >
      <PlayerSelect
        playerIds={roster}
        playerId={player}
        setPlayerId={setPlayer}
        autoFocus
      />
      <RadioGroup
        row
        id="points-selector"
        aria-labelledby="points-radio-label"
        onChange={handlePointsChange}
        value={points}
      >
        <FormControlLabel value={15} control={<Radio />} label="15" />
        <FormControlLabel value={10} control={<Radio />} label="10" />
        <FormControlLabel value={-5} control={<Radio />} label="-5" />
      </RadioGroup>
      <Button onClick={handleSubmit}>Add</Button>
    </Stack>
  );
};

export default BuzzEntry;
