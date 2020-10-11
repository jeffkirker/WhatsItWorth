import React, { Component } from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AdvancedSearch from "./AdvancedSearch";

class Search extends Component {
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
    this.handleAfterDateChange = this.handleAfterDateChange.bind(this);
    this.handleBeforeDateChange = this.handleBeforeDateChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleMinPriceChange = this.handleMinPriceChange.bind(this);
    this.handleMaxPriceChange = this.handleMaxPriceChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  handleAfterDateChange = (date) => {
    this.setState({ afterDate: date.toISOString() });
  };
  handleBeforeDateChange = (date) => {
    this.setState({ beforeDate: date.toISOString() });
    console.log("Before data changed: ", date);
  };

  handleCheckChange = (event) => {
    this.setState({
      listingType: {
        ...this.state.listingType,
        [event.target.name]: event.target.checked,
      },
    });
  };

  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  };

  handleMinPriceChange(price) {
    this.setState({ minPrice: price });
  }

  handleMaxPriceChange(price) {
    this.setState({ maxPrice: price });
  }

  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 600 }}>
            <Header as="h2" color="violet" textAlign="center">
              What's It Worth?
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Form.Input
                fluid
                icon="search"
                iconPosition="left"
                placeholder="Search..."
                value={this.state.value}
                onChange={this.handleChange}
              />
              <AdvancedSearch
                handleAfterDateChange={this.handleAfterDateChange}
                handleBeforeDateChange={this.handleBeforeDateChange}
                handleCheckChange={this.handleCheckChange}
                handleCategoryChange={this.handleCategoryChange}
                handleMinPriceChange={this.handleMinPriceChange}
                handleMaxPriceChange={this.handleMaxPriceChange}
                listingType={this.state.listingType}
                category={this.state.category}
                selectedAfterDate={this.state.afterDate}
                selectedBeforeDate={this.state.beforeDate}
              />

              <Link
                to={{
                  pathname: `/results/${encodeURI(this.state.value)}`,
                  state: {
                    listingType: this.state.listingType,
                    category: this.state.category,
                    beforeDate: this.state.beforeDate,
                    afterDate: this.state.afterDate,
                    minPrice: this.state.minPrice,
                    maxPrice: this.state.maxPrice,
                  },
                }}
              >
                <Button color="violet" fluid size="large">
                  Search
                </Button>
              </Link>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Search;
