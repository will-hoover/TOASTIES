"use client"
import { addRoom } from "@/utilities/toastiesActions";
import { Button } from "@mui/material";
import { useState } from "react";

const ToastiesHome = () => {
      const [loading, setLoading] = useState<boolean>(false);

      const handleAddRoom = async () => {
        setLoading(true);
        const newRoom = await addRoom();
        setLoading(false);
        setRoomCount(newRoom);
        setOpen(true);
      };

return (<Button
            loading={loading}
            variant="outlined"
            color="secondary"
            onClick={handleAddRoom}
            sx={{ margin: 1 }}
          >
            Add Room
          </Button>)
}

export default ToastiesHome;