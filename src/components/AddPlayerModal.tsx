"use client";
import { Player, PlayerDetails, ToastDetails } from "@/utilities/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { use, useState } from "react";
import { startToast } from "@/utilities/toastiesActions";
import { ToastContext } from "@/context/ToastContext";
import { addPlayer } from "@/utilities/pantryActions";
import SuccessAlert from "./Feedback/SuccessAlert";

interface AddPlayerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddPlayerModal = ({ open, setOpen }: AddPlayerModalProps) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleSubmit = (shouldClose: boolean) => {
    formik.handleSubmit();
    if (shouldClose && !error) {
      setOpen(false);
      return;
    }
  };

  const formik = useFormik<PlayerDetails>({
    initialValues: {
      firstName: "",
      lastName: "",
      lastToast: 0,
    },
    onSubmit: async (player: PlayerDetails) => {
      setSubmitLoading(true);
      setError(null);
      const response = await addPlayer(player);
      if (!response) {
        setError("Error ading player information");
        setSubmitLoading(false)
        return;
      }
      setSubmitLoading(false);
      formik.resetForm();
    },
  });

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Player to Database</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="firstName"
              label="First Name"
              variant="standard"
              margin="dense"
              fullWidth
              required
              {...formik.getFieldProps("firstName")}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="standard"
              margin="dense"
              fullWidth
              required
              {...formik.getFieldProps("lastName")}
            />
            <TextField
              id="lastToast"
              type="number"
              label="Most recent toast played"
              variant="standard"
              margin="dense"
              required
              {...formik.getFieldProps("lastToast")}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit(false)} loading={submitLoading}>
            Submit and add another
          </Button>
          <Button onClick={() => handleSubmit(true)} loading={submitLoading}>
            Submit and close
          </Button>
        </DialogActions>
        {error && (
          <Typography variant="body2" sx={{color: "red"}}>
            {error}
          </Typography>
        )}
      </Dialog>
      <SuccessAlert open={successOpen} setOpen={setSuccessOpen}>
        Successfully added player
      </SuccessAlert>
    </>
  );
};

export default AddPlayerModal;
