import React, { Component } from 'react';
import { Card, Icon, Image, Grid, Divider } from 'semantic-ui-react';

class SoldPriceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MinBIN: 0,
      AvgBIN: 0,
      MaxBIN: 0,
      MinAuction: 0,
      AvgAuction: 0,
      MaxAuction: 0
    }
  }


  componentDidMount() {
    var MinBIN = 999999;
    var AvgBIN = 0;
    var MaxBIN = 0;
    var MinAuction = 999999;
    var AvgAuction = 0;
    var MaxAuction = 0;
    var BINCount = 0;
    var AuctionCount = 0;
    var BINSum = 0;
    var AuctionSum = 0;
    var resultArr = this.props.resultArr;
    for (var key in resultArr) {
      if (resultArr[key].isAuction) {
        AuctionCount++;
        AuctionSum = AuctionSum + resultArr[key].DaysToSell;
        if (resultArr[key].DaysToSell > MaxAuction) {
          MaxAuction = resultArr[key].DaysToSell;
        } else if (resultArr[key].DaysToSell < MinAuction) {
          MinAuction = resultArr[key].DaysToSell
        }
      } else {
        BINCount++;
        BINSum = BINSum + resultArr[key].DaysToSell;
        if (resultArr[key].DaysToSell > MaxBIN) {
          MaxBIN = resultArr[key].DaysToSell;
        } else if (resultArr[key].DaysToSell < MinBIN) {
          MinBIN = resultArr[key].DaysToSell
        }
      }
    }
    AvgAuction = parseFloat((AuctionSum / AuctionCount).toFixed(0));
    AvgBIN = parseFloat((BINSum / BINCount).toFixed(0));
    this.setState({
      MinBIN: MinBIN,
      AvgBIN: AvgBIN,
      MaxBIN: MaxBIN,
      MinAuction: MinAuction,
      AvgAuction: AvgAuction,
      MaxAuction: MaxAuction
    });
  }
  render() {
    if (this.state.MinBIN === 0) {
      this.setState({ MinBIN: "Same Day" });
    }
    if (this.state.MinAuction === 0) {
      this.setState({ MinAuction: "Same Day" });
    }
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              Days Taken To Sell
            </Card.Header>
            <Divider />
            <Grid centered celled columns={2}>
              <Grid.Row>
                <Grid.Column><h4 style={{ textAlign: "center" }}>Buy It Now</h4></Grid.Column>
                <Grid.Column><h4 style={{ textAlign: "center" }}>Auctions</h4></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Grid centered columns={3}>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Minimum<h4>{this.state.MinBIN}</h4>
                    </Grid.Column>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Average<h2>{this.state.AvgBIN}</h2>
                    </Grid.Column>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Maximum<h4>{this.state.MaxBIN}</h4>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column>
                  <Grid centered columns={3}>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Minimum<h4>{this.state.MinAuction}</h4>
                    </Grid.Column>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Average<h2>{this.state.AvgAuction}</h2>
                    </Grid.Column>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Maximum<h4>{this.state.MaxAuction}</h4>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/* <Divider vertical /> */}

          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default SoldPriceDetails;