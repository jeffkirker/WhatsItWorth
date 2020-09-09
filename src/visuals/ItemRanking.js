import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";

class ItemRanking extends Component {
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
              <h2 className="card-title-text">Item Grade</h2>
              <div className="item-grade-letter">
                {this.props.ranking.grade}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Card
            className="item-grade-card"
            raised
            style={{ marginBottom: "1rem" }}
          >
            <CardContent>
              <h2 className="card-title-text">Item Grade</h2>
              <div className="item-grade-letter">
                F
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
}
export default ItemRanking;
