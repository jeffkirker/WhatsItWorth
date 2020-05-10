import React, { Component } from 'react';
import { Divider, Grid, Form, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';
class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: []
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

  async componentDidMount() {
    this.setState({ value: this.props.match.params.terms});
    var url = `/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&` +
      `SERVICE-VERSION=1.7.0&` +
      `SECURITY-APPNAME=${process.env.REACT_APP_API_KEY}&` +
      `RESPONSE-DATA-FORMAT=XML&` +
      `REST-PAYLOAD&` +
      `keywords=${this.props.match.params.terms}&` +
      `itemFilter(0).name=SoldItemsOnly&` +
      `itemFilter(0).value=true`
    fetch(url)
      // .then(response => response.json())
      .then(data => console.log(data));
  }


  render() {
    console.log("params", )
    return (
      <div>
        <Grid>
          <Grid.Column width={2}>
            <Header as='h2' color='violet' textAlign='center' style={{ marginTop: '16px' }}>
              What's It Worth?
            </Header>
          </Grid.Column>
          <Grid.Column width={4} >
            <Form style={{ marginTop: '12px' }} onSubmit={this.handleSubmit}>
              <Form.Group >
                <Form.Input icon='search' iconPosition='left' placeholder='Search...' value={this.state.value} onChange={this.handleChange} />
                <Link to={`/results/${this.state.value.replace(/\s/g, '+')}`}>
                  <Form.Button color='violet' float='right' content='Search' />
                </Link>
              </Form.Group>
            </Form>
          </Grid.Column>

        </Grid>
        <Divider />
      </div>
    );
  }
}

export default Results;