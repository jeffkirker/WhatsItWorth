import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@material-ui/core";

class ItemRanking extends Component {
  render() {
    if (this.props.ranking !== "F") {
      return (
        <div>
          <Card raised style={{ marginBottom: "1rem" }}>
            <CardContent>
              <CardHeader title="Item Grade" style={{ paddingTop: "0" }} />
              <Grid container columns={2} style={{ alignItems: "center" }}>
                <Grid item xs={6}>
                  <div className="item-grade-letter">
                    {this.props.ranking.grade}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={6}>
                    <div className="item-grade-column">
                      <div className="item-grade-row">
                        <h4>Last 3 Days: </h4>
                        {this.props.ranking.pastSales.shortTerm}
                      </div>
                      <div className="item-grade-row">
                        <h4>Last 1 Month: </h4>
                        {this.props.ranking.pastSales.medTerm}
                      </div>
                      <div className="item-grade-row">
                        <h4>Last 3 Months: </h4>
                        {this.props.ranking.pastSales.longTerm}
                      </div>
                      <Divider />
                      <div className="item-grade-row">
                        <h4>Avg Days To Sell: </h4>
                        {this.props.ranking.turnAround}
                      </div>
                    </div>
                  </Grid>
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
              <CardHeader title="Item Grade" style={{ paddingTop: "0" }} />
              <Grid container columns={2} style={{ alignItems: "center" }}>
                <Grid item xs={6}>
                  <div className="item-grade-letter">
                    F
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={6}>
                    <div className="item-grade-column">
                      <div className="item-grade-row">
                        <h4>Last 3 Days: </h4>
                        0
                      </div>
                      <div className="item-grade-row">
                        <h4>Last 1 Month: </h4>
                        0
                      </div>
                      <div className="item-grade-row">
                        <h4>Last 3 Months: </h4>
                        0
                      </div>
                      <Divider />
                      <div className="item-grade-row">
                        <h4>Avg Days To Sell: </h4>
                        N/A
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
}
export default ItemRanking;
