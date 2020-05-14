import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ResultCard = (props) => (
  <Card>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      {/* Put title */}
      <Card.Header>{props.listing.title}</Card.Header>
      {/* Put sold date */}
      <Card.Meta>
        <span className='date'>{props.listing.dateSold}</span>
      </Card.Meta>
      {/* Put Price, Country sold in, condition */}
      <Card.Description>
        {props.listing.price}, {props.listing.countrySold}, {props.listing.condition}
      </Card.Description>
    </Card.Content>
    {/* Put link to ebay listing, and button to remove from results */}
    <Card.Content extra>
      <a>

      </a>
    </Card.Content>
  </Card>
)

export default ResultCard
