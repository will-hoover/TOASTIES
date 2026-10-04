"use client";
import ConfirmAlert from "@/components/ConfirmAlert";
import GradientStripe from "@/components/GradientStripe";
import RoomMenu from "@/components/RoomMenu";
import SuccessAlert from "@/components/SuccessAlert";
import { ToastContext } from "@/context/ToastContext";
import { addRoom, endToast } from "@/utilities/toastiesActions";
import { Box, Button, Stack } from "@mui/material";
import { use, useState } from "react";

const ToastiesHome = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [roomSuccessOpen, setRoomSuccessOpen] = useState<boolean>(false);
  const { toast, setToast } = use(ToastContext);
  const [roomCount, setRoomCount] = useState(toast?.rooms);
  const [confirmEndOpen, setConfirmEndOpen] = useState<boolean>(false);
  const confirmEndMessage = `Are you sure you're ready to end ${toast?.name}? Toasts cannot be restarted, so if more edits are needed, you'll need to get The Hoove involved.`;

  const handleConfirmEnd = async () => {
    const success = await endToast();
    if (!success) {
      // TODO: display error to user
      console.log("Error ending toast");
      return;
    }
    setToast(null);
    // TODO: set this to the pantry stats page for this toast when implemented
    window.location.href = "/";
  };

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
    setRoomSuccessOpen(true);
  };

  return toast ? (
    <Stack
      direction="column"
      spacing={7}
      sx={{
        justifyContent: "center",
        alginItems: "center",
        justifyItems: "center",
      }}
    >
      <GradientStripe text={toast.name} />
      <Box sx={{ maxWidth: "300px" }}>
        <Stack direction={"column"} spacing={3}>
          <Stack direction={"row"} sx={{ width: "100%" }}>
            <RoomMenu
              text="Start packet"
              roomCount={toast.rooms}
              sx={{ marginRight: "10px", width: "145px" }}
            />
            <RoomMenu
              text="Stats"
              roomCount={toast.rooms}
              stats
              sx={{ width: "145px" }}
            />
          </Stack>
          <Button
            loading={loading}
            variant="outlined"
            color="secondary"
            onClick={handleAddRoom}
            sx={{ margin: 1 }}
          >
            Add Room
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setConfirmEndOpen(true)}
          >
            End {toast.name}
          </Button>
        </Stack>
      </Box>
      <SuccessAlert open={roomSuccessOpen} setOpen={setRoomSuccessOpen}>
        Successfully added room {roomCount}.
      </SuccessAlert>
      <ConfirmAlert
        open={confirmEndOpen}
        message={confirmEndMessage}
        onConfirm={handleConfirmEnd}
        onCancel={() => setConfirmEndOpen(false)}
      />
    </Stack>
  ) : (
    <p>:(</p>
  );
};

export default ToastiesHome;
