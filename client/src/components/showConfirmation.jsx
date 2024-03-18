import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React, { Fragment } from "react";

export default function ShowConfirmation({
  onConfirm,
  onCancel,
  message,
  isOpen,
}) {
  if (!isOpen) return null;
  return (
    <Fragment>
      <Dialog
        sx={{
          fontFamily: "inherit",
        }}
        open={isOpen}
        onClose={onCancel}
        aria-describedby="delete-confirm"
      >
        <DialogContent>
          <DialogContentText id="delete-confirm">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>بله</Button>
          <Button onClick={onCancel} autoFocus>
            خیر
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
