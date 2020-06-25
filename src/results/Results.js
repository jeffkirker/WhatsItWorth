import React, { Component } from "react";
import SearchHeader from "../search/SearchHeader";
import ResultCard from "./ResultCard";
import { Grid } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Box from '@material-ui/core/Box';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      listings: null,
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
    var url = encodeURI(`http://localhost:4000/` + terms);

    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        this.setState({
          listings: body,
          dataReady: true,
        });
        console.log("Got results", body);
      });
  }

  async componentDidMount() {
    this.getResults(this.props.match.params.terms);
  }

  TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  render() {
    if (this.state.dataReady) {
      console.log("Listings", this.state.listings);
      return (
        <div>
          <div>
            <SearchHeader handleChange={this.handleChange} />
          </div>
          <div>
            <AppBar position="static">
              <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                aria-label="simple tabs example"
              >
                <Tab label="Statistics" />
                <Tab label="Listings" />
              </Tabs>
            </AppBar>
            <this.TabPanel value={this.state.tab} index={0}></this.TabPanel>
            <this.TabPanel value={this.state.tab} index={1}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  {this.state.listings.map((listing) => (
                    <ResultCard
                      key={listing.itemId}
                      listing={listing}
                      // handleDelete={this.handleDelete.bind(this)}
                    />
                  ))}
                </Grid>
              </Grid>
            </this.TabPanel>

            {/* <Container fluid={true}> */}
            {/* <Grid.Column width={4}>
                <SoldPriceArea
                  resultArr={this.state.resultArr} />
              </Grid.Column>
              <Grid.Column width={4}>
                <SoldPriceDetails
                  MaxBIN={this.state.MaxBINPrice}
                  MaxAuction={this.state.MaxAuctionPrice}
                  MinBIN={this.state.MinBINPrice}
                  MinAuction={this.state.MinAuctionPrice}
                  AvgAuction={this.state.AvgAuction}
                  AvgBIN={this.state.AvgBIN} />

                <DaysToSellDetails resultArr={this.state.resultArr} />

              </Grid.Column> */}
          </div>
          {/* </Container> */}
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <SearchHeader handleChange={this.handleChange} />
          </div>
          <div>Loading...</div>
        </div>
      );
    }
  }
}

export default Results;
