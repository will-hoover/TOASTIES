import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

interface AdminConfirmProps {
  open: boolean;
  message: string;
  onConfirm: (password: string) => Promise<boolean>;
  onCancel: () => void;
}

const AdminConfirm = ({
  open,
  message,
  onConfirm,
  onCancel,
}: AdminConfirmProps) => {
  const [error, setError] = useState<boolean>(false);
  const passwordPrompt = "Enter admin key to proceed:";
  const errorMessage = "Admin key is not correct";

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      const success = await onConfirm(values.password);
      setError(!success);
    },
  });

  return (
    <Dialog open={open}>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="body1">{passwordPrompt}</Typography>
        <TextField
          id="password"
          type="password"
          label="Admin Key"
          variant="standard"
          fullWidth
          {...formik.getFieldProps("password")}
        />
        {error && (
          <Typography variant="body2" className="errorText">
            {errorMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => formik.submitForm()}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminConfirm;
