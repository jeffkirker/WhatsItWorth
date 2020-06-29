import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
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

// <Card.Content>
// <Grid columns={2}>
//   <Grid.Column style={{ paddingTop: "0px" }} width={5}>
//     <div className="card-image">
//       <span className="helper"></span>
//       <img src={this.props.listing.imageUrl} alt="Result Listing"/>
//     </div>
//   </Grid.Column>
//   <Grid.Column width={11}>
//     {/* Put title */}
//     <div className="card-title-container">
//       <a
//         className="card-title-text"
//         href={this.props.listing.viewItemURL}
//         target="_blank"
//       >
//         {this.props.listing.title}
//       </a>
//     </div>
//     <Divider />
//     <Grid centered columns={2}>
//       <Grid.Column width={10}>
//         <div>
//           <b>Date Sold:</b> {this.props.listing.dateSold}
//         </div>
//         <div>
//           <span className="card-field">Condition:</span>{" "}
//           {this.props.listing.condition}
//         </div>
//         <div>
//           <span className="card-field">Country Sold From:</span>{" "}
//           {this.props.listing.countrySold}
//         </div>
//       </Grid.Column>
//       <Grid.Column width={6}>
//         <div className="card-price">${this.props.listing.salePrice}</div>
//       </Grid.Column>
//     </Grid>
//     <div className="card-delete">
//       <Popup
//         content="Remove from results"
//         trigger={
//           <Button
//             icon="delete"
//             negative
//             onClick={() => this.props.handleDelete(result)}
//           />
//         }
//       />
//     </div>
//   </Grid.Column>
// </Grid>
// </Card.Content>
