import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { SxProps, Theme } from "@mui/material/styles";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={0} ref={ref} variant="filled" {...props} />;
});

interface AlertMessageProps {
  open: boolean;
  setOpen: Function;
  severity: "error" | "success" | "info" | "warning";
  message: string;
  sx?: SxProps;
}

const AlertMessage = ({ open, setOpen, severity, message, sx }: AlertMessageProps) => {
  const handleCloseAlertMessage = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={handleCloseAlertMessage} sx={sx}>
        <Alert onClose={handleCloseAlertMessage} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertMessage;
