"use client";

import { rooms } from "@/utilities/toastiesActions";
import {
  Alert,
  AppBar,
  Button,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { use, useEffect, useState } from "react";
import RoomMenu from "./RoomMenu";
import butterytoast from "../../public/toast.png";
import Image from "next/image";
import Link from "next/link";
import { ToastContext } from "@/context/ToastContext";

const NavBar = () => {
  const [roomCount, setRoomCount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const { toast } = use(ToastContext);

  const handleSnackbarClose = () => setOpen(false);

  useEffect(() => {
    if (toast !== null) {
      async function getRooms() {
        const count = await rooms();
        setRoomCount(count);
      }
      getRooms();
    }
  }, [roomCount, toast]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link href={toast ? "/toasties" : "/"}>
            <Image src={butterytoast} alt="tasty buttered toast" height="50" />
          </Link>
          <Link href={toast ? "/toasties" : "/"}>
            <Typography
              variant="h5"
              sx={{ margin: 1, marginLeft: 2, marginRight: 5 }}
            >
              {toast ? toast.name : "TOASTIES"}
            </Typography>
          </Link>
          {toast ? (
            <>
              <RoomMenu text="Start packet" roomCount={roomCount} />
              <RoomMenu text="Stats" roomCount={roomCount} stats />
            </>
          ) : (
            <>
              <Button
                color="secondary"
                variant="contained"
                sx={{ marginX: 1.5 }}
              >
                Stats
              </Button>
              <Button
                color="secondary"
                variant="contained"
                sx={{ marginX: 1.5 }}
              >
                Records
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
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
    </div>
  );
};

export default NavBar;
