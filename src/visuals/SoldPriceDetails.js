import React, { Component } from 'react';
import { Card, Icon, Image, Grid, Divider } from 'semantic-ui-react';

class SoldPriceDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              Price Sold For
            </Card.Header>
            <Divider />
            <Grid centered celled columns={2}>
              <Grid.Row>
                <Grid.Column><h4 style={{ textAlign: "center" }}>Buy It Now (USD)</h4></Grid.Column>
                <Grid.Column><h4 style={{ textAlign: "center" }}>Auctions (USD)</h4></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Grid centered columns={3}>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Minimum<h4>${this.props.MinBIN}</h4>
                    </Grid.Column>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Average<h2>${this.props.AvgBIN}</h2>
                    </Grid.Column>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Maximum<h4>${this.props.MaxBIN}</h4>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column>
                <Grid centered columns={3}>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Minimum<h4>${this.props.MinAuction}</h4>
                    </Grid.Column>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Average<h2>${this.props.AvgAuction}</h2>
                    </Grid.Column>
                    <Grid.Column style={{ textAlign: "center" }}>
                      Maximum<h4>${this.props.MaxAuction}</h4>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default SoldPriceDetails;