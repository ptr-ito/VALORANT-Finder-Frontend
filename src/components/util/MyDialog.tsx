import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Grid } from "@mui/material";
import { css } from "@emotion/react";

export type MyDialogProps = {
  onClose: (value: string) => void;
  title?: string;
  message?: string;
  ok?: string;
  cancel?: string;
};

export function MyDialog(props: MyDialogProps) {
  const { onClose, title, message, ok, cancel } = props;

  return (
    <Dialog open onClose={() => onClose("close")} fullWidth>
      <DialogTitle css={dialogTitle}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disableRipple={true} color="inherit" onClick={() => onClose("ok")} css={okButton}>
          {ok}
        </Button>
        <Button disableRipple={true} color="inherit" onClick={() => onClose("cancel")} autoFocus css={cancelButton}>
          {cancel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// css

const okButton = css`
  color: #fff;
  background-color: #ff4755;
  &:hover {
    background-color: rgba(255, 15, 0, 1);
  }
`;

const cancelButton = css`
  color: #ff4755;
`;

const dialogTitle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
