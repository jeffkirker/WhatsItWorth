import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

class SearchHeader extends Component {
  constructor(props) {
    super(props);
    var afterDate = new Date();
    afterDate.setMonth(afterDate.getMonth() - 3);
    afterDate = afterDate.toISOString();
    var beforeDate = new Date();
    beforeDate = beforeDate.toISOString();
    this.state = {
      value: "",
      listingType: { Auction: true, BIN: true },
      category: "",
      beforeDate: beforeDate,
      afterDate: afterDate,
      minPrice: 0,
      maxPrice: 9999999,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleChange(this.state.value);
  }

  render() {
    return (
      <div className="search-header-container">
        <Link to="/">
          <h2 className="search-header-title">What's It Worth?</h2>
        </Link>
        <form className="search-header-container">
          <div>
            <TextField
              variant="outlined"
              size="small"
              label="Search"
              onChange={this.handleChange}
            >
              Search
            </TextField>
          </div>
          <div className="search-header-search-button">
            <Link
              to={{
                pathname: `/results/${encodeURI(this.state.value)}`,
              }}
            >
              <button
                className="search-button"
                onClick={this.handleSubmit}
                type="submit"
              >
                Search
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchHeader;
