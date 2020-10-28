import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import "./results.css";

class ResultCard extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const result = this.props.listing;
    return (
      <Card className="card-container">
        <div className="card-image">
          <img src={result.imageUrl} alt="" />
        </div>
        <div className="card-description">
          <div className="card-title-text">
            <a
              className="card-title-text"
              href={result.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {result.title}
            </a>
          </div>
          <div className="card-details">
            <div>
              <b>Date Sold:</b> {result.dateSold}
            </div>
            <div>
              <span className="card-field">Condition:</span> {result.condition}
            </div>
            <div>
              <span className="card-field">Country Sold From:</span>{" "}
              {result.country}
            </div>
          </div>
        </div>
        <div className="card-price">${(Math.round(result.salePrice * 100) /100).toFixed(2)}</div>
      </Card>
    );
  }
}

export default ResultCard;