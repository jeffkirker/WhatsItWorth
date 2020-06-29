import React, { Component } from "react";
import { Typography, Divider, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
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
        <h2 className="search-header-title">What's It Worth?</h2>
        <form className="search-header-container">
          <div className="search-header-search-bar">
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
            <Link to={`/results/${encodeURI(this.state.value)}`}>
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
