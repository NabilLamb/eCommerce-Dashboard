import React, { useContext } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import ThemeContext from "../ThemeContext/ThemeContext";

const DescriptionPopup = ({ description, visible, onClose }) => {
  const { themeMode } = useContext(ThemeContext);

  // Define custom styles based on themeMode
  const customStyle = {
    backgroundColor: themeMode === 'dark' ? '#1a1a1a' : '#ffffff',
    color: themeMode === 'dark' ? '#ffffff' : '#1a1a1a',
  };

  return (
    <Dialog
      open={visible}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: customStyle.backgroundColor,
          color: customStyle.color,
          "& .MuiDialogTitle-root": {
            backgroundColor: customStyle.backgroundColor,
            color: customStyle.color,
            fontSize: "1.5rem",
          },
          "& .MuiDialogContent-root": {
            backgroundColor: customStyle.backgroundColor,
            color: customStyle.color,
            fontSize: "1.2rem",
          },
          "& .MuiDialogActions-root": {
            backgroundColor: customStyle.backgroundColor,
            justifyContent: "center",
          },
          "& .MuiButton-root": {
            color: customStyle.color,
            fontSize: "0.8rem",
            backgroundColor: customStyle.backgroundColor,
          },
          "& p": {
            fontSize: "1.2rem",
          },
        },
      }}
    >
      <DialogTitle>Description</DialogTitle>
      <DialogContent dividers>
        <p>{description}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DescriptionPopup;
