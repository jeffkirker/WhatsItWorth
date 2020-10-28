import React from "react";

import NotificationsPopover from "../../popover/notificationPopover";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import SoldPriceArea from "../../visuals/SoldPriceArea";
import SoldPriceDetails from "../../visuals/SoldPriceDetails";
import SoldPriceScatter from "../../visuals/SoldPriceScatter";
import ItemHistory from "../../visuals/ItemHistory";
import ItemRanking from "../../visuals/ItemRanking";
import Box from "@material-ui/core/Box";
import { Alert } from "@material-ui/lab";
import { Header } from "semantic-ui-react";

import ResultTable from "../ResultTable";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
};

const AlertMessage = (props) => {
  if (!props.displayMessage) {
    return null;
  }

  return (
    <div className="display-message">
      <Alert severity="warning" variant="filled">
        This probably wasn't what you were searching for!
        <Link to={{ pathname: "/about" }}> Find out why</Link>
      </Alert>
    </div>
  );
};

const TabBar = (props) => {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="tab-bar">
        <NotificationsPopover
          listings={props.listings}
          outlierCount={props.outlierCount}
          outliers={props.outliers}
          handleRemove={props.handleRemove}
        />
        <Tabs
          value={value}
          onChange={handleTabChange}
          centered
          indicatorColor="secondary"
        >
          <Tab className="tab" label="Statistics" />
          <Tab className="tab" label="Listings" />
        </Tabs>
      </div>
      <AlertMessage displayMessage={props.displayMessage} />
      <div>
        <Header as="h1">
          Displaying Results for "{props.terms}"
        </Header>

        <TabPanel value={value} index={0}>
          <Grid
            container
            // direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={12} sm={12} md={4} lg={2}>
              <ItemRanking ranking={props.ranking} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={2}>
              <ItemHistory ranking={props.ranking} />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={4}>
              <SoldPriceDetails details={props.details} />
            </Grid>
            <Grid item xs={12} md={8}>
              <SoldPriceArea resultArr={props.listings} />
            </Grid>
            <Grid item xs={12} md={8}>
              <SoldPriceScatter resultArr={props.listings} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <ResultTable
                listings={props.listings}
                handleRemove={props.handleRemove}
                resultTable={true}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    </div>
  );
};

export default TabBar;
