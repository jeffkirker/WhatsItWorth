import React, { Component } from "react";
import { Card, CardContent, Divider, Grid } from "@material-ui/core";

class ItemHistory extends Component {
  render() {
    if (this.props.ranking !== "F") {
      return (
        <div>
          <Card
            className="item-grade-card"
            raised
            style={{ marginBottom: "1rem" }}
          >
            <CardContent>
              <h2 className="card-title-text">Recent Sale History</h2>

              <Grid container columns={3}>
                <Grid item xs={6}>
                  <div className="item-history-column">
                    <div className="item-history-row">
                      <h3 className="item-history">Last 3  Days: </h3>
                      {this.props.ranking.pastSales.shortTerm}
                    </div>
                    <div className="item-history-row">
                      <h3 className="item-history">Last 30 days: </h3>
                      {this.props.ranking.pastSales.medTerm}
                    </div>
                    <div className="item-history-row">
                      <h3 className="item-history">Last 90 days: </h3>
                      {this.props.ranking.pastSales.longTerm}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="item-history-column">
                    <h3>Avg Days To Sell: </h3>
                    <div style={{fontSize: "large"}}>{this.props.ranking.turnAround}</div>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Card raised style={{ marginBottom: "1rem" }}>
            <CardContent>
              <h2 className="card-title-text">Item Grade</h2>
              <div className="item-grade-row">
                <h4>Last 3 Days: </h4>0
              </div>
              <div className="item-grade-row">
                <h4>Last 1 Month: </h4>0
              </div>
              <div className="item-grade-row">
                <h4>Last 3 Months: </h4>0
              </div>
              <Divider />
              <div className="item-grade-row">
                <h4>Avg Days To Sell: </h4>
                N/A
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
}
export default ItemHistory;
