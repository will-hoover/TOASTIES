"use client";
import { Toast } from "@/utilities/types";
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

interface StartToastFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const StartToastForm = ({ open, setOpen }: StartToastFormProps) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const { setToast } = use(ToastContext);

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      id: null,
      number: 0,
      name: "",
      date: new Date(),
      content: "Trash",
      rooms: 0,
    },
    onSubmit: async (toast: Toast) => {
      console.log("fired");
      setSubmitLoading(true);
      setSubmitError(false);
      const response = await startToast(toast);
      if (!response) {
        setSubmitError(true);
        return;
      }
      toast.id = response.id;
      setToast(toast);
      setSubmitLoading(false);
      setOpen(false);
      window.location.href = "/toasties";
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Start Buttered Toast</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            label="Name"
            variant="standard"
            margin="dense"
            fullWidth
            {...formik.getFieldProps("name")}
          />
          <TextField
            id="number"
            type="number"
            label="Number"
            variant="standard"
            margin="dense"
            {...formik.getFieldProps("number")}
          />
          <TextField
            type="date"
            id="date"
            label="Date"
            variant="standard"
            margin="dense"
            sx={{
              marginX: "1vw",
            }}
            {...formik.getFieldProps("date")}
          />
          <TextField
            id="rooms"
            type="number"
            label="Rooms"
            variant="standard"
            margin="dense"
            {...formik.getFieldProps("rooms")}
          />
          <FormControl margin="dense">
            <FormLabel id={`content-label`}>Content</FormLabel>
            <RadioGroup
              row
              aria-labelledby={`content-label`}
              {...formik.getFieldProps("content")}
            >
              <FormControlLabel
                value="Trash"
                control={<Radio />}
                label="Trash"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Academic"
              />
            </RadioGroup>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => formik.handleSubmit()} loading={submitLoading}>
          Submit
        </Button>
      </DialogActions>
      {submitError ?? (
        <Typography color="red" variant="body2">
          A backend error has occured; please try again or contact support
        </Typography>
      )}
    </Dialog>
  );
};

export default StartToastForm;
