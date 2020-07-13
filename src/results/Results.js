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
import Popover from "@material-ui/core/Popover";
import NotificationsPopover from "../popover/notificationPopover";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      listings: null,
      ranking: null,
      value: "",
      AuctionArr: [],
      dataReady: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  getResults(terms) {
    var url = encodeURI(`http://localhost:4000/keywords/` + terms);

    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        this.setState({
          listings: body.listings.listings,
          outlierCount: body.listings.outlierCount,
          ranking: body.details,
          dataReady: true,
        });
      });
  }

  async componentDidMount() {
    this.getResults(this.props.match.params.terms);
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
    if (this.state.dataReady) {
      // console.log("modified",this.state.listings);
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
                  <SoldPriceDetails />
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
                  <ResultTable listings={this.state.listings} />
                </Grid>
              </Grid>
            </this.TabPanel>
          </div>
        </div>
      );
    } else {
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
    }
  }
}

export default Results;
