import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function AdvancedSearch(props) {
  const classes = useStyles();

  var minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 3);

  const maxDate = new Date();

  const [listingType, setListingType] = React.useState({
    Auction: true,
    BIN: true,
  });

  const [maxPrice, setMaxPrice] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");

  const handleMinChange = (event) => {
    setMinPrice(event.target.value);
    props.handleMinPriceChange(event.target.value);
  };

  const handleMaxChange = (event) => {
    setMaxPrice(event.target.value);
    props.handleMaxPriceChange(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Advanced Search</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="advanced-root">
            <div className="advanced-row">
              <TextField
                value={minPrice}
                style={{ marginRight: "16px", width: "50%" }}
                margin="dense"
                type="number"
                id="minimum-price"
                label="Minimum Price $ USD"
                variant="outlined"
                onChange={handleMinChange}
              />
              <TextField
                value={maxPrice}
                style={{ width: "50%" }}
                margin="dense"
                type="number"
                id="maximum-price"
                label="Maximum Price $ USD"
                variant="outlined"
                onChange={handleMaxChange}
              />
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="advanced-row">
                <KeyboardDatePicker
                  style={{ marginRight: "16px", width: "50%" }}
                  disableToolbar
                  disableFuture="true"
                  minDate={minDate}
                  maxDate={props.selectedBeforeDate}
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="sold-after"
                  label="Sold After"
                  value={props.selectedAfterDate}
                  onChange={props.handleAfterDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDatePicker
                  style={{ width: "50%" }}
                  disableToolbar
                  disableFuture="true"
                  minDate={props.selectedAfterDate}
                  maxDate={maxDate}
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="sold-before"
                  label="Sold Before"
                  value={props.selectedBeforeDate}
                  onChange={props.handleBeforeDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
            {/* <div className="advanced-row">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                value={props.category}
                onChange={props.handleCategoryChange}
                style={{ width: "100%" }}
              >
                <MenuItem value="">
                  <em>Any</em>
                </MenuItem>
                <MenuItem value={20081}>Antiques</MenuItem>
                <MenuItem value={550}>Art</MenuItem>
                <MenuItem value={2984}>Baby</MenuItem>
                <MenuItem value={267}>Books, Comics & Magazines</MenuItem>
                <MenuItem value={12576}>Business, Office & Industrial</MenuItem>
                <MenuItem value={625}>Cameras & Photography</MenuItem>
                <MenuItem value={9800}>Cars, Motorcycles & Vehicles</MenuItem>
                <MenuItem value={11450}>Clothes, Shoes & Accessories</MenuItem>
                <MenuItem value={11116}>Coins</MenuItem>
                <MenuItem value={1}>Collectables</MenuItem>
                <MenuItem value={58058}>Computers/Tablets & Networkin</MenuItem>
                <MenuItem value={14339}>Crafts</MenuItem>
                <MenuItem value={237}>Dolls & Bears</MenuItem>
                <MenuItem value={11232}>DVDs, Films & TV</MenuItem>
                <MenuItem value={1305}>Events Tickets</MenuItem>
                <MenuItem value={159912}>Garden & Patio</MenuItem>
                <MenuItem value={26395}>Health & Beauty</MenuItem>
                <MenuItem value={3252}>Holidays & Travel</MenuItem>
                <MenuItem value={11700}>Home, Furniture & DIY</MenuItem>
                <MenuItem value={281}>Jewellery & Watches</MenuItem>
                <MenuItem value={15032}>Mobile Phones & Communication</MenuItem>
                <MenuItem value={11233}>Music</MenuItem>
                <MenuItem value={619}>Musical Instruments</MenuItem>
                <MenuItem value={1281}>Pet Supplies</MenuItem>
                <MenuItem value={870}>Pottery, Porcelain & Glass</MenuItem>
                <MenuItem value={10542}>Property</MenuItem>
                <MenuItem value={293}>Sound & Vision</MenuItem>
                <MenuItem value={888}>Sporting Goods</MenuItem>
                <MenuItem value={64482}>Sports Memorabilia</MenuItem>
                <MenuItem value={260}>Stamps</MenuItem>
                <MenuItem value={220}>Toys & Games</MenuItem>
                <MenuItem value={131090}>Vehicle Parts & Accessories</MenuItem>
                <MenuItem value={1249}>Video Games & Consoles</MenuItem>
                <MenuItem value={40005}>Wholesale & Job Lots</MenuItem>
                <MenuItem value={99}>Everything Else</MenuItem>
              </Select>
            </div> */}
            <div className="advanced-row">
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.listingType.Auction}
                      onChange={props.handleCheckChange}
                      name="Auction"
                    />
                  }
                  label="Auction"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.listingType.BIN}
                      onChange={props.handleCheckChange}
                      name="BIN"
                      color="primary"
                    />
                  }
                  label="Buy It Now"
                />
              </FormGroup>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
