import React, { Component } from 'react';
import { Divider, Grid, Form, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ResultCard from './ResultCard';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      resultArr: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("working?");
    this.setState({ value: event.target.value });
  }
  async handleSubmit(event) {
    console.log("terms:", this.state.value);
    console.log("working2?");

    event.preventDefault();
    this.getResults(this.state.value);
  }

  async getResults(terms) {
    var resultArr = [];
    
    // this.setState({ value: this.props.match.params.terms });
    var url = `/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&` +
      `SERVICE-VERSION=1.7.0&` +
      `SECURITY-APPNAME=${process.env.REACT_APP_API_KEY}&` +
      `RESPONSE-DATA-FORMAT=JSON&` +
      `REST-PAYLOAD&` +
      `keywords=${terms}&` +
      `itemFilter(0).name=SoldItemsOnly&` +
      `itemFilter(0).value=true&` +
      `sortOrder=EndTimeSoonest`
    const response = await fetch(url);
    const data = await response.json();
    // Want item name, price, date sold, condition, Free shipping (boolean), Country 
    // console.log("Raw:", data);
    for (var key in data.findCompletedItemsResponse[0].searchResult[0].item) {
      var result = {
        title: "",
        price: 0,
        dateSold: "",
        condition: "",
        freeShipping: true,
        countrySold: ""
      }
      result.title = data.findCompletedItemsResponse[0].searchResult[0].item[key].title[0];
      result.price = data.findCompletedItemsResponse[0].searchResult[0].item[key].sellingStatus[0].currentPrice[0].__value__;
      result.dateSold = data.findCompletedItemsResponse[0].searchResult[0].item[key].listingInfo[0].endTime[0];
      try {
        result.condition = data.findCompletedItemsResponse[0].searchResult[0].item[key].condition[0].conditionDisplayName[0];
      } catch {
        result.condition = null;
      }
      if (data.findCompletedItemsResponse[0].searchResult[0].item[key].shippingInfo[0].shippingType[0].localeCompare("free") === 0) {
        result.freeShipping = true;
      } else {
        result.freeShipping = false;
      }
      result.countrySold = data.findCompletedItemsResponse[0].searchResult[0].item[key].country[0];
      // console.log(result);
      resultArr.push(result);
    }
    this.setState({ resultArr: resultArr });
  }

  async componentDidMount() {
    console.log(this.props.match.params.terms);
    this.getResults(this.props.match.params.terms);
    // console.log(resultArr);
  }


  render() {
    // console.log(this.state.resultArr);
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
                  <Form.Button color='violet' float='right' content='Search' onClick={this.handleSubmit}/>
                </Link>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
        <Divider />
        {this.state.resultArr.map((result) => 
          <ResultCard listing={result} />
        )}
      </div>
    );
  }
}

export default Results;