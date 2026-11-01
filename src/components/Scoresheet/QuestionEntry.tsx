"use client";
import { Buzz } from "@/utilities/types";
import { IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import BuzzEntry from "./BuzzEntry";
import BuzzValue from "./BuzzValue";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type QuestionEntryProps = {
  number: number;
  buzzes: Buzz[];
  handleDelete: () => void;
  roster: string[];
  current: boolean;
};

const QuestionEntry = ({
  number,
  buzzes,
  handleDelete,
  roster,
  current,
}: QuestionEntryProps) => {
  const [displayBuzzes, setDisplayBuzzes] = useState(buzzes);
  const [active, setActive] = useState(current);
  const updateBuzzes = () => {
    setDisplayBuzzes([...buzzes]);
  };

  const getBuzzValueProps = (buzz: Buzz) => {
    return {
      buzz,
      onDelete: () => {
        buzzes.splice(buzzes.indexOf(buzz), 1);
        updateBuzzes();
      },
      roster,
    };
  };

  const addBuzz = (buzz: Buzz) => {
    buzzes.push(buzz);
    updateBuzzes();
  };

  return (
    <Stack direction={"row"} spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {number}
      </Typography>
      <Stack spacing={1}>
        {displayBuzzes.map((buzz, index) => (
          <BuzzValue key={index} {...getBuzzValueProps(buzz)} />
        ))}
        {active && (
          <BuzzEntry
            addBuzz={addBuzz}
            roster={roster}
            onUnfocus={() => setActive(false)}
          />
        )}
      </Stack>
      <Stack>
        <IconButton onClick={() => setActive(true)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default QuestionEntry;
