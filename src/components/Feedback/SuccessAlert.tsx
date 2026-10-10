import { Alert, Snackbar } from "@mui/material";

interface SuccessAlertProps {
  open: boolean;
  setOpen(set: boolean): void;
  children: React.ReactNode;
}

const SuccessAlert = ({ open, setOpen, children }: SuccessAlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
        onClose={() => setOpen(false)}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
