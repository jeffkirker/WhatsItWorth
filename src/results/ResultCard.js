import React, { Component } from 'react'
import { Card, Icon, Image, Divider, Grid, Popup, Button } from 'semantic-ui-react'

class ResultCard extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (

      <Card fluid style={{ height: "180px" }}>
        <Card.Content>
          <Grid columns={2}>
            <Grid.Column style={{ paddingTop: "0px" }} width={5}>
              <div className="card-image">
                <span className="helper"></span><img
                  src={this.props.listing.galleryURL}
                />
              </div>
            </Grid.Column>
            <Grid.Column width={11}>
              {/* Put title */}
              <div className="card-title-container">
                <a className="card-title-text" href={this.props.listing.viewItemURL} target="_blank">{this.props.listing.title}</a>
              </div>
              <Divider />
              <Grid centered columns={2}>
                <Grid.Column width={10}>
                  <div>
                    <b>Date Sold:</b> {this.props.listing.dateSold}
                  </div>
                  <div>
                    <span className="card-field">Condition:</span> {this.props.listing.condition}
                  </div>
                  <div>
                    <span className="card-field">Country Sold From:</span> {this.props.listing.countrySold}
                  </div>
                </Grid.Column>
                <Grid.Column width={6}>
                  <div className="card-price">
                    ${this.props.listing.price}
                  </div>

                </Grid.Column>
              </Grid>
              <div className="card-delete">
                <Popup content='Remove from results' trigger={<Button icon='delete' negative onClick={() => this.props.handleDelete()}/>} />
              </div>
            </Grid.Column>
          </Grid>
        </Card.Content>

      </Card >
    )
  }
}

export default ResultCard
