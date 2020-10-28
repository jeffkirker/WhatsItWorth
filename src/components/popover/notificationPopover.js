import React from "react";
import Popover from "@material-ui/core/Popover";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

import OutlierDialog from "../outlierDialog/OutlierDialog";

export default function NotificationsPopover(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [DialogOpen, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  if (props.outlierCount > 0 || props.listings.length >= 80) {
    return (
      <div>
        <IconButton
          aria-describedby={id}
          style={{ color: "white" }}
          onClick={handleClick}
        >
          <NotificationsIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {props.outlierCount > 0 && (
            <Alert severity="warning">
              There are {props.outlierCount} outliers in your results.{" "}
              <a href="#0" onClick={handleClickOpen}>Click here</a> to view them.
              <OutlierDialog
                open={DialogOpen}
                onClose={handleDialogClose}
                listings={props.outliers}
                handleRemove={props.handleRemove}
              />
            </Alert>
          )}
          {props.listings.length >= 80 && (
            <Alert severity="info">
              You have a lot of results. Consider refining your search terms.
            </Alert>
          )}
        </Popover>
      </div>
    );
  } else {
    return <div></div>;
  }
}
