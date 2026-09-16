// import Image from "next/image";
"use client";
import StartToastForm from "@/components/StartToastForm";
import { juiceOrange, tigerOrange } from "@/utilities/toastThemes";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

const Home = () => {
  const [startOpen, setStartOpen] = useState(false);

  return (
    <Stack
      direction="column"
      spacing={7}
      sx={{ justifyContent: "center", alginItems: "center" }}
    >
      <Box sx={{ backgroundImage: `linear-gradient(to right, ${juiceOrange}, ${tigerOrange})`, width: "100%", paddingY: "3vh" }}>
        <Typography variant="h1" align="center" sx={{fontWeight: 400, color: "white"}}>
          Welcome to TOASTIES!
        </Typography>
        <Typography variant="body1" align="center" sx={{fontWeight: 400, color: "white"}}>
          By RIT Quiz Bowl
        </Typography>
      </Box>
      <Box sx={{paddingX: "20vw"}}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ padding: "10vh 0", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setStartOpen(true)}
          sx={{
            width: "15vw",
            padding: "15px",
            borderRadius: "10px",
            border: "2px solid #014977",
          }}
        >
          Start Buttered Toast
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            width: "15vw",
            padding: "15px",
            borderRadius: "10px",
            border: "2px solid #014977",
          }}
        >
          View Pantry
        </Button>
      </Stack>
      <StartToastForm open={startOpen} setOpen={setStartOpen} />
      <Typography variant="h3" align="center" sx={{ marginTop: "3vh" }}>
        Wait... What is TOASTIES?
      </Typography>

      <Typography variant="body1" className="bodytext">
        The Trash Or Academic Singles Tournament Interface for Entering Scores
        (TOASTIES) is a website that facilitates the smooth running of a
        Buttered Toast or similarly formatted tournament. During a live
        tournament, scorekeepers can enter and submit scores to the Buttered
        Toast database and users can view live stats for each room and the
        overall tournament. Stats for past tournaments and players can be viewed
        from the Permanent Archive of Nerdy Tournament Results, Yeah (PANTRY).
        For any questions or issues with this product, please contact Will
        Hoover - williamhoover36@gmail.com.
      </Typography>
      <Typography variant="h3" align="center" sx={{ marginTop: "3vh" }}>
        Getting Started
      </Typography>
      </Box>
    </Stack>
  );
};

export default Home;
