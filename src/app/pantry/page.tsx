"use client";
import AddPlayerModal from "@/components/AddPlayerModal";
import GradientBanner from "@/components/GradientBanner";
import { AppStateContext } from "@/context/AppStateContext";
import { Box, Button, Typography } from "@mui/material";
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
      <Typography variant="h3" sx={{ textAlign: "center", padding: 5 }}>
        Pantry features will be added in version 2.1
      </Typography>
      <Box sx={{ margin: "auto", maxWidth: "20vw" }}>
        {state.allowPlayerCreation && (
          <Button onClick={() => setAddPlayerOpen(true)} fullWidth>
            Add player to database
          </Button>
        )}
      </Box>
      <AddPlayerModal open={addPlayerOpen} setOpen={setAddPlayerOpen} />
    </>
  );
};

export default PantryHome;
