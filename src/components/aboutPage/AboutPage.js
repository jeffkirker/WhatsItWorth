import React, { Component } from "react";
import { Button, Message, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

class AboutPage extends Component {
  render() {
    return (
      <div className="about-page">
        <div className="about-button">
          <Link to={{ pathname: `/` }}>
            <Button basic color="violet">
              Back to Search
            </Button>
          </Link>
        </div>
        <div className="about-header">
          <Header as="h1" color="violet" textAlign="center">
            What's It Worth?
          </Header>
        </div>

        <div className="about-message">
          <Message
            error
            header="Not getting the listings you want?"
            list={[
              "Unfortunately, on 15/10/2020 eBay deprecated the api endpoint I used to develop this application.",
              "The endpoint does work some of the time, but you may be getting dummy data if What's It Worth hits its rate limit.",
              "Currently, an alternative way to get the desired data is being developed, so check back soon.",
            ]}
          />
        </div>
        <div className="about-text">
          <Header as="h2" color="violet">
            What is What's It Worth?
          </Header>
          <p>
            What's It Worth is a tool for finding out what your stuff is
            actually worth on eBay. Many people make the mistake of searching up
            items they wish to sell on ebay, and using the current listings as a
            basis for pricing. This is a big problem, because anyone can list
            anything for any price on eBay.
          </p>
          <br></br>
          <p>
            What you really need is to see what items have actually sold for in
            the past. What's It Worth provides details on only sold listings
            matching your search parameters, and provides additional statistics
            so you can make an informed pricing decision when listing your
            items.
          </p>
          <Header as="h3" color="violet">
            Why make this app?
          </Header>
          <p>
            In the summer of 2019, I was unable to find a job between school
            semesters. Instead of working at a coffee shop I decided to try my
            hand at selling on eBay. My favourite places to source items were
            garage sales, yard sales, and estate sales. The biggest problem with
            finding something worth listing, is finding what it's actually
            worth, and how likely it is to sell in a reasonable time frame. This
            tool helps.
          </p>
          <br></br>
          <p>
            Of course, this is a work in progress. It is also a tool I built to
            teach myself react and nodejs, so as I improve, so will
            WhatsItWorth.
          </p>
          <a href="https://github.com/jeffkirker/WhatsItWorth">
            Check out the repository
          </a>
        </div>
      </div>
    );
  }
}

export default AboutPage;
