"use client";
import GradientStripe from "@/components/GradientStripe";
import RoomMenu from "@/components/RoomMenu";
import { ToastContext } from "@/context/ToastContext";
import { addRoom } from "@/utilities/toastiesActions";
import { juiceOrange, tigerOrange } from "@/utilities/toastThemes";
import { Alert, Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import { use, useState } from "react";

const ToastiesHome = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = use(ToastContext);
  const [roomCount, setRoomCount] = useState(toast?.rooms);

  const handleAddRoom = async () => {
    setLoading(true);
    const newRoom = await addRoom();
    if (typeof newRoom !== "number") {
      setLoading(false);
      return;
    }
    if (toast) toast.rooms = newRoom;
    setRoomCount(newRoom);
    setLoading(false);
    setOpen(true);
  };

  const handleSnackbarClose = () => setOpen(false);

  return toast ? (
    <Stack
      direction="column"
      spacing={7}
      sx={{ justifyContent: "center", alginItems: "center" }}
    >
      <GradientStripe text={toast.name} />
      <Stack direction={"column"} spacing={3}>
        <RoomMenu text="Start packet" roomCount={toast.rooms} />
        <RoomMenu text="Stats" roomCount={toast.rooms} stats />
        <Button
          loading={loading}
          variant="outlined"
          color="secondary"
          onClick={handleAddRoom}
          sx={{ margin: 1 }}
        >
          Add Room
        </Button>
      </Stack>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          onClose={handleSnackbarClose}
        >
          Successfuly added room {roomCount}
        </Alert>
      </Snackbar>
    </Stack>
  ) : (
    <p>:(</p>
  );
};

export default ToastiesHome;
