import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import ResultTable from "../results/ResultTable";

export default function OutlierDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="lg"
    >
      <DialogTitle id="simple-dialog-title">Price Outliers</DialogTitle>
      <ResultTable
        listings={props.listings}
        handleRemove={props.handleRemove}
      />
    </Dialog>
  );
}
