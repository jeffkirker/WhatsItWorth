import React, { Component } from "react";
import SearchHeader from "../search/SearchHeader";
import { Grid } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SoldPriceArea from "../visuals/SoldPriceArea";
import SoldPriceDetails from "../visuals/SoldPriceDetails";
import ResultTable from "./ResultTable";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemRanking from "../visuals/ItemRanking";
import NotificationsPopover from "../popover/notificationPopover";

import { getPriceDetails, itemGrade, getOutliers } from "./../utilities/utils";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      listings: [],
      ranking: null,
      outliers: [],
      value: "",
      AuctionArr: [],
      dataReady: false,
      noData: false,
      outlierCount: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(value) {
    this.setState({ value: value });
    this.setState({ dataReady: false });
    this.props.history.push(`/results/${encodeURI(value)}`);
    this.getResults(value);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.getResults(this.state.value);
    this.props.history.push(`/results/${encodeURI(this.state.value)}`);
  }

  handleTabChange = (event, newValue) => {
    this.setState({ tab: newValue });
  };

  handleRemove = (event, rowData) => {
    this.setState({ dataReady: false });
    const itemID = rowData.itemId;
    var listings = [...this.state.listings];
    var outliers = [...this.state.outliers];
    // console.log("Outliers", outliers);
    // listings.splice(index, 1);
    for (var i in listings) {
      if (itemID === listings[i].itemId) {
        listings.splice(i, 1);
      }
    }
    for (var i in outliers) {
      if (itemID === outliers[i].itemId) {
        outliers.splice(i, 1);
      }
    }
    const details = getPriceDetails(listings);
    const ranking = itemGrade(listings);
    // const modified = getOutliers(listings);
    this.setState({
      listings: listings,
      outliers: outliers,
      outlierCount: outliers.length,
      details: details,
      ranking: ranking,
      dataReady: true,
    });
  };

  getResults(terms, minPrice, maxPrice, beforeDate, afterDate) {
    var url = encodeURI(
      `http://localhost:4000/api?keywords=` +
        terms +
        `&minPrice=` +
        minPrice +
        `&maxPrice=` +
        maxPrice +
        `&beforeDate=` +
        beforeDate +
        `&afterDate=` +
        afterDate
    );
    console.log("url", url);
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        // console.log("raw",body);
        if (body.listings.listings.length > 0) {
          this.setState({
            listings: body.listings.listings,
            outlierCount: body.listings.outlierCount,
            outliers: body.listings.outliers,
            ranking: body.ranking,
            details: body.details,
            dataReady: true,
          });
        } else {
          this.setState({
            noData: true,
            dataReady: true,
          });
        }
      });
  }

  async componentDidMount() {
    console.log("date", this.props.location.state.beforeDate);
    this.getResults(
      this.props.match.params.terms,
      this.props.location.state.minPrice,
      this.props.location.state.maxPrice,
      this.props.location.state.beforeDate,
      this.props.location.state.afterDate
    );
  }

  TabPanel(props) {
    const { children, value, index } = props;

    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box p={2}>{children}</Box>}
      </div>
    );
  }

  render() {
    if (this.state.dataReady && !this.state.noData) {
      // console.log("modified", this.state.outliers);
      return (
        <div className="result-root">
          <div>
            <SearchHeader handleChange={this.handleChange} />
          </div>
          <div>
            <div className="tab-bar">
              <NotificationsPopover
                listings={this.state.listings}
                outlierCount={this.state.outlierCount}
                outliers={this.state.outliers}
                handleRemove={this.handleRemove}
              />
              <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                centered
                indicatorColor="secondary"
              >
                <Tab className="tab" label="Statistics" />
                <Tab className="tab" label="Listings" />
              </Tabs>
            </div>
            <this.TabPanel value={this.state.tab} index={0}>
              <Grid
                container
                // direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} md={8}>
                  <ItemRanking ranking={this.state.ranking} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <SoldPriceDetails details={this.state.details} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <SoldPriceArea resultArr={this.state.listings} />
                </Grid>
              </Grid>
            </this.TabPanel>
            <this.TabPanel value={this.state.tab} index={1}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <ResultTable
                    listings={this.state.listings}
                    handleRemove={this.handleRemove}
                  />
                </Grid>
              </Grid>
            </this.TabPanel>
          </div>
        </div>
      );
    } else if (!this.state.dataReady && !this.state.noData) {
      return (
        <div className="result-root">
          <div>
            <SearchHeader handleChange={this.handleChange} />
          </div>
          <div>
            <div className="tab-bar">
              <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                centered
                indicatorColor="secondary"
              >
                <Tab className="tab" label="Statistics" />
                <Tab className="tab" label="Listings" />
              </Tabs>
            </div>
            <CircularProgress style={{ marginTop: "16px" }} />
          </div>
        </div>
      );
    } else if (this.state.dataReady && this.state.noData) {
      return (
        <div className="result-root">
          <div>
            <SearchHeader handleChange={this.handleChange} />
          </div>
          <div>
            <div className="tab-bar">
              <NotificationsPopover
                listings={this.state.listings}
                outlierCount={this.state.outlierCount}
                outliers={this.state.outliers}
                handleRemove={this.handleRemove}
              />
              <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                centered
                indicatorColor="secondary"
              >
                <Tab className="tab" label="Statistics" />
                <Tab className="tab" label="Listings" />
              </Tabs>
            </div>
            <this.TabPanel value={this.state.tab} index={0}>
              <Grid
                container
                // direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} md={8}>
                  <ItemRanking ranking={"F"} />
                </Grid>
              </Grid>
            </this.TabPanel>
            <this.TabPanel value={this.state.tab} index={1}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <h1>No Results</h1>
                </Grid>
              </Grid>
            </this.TabPanel>
          </div>
        </div>
      );
    }
  }
}

export default Results;
