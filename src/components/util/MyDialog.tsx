import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Grid } from "@mui/material";
import { SerializedStyles, css } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";

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
          <Button disableRipple={true} color="inherit" onClick={() => onClose("cancel")} autoFocus css={cancelButton}>
            {cancel}
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
`;

const cancelButton = css`
  color: #ff4755;
`;

const dialogTitle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
