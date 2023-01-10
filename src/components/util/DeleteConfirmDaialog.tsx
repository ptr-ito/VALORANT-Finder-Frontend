import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, ButtonPropsColorOverrides, Box, Stack } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export type DeleteConfirmDialogProps = {
  onClose: (value: string) => void;
  title?: string;
  message?: string;
  okText?: string;
  cancelText?: string;
  okColor?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>;
  cancelColor?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>;
};

/**
 * 削除確認ダイアログ
 */
export function DeleteConfirmDialog(props: DeleteConfirmDialogProps) {
  const {
    onClose,
    title = "削除してもよろしいですか？",
    message = "一度削除すると元に戻すことはできません。",
    okText = "削除する",
    cancelText = "キャンセル",
    okColor = "error",
    cancelColor = "primary",
  } = props;

  return (
    <Dialog open onClose={() => onClose("close")}>
      <Stack justifyContent="center" alignItems="center" sx={styles.container}>
        <Box sx={styles.iconConstainer}>
          <ErrorOutlineIcon sx={{ fontSize: 100 }} />
        </Box>

        <DialogTitle id="alert-dialog-title" sx={styles.title}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color={cancelColor} size="small" onClick={() => onClose("cancel")} autoFocus>
            {cancelText}
          </Button>
          <Button variant="contained" color={okColor} size="small" onClick={() => onClose("ok")}>
            {okText}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}

const styles = {
  container: {
    p: 2,
  },
  iconConstainer: {
    fontSize: 100,
    color: "#BF6761",
  },
  title: {
    fontWeight: "bold",
  },
};
