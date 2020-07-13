import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@material-ui/core";

class SoldPriceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      dataReady: false,
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails() {
    var url = encodeURI(`http://localhost:4000/details`);

    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        this.setState({
          details: body,
          dataReady: true,
        });
      });
  }

  render() {
    if (this.state.dataReady) {
      return (
        <div>
          <Card raised style={{marginBottom: "1rem"}}>
            <CardContent>
              <CardHeader title="Price Sold For" style={{paddingTop: '0'}}/>
              <Grid container columns={2}>
                <Grid item xs={6}>
                  <h4 style={{ textAlign: "center" }}>Buy It Now (USD)</h4>
                  <Grid container align-items="center" justify="center">
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      Minimum
                      <h4>
                        $
                        {this.state.details.MinBIN != null
                          ? this.state.details.MinBIN
                          : 0}
                      </h4>
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: "center" }}>
                      Average
                      <h2>
                        $
                        {this.state.details.AvgBIN != null
                          ? this.state.details.AvgBIN
                          : 0}
                      </h2>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      Maximum
                      <h4>
                        $
                        {this.state.details.MaxBIN != null
                          ? this.state.details.MaxBIN
                          : 0}
                      </h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <h4 style={{ textAlign: "center" }}>Auctions (USD)</h4>
                  <Grid container align-items="center" justify="center">
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      Minimum
                      <h4>
                        $
                        {this.state.details.MinAuction != null
                          ? this.state.details.MinAuction
                          : 0}
                      </h4>
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: "center" }}>
                      Average
                      <h2>
                        $
                        {this.state.details.AvgAuction != null
                          ? this.state.details.AvgAuction
                          : 0}
                      </h2>
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: "center" }}>
                      Maximum
                      <h4>
                        $
                        {this.state.details.MaxAuction != null
                          ? this.state.details.MaxAuction
                          : 0}
                      </h4>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default SoldPriceDetails;
