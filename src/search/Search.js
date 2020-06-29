import React, { Component } from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Search extends Component {
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
              <Link to={`/results/${encodeURI(this.state.value)}`}>
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
