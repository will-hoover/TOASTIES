"use client";
import AddPlayerModal from "@/components/AddPlayerModal";
import GradientBanner from "@/components/GradientBanner";
import { AppStateContext } from "@/context/AppStateContext";
import { Button, Typography } from "@mui/material";
import { use, useState } from "react";

const PantryHome = () => {
  const [addPlayerOpen, setAddPlayerOpen] = useState<boolean>(false);
  const { state } = use(AppStateContext);

  return (
    <>
      <GradientBanner>
        <Typography variant="h1" align="center" className="bannerTitle">
          Pantry
        </Typography>
      </GradientBanner>
      {state.allowPlayerCreation && <Button onClick={() => setAddPlayerOpen(true)}>
        Add player to database
      </Button>}
      <AddPlayerModal open={addPlayerOpen} setOpen={setAddPlayerOpen} />
    </>
  );
};

export default PantryHome;
