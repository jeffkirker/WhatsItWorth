import React, { Component } from "react";
import SearchHeader from "../search/SearchHeader";

import CircularProgress from "@material-ui/core/CircularProgress";

import { getPriceDetails, itemGrade } from "./../../utilities/utils";
import TabBar from "./tabBar/TabBar";

class Results extends Component {
  constructor(props) {
    super(props);
    var afterDate = new Date();
    afterDate.setMonth(afterDate.getMonth() - 3);
    afterDate = afterDate.toISOString();
    var beforeDate = new Date();
    beforeDate = beforeDate.toISOString();
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
      beforeDate: beforeDate,
      afterDate: afterDate,
      minPrice: 0,
      maxPrice: 9999999,
      displayMessage: false,
      terms: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    // this.handleTabChange = this.handleTabChange.bind(this);
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
    console.log("tab: ", this.state.tab);
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
      process.env.REACT_APP_BACKEND_URL_DEV +
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
    let status;
    fetch(url)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((body) => {
        console.log("status", status);
        if (body.listings.listings.length > 0) {
          if (status === 500) {
            this.setState({
              displayMessage: true,
              terms: "iphone",
            });
          } else {
            this.setState({
              terms: this.match.params.terms,
            });
          }
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
    if (this.props.location.state !== undefined) {
      this.getResults(
        this.props.match.params.terms,
        this.props.location.state.minPrice,
        this.props.location.state.maxPrice,
        this.props.location.state.beforeDate,
        this.props.location.state.afterDate
      );
    } else {
      this.getResults(
        this.props.match.params.terms,
        this.state.minPrice,
        this.state.maxPrice,
        this.state.beforeDate,
        this.state.afterDate
      );
    }
  }

  render() {
    if (this.state.dataReady && !this.state.noData) {
      console.log(this.state.details, this.state.ranking, this.state.listings);
      return (
        <div className="result-root">
          <div>
            <SearchHeader handleChange={this.handleChange} />
          </div>
          <div>
            <TabBar
              handleTabChange={this.handleChange}
              handleRemove={this.handleRemove}
              listings={this.state.listings}
              details={this.state.details}
              ranking={this.state.ranking}
              outlierCount={this.state.outlierCount}
              outliers={this.state.outliers}
              tab={this.state.tab}
              displayMessage={this.state.displayMessage}
              terms={this.state.terms}
            />
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
            {/* <TabBar
              handleTabChange={this.handleChange}
              handleRemove={this.handleRemove}
              listings={this.state.listings}
              outlierCount={this.state.outlierCount}
              outliers={this.state.outliers}
              tab={this.state.tab}
            /> */}
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
            <TabBar
              handleTabChange={this.handleChange}
              handleRemove={this.handleRemove}
              listings={this.state.listings}
              details={this.state.details}
              ranking={"F"}
              outlierCount={this.state.outlierCount}
              outliers={this.state.outliers}
              tab={this.state.tab}
            />
          </div>
        </div>
      );
    }
  }
}

export default Results;
