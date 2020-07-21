import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

import OutlierDialog from "../outlierDialog/OutlierDialog";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function NotificationsPopover(props) {
  const classes = useStyles();
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
  console.log("outliers", props.outliers);

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
            <a onClick={handleClickOpen}>Click here</a> to view them.
            <OutlierDialog
              // selectedValue={selectedValue}
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
}
