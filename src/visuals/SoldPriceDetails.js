import React, { Component } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";

class SoldPriceDetails extends Component {
  render() {
    return (
      <div>
        <Card
          className="sold-price-card"
          raised
          style={{ marginBottom: "1rem" }}
        >
          <CardContent>
            <h2 className="card-title-text">Price Sold For</h2>
            <Grid container columns={2}>
              <Grid item xs={6}>
                <h4 style={{ textAlign: "center" }}>Buy It Now (USD)</h4>
                <Grid container align-items="center" justify="center">
                  <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
                    Minimum
                    <h4>
                      $
                      {this.props.details.MinBIN != null
                        ? this.props.details.MinBIN
                        : 0}
                    </h4>
                  </Grid>
                  <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                    Average
                    <h2 className="sold-price-BIN">
                      $
                      {this.props.details.AvgBIN != null
                        ? this.props.details.AvgBIN
                        : 0}
                    </h2>
                  </Grid>
                  <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
                    Maximum
                    <h4>
                      $
                      {this.props.details.MaxBIN != null
                        ? this.props.details.MaxBIN
                        : 0}
                    </h4>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <h4 style={{ textAlign: "center" }}>Auctions (USD)</h4>
                <Grid container align-items="center" justify="center">
                  <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
                    Minimum
                    <h4>
                      $
                      {this.props.details.MinAuction != null
                        ? this.props.details.MinAuction
                        : 0}
                    </h4>
                  </Grid>
                  <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                    Average
                    <h2 className="sold-price-auction">
                      $
                      {this.props.details.AvgAuction != null
                        ? this.props.details.AvgAuction
                        : 0}
                    </h2>
                  </Grid>
                  <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
                    Maximum
                    <h4>
                      $
                      {this.props.details.MaxAuction != null
                        ? this.props.details.MaxAuction
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
  }
}

export default SoldPriceDetails;
