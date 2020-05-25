import React, { Component } from 'react';
import { Divider, Grid, Form, Header, Container } from 'semantic-ui-react'
import ResultCard from './ResultCard';

class ResultList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Grid centered columns={2}>
          <Grid.Column width={5}>
            <Header style={{ textAlign: "center" }}>
              Buy It Now Results
                </Header>
            {this.props.BINArr.map((result) =>
              <ResultCard
                listing={result}
                handleDelete={this.props.handleDelete.bind(this)} />
            )}
          </Grid.Column>
          <Grid.Column width={5}>
            <Header style={{ textAlign: "center" }}>
              Auction Results
            </Header>
            {this.props.AuctionArr.map((result) =>
              <ResultCard listing={result}
                handleDelete={(result) => this.props.handleDelete(result)} />
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default ResultList;