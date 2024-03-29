import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Grid } from "@mui/material";
import { SerializedStyles, css } from "@emotion/react";

export type ConfirmDialogProps = {
  onClose: (value: string) => void;
  title?: string;
  message?: string;
  ok?: string;
  cancel?: string;
  css?: SerializedStyles;
};

export function ConfirmDialog(props: ConfirmDialogProps) {
  const { onClose, title, message, ok, cancel, css } = props;

  return (
    <Dialog open onClose={() => onClose("close")} fullWidth>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <DialogTitle sx={{ mt: 3 }} css={dialogTitle}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <DialogActions>
          <Button disableRipple={true} color="inherit" onClick={() => onClose("ok")} css={okButton}>
            {ok}
          </Button>
        </DialogActions>
      </Grid>
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
  width: 200px;
`;

const dialogTitle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
