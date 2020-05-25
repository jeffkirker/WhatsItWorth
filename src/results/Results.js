import React, { Component } from 'react';
import { Divider, Grid, Form, Header, Container } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import SoldPriceArea from '../visuals/SoldPriceArea';
import SoldPriceDetails from '../visuals/SoldPriceDetails';
import DaysToSellDetails from '../visuals/DaysToSellDetails';
import ResultList from './ResultList';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      resultArr: [],
      BINArr: [],
      AuctionArr: [],
      dataReady: false,
      auctionCount: 0,
      BuyItNowCount: 0,
      AuctionSum: 0,
      BuyItNowSum: 0,
      MaxAuctionPrice: 0,
      MinAuctionPrice: 0,
      MaxBINPrice: 0,
      MinBINPrice: 0,
      AvgAuction: 0,
      AvgBIN: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleDelete(item) {
    var array = [...this.state.resultArr];
    var index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ resultArr: array });
    }
    console.log("handleDelete");
    console.log(this.state.resultArr);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.getResults(this.state.value);
    this.props.history.push(`/results/${this.state.value.replace(/\s/g, '+')}`);
  }

  getDaysToSell(date1, date2) {
    console.log("dates", date1, date2);
    var newDate1 = new Date(date1.substring(5, 7) + "/" + date1.substring(8, 10) + "/" + date1.substring(0, 4));
    var newDate2 = new Date(date2.substring(5, 7) + "/" + date2.substring(8, 10) + "/" + date2.substring(0, 4));
    const diffTime = Math.abs(newDate2 - newDate1);
    const DaysToSell = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return DaysToSell;
  }
  // Do as much data processing here to pass to other components. Messy but 
  // allows for everything to render at once instead of component by component.
  async getResults(terms) {
    var resultArr = [];
    var BINArr = [];
    var AuctionArr = [];
    var AuctionSum = 0;
    var BuyItNowSum = 0;
    var AuctionCount = 0;
    var BuyItNowCount = 0;
    var MaxBINPrice = 0;
    var MinBINPrice = 9999999;
    var MaxAuctionPrice = 0;
    var MinAuctionPrice = 9999999;
    var AvgAuction = 0;
    var AvgBIN = 0;

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
    // Want item name, price, date sold, condition, Free shipping (boolean), Country, URLs, images, listing type
    console.log("Raw:", data);
    for (var key in data.findCompletedItemsResponse[0].searchResult[0].item) {
      var result = {
        title: "",
        price: 0,
        dateSold: "",
        dateStarted: "",
        DaysToSell: 0,
        condition: "",
        freeShipping: true,
        countrySold: "",
        isAuction: false,
        bidCount: 0,
        galleryURL: "",
        viewItemURL: ""
      }



      result.title = data.findCompletedItemsResponse[0].searchResult[0].item[key].title[0];
      result.price = parseFloat(data.findCompletedItemsResponse[0].searchResult[0].item[key].sellingStatus[0].currentPrice[0].__value__, 10);
      result.dateStarted = data.findCompletedItemsResponse[0].searchResult[0].item[key].listingInfo[0].startTime[0].substring(0, 10);
      result.dateSold = data.findCompletedItemsResponse[0].searchResult[0].item[key].listingInfo[0].endTime[0].substring(0, 10);
      result.DaysToSell = this.getDaysToSell(result.dateStarted, result.dateSold);
      result.countrySold = data.findCompletedItemsResponse[0].searchResult[0].item[key].country[0];
      result.galleryURL = data.findCompletedItemsResponse[0].searchResult[0].item[key].galleryURL[0];
      result.viewItemURL = data.findCompletedItemsResponse[0].searchResult[0].item[key].viewItemURL[0];
      // Not all items have conditions, might throw an error.
      try {
        result.condition = data.findCompletedItemsResponse[0].searchResult[0].item[key].condition[0].conditionDisplayName[0];
      } catch {
        result.condition = null;
      }
      // More types of shipping than just free or not, so create boolean
      if (data.findCompletedItemsResponse[0].searchResult[0].item[key].shippingInfo[0].shippingType[0].localeCompare("free") === 0) {
        result.freeShipping = true;
      } else {
        result.freeShipping = false;
      }
      // Also more types of listings than just Auction of BIN, create boolean and get bids if auction
      if (data.findCompletedItemsResponse[0].searchResult[0].item[key].listingInfo[0].listingType[0].localeCompare("Auction") === 0) {
        result.isAuction = true;
        result.bidCount = data.findCompletedItemsResponse[0].searchResult[0].item[key].sellingStatus[0].bidCount[0];

        // Do a bunch of awkward data collection, mins, maxes, counts, etc.
        AuctionSum = AuctionSum + result.price;
        AuctionCount++;
        if (result.price > MaxAuctionPrice) {
          MaxAuctionPrice = result.price;
        }
        if (result.price < MinAuctionPrice) {
          MinAuctionPrice = result.price;
        }
      } else {
        BuyItNowSum = BuyItNowSum + result.price;
        BuyItNowCount++;
        if (result.price > MaxBINPrice) {
          MaxBINPrice = result.price;
        }
        if (result.price < MinBINPrice) {
          MinBINPrice = result.price;
        }
      }

      // console.log(result);
      resultArr.push(result);
      if (result.isAuction) {
        AuctionArr.push(result);
      } else {
        BINArr.push(result);
      }
    }
    AvgAuction = parseFloat((AuctionSum / AuctionCount).toFixed(2));
    AvgBIN = parseFloat((BuyItNowSum / BuyItNowCount).toFixed(2));




    this.setState({
      AvgAuction: AvgAuction,
      AvgBIN: AvgBIN,
      MaxAuctionPrice: MaxAuctionPrice,
      MinAuctionPrice: MinAuctionPrice,
      MaxBINPrice: MaxBINPrice,
      MinBINPrice: MinBINPrice,
      resultArr: resultArr,
      BINArr: BINArr,
      AuctionArr: AuctionArr,
      dataReady: true
    });
  }

  async componentDidMount() {
    console.log(this.props.match.params.terms);
    this.getResults(this.props.match.params.terms);
  }


  render() {
    if (this.state.dataReady) {
      return (
        <div>
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
                      <Form.Button color='violet' float='right' content='Search' onClick={this.handleSubmit} />
                    </Link>
                  </Form.Group>
                </Form>
              </Grid.Column>
            </Grid>
            <Divider />
          </div>
          <div>
            <ResultList
              AuctionArr={this.state.AuctionArr}
              BINArr={this.state.BINArr} 
              handleDelete={(listing) => this.handleDelete(listing)}/>
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
        <div>Loading...</div>
      );
    }
  }
}



export default Results;