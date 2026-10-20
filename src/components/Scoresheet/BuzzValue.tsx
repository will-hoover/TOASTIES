"use client";

import { PlayerContext } from "@/context/PlayerContext";
import { Buzz } from "@/utilities/types";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { use } from "react";

type BuzzValueProps = {
  buzz: Buzz;
  onDelete: () => void;
};

const BuzzValue = ({ buzz, onDelete }: BuzzValueProps) => {
  const { getFullName } = use(PlayerContext);

  return (
    <Stack direction="row">
      <Typography variant="body1" sx={{ padding: "0 1.5vw", width: 150 }}>
        {getFullName(buzz.player)}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="body1" sx={{ padding: "0 1vw", width: 50 }}>
        {buzz.points}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Button onClick={onDelete}>X</Button>
    </Stack>
  );
};

export default BuzzValue;
