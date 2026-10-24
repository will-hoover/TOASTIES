"use client";
import AddPlayerModal from "@/components/AddPlayerModal";
import GradientBanner from "@/components/GradientBanner";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

const PantryHome = () => {
  const [addPlayerOpen, setAddPlayerOpen] = useState<boolean>(false);

  return (
    <>
      <GradientBanner>
        <Typography variant="h1" align="center"
            className="bannerTitle">Pantry</Typography>
      </GradientBanner>
      <Button onClick={() => setAddPlayerOpen(true)}>Add player to database</Button>
      <AddPlayerModal open={addPlayerOpen} setOpen={setAddPlayerOpen} />
    </>
  );
};

export default PantryHome;
