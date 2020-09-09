import React, { Component } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "@material-ui/core/Card";

class SoldPriceScatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dummyDate: [
        { Auction: 1, BuyItNow: 2, name: "a" },
        { Auction: 3, BuyItNow: 2, name: "b" },
        { Auction: 5, BuyItNow: 6, name: "c" },
        { Auction: 2, BuyItNow: 0, name: "d" },
      ],
      dataReady: false,
    };
  }

  formatData() {
    var resultArr = this.props.resultArr;
    var BINData = [];
    var AuctionData = [];
    var data = [];
    for (var i in resultArr) {
      var dataPoint = {
        x: resultArr[i].dateSold.slice(0, 10),
        y: resultArr[i].salePrice,
        z: 0,
      };
      if (resultArr[i].isAuction) {
        AuctionData.push(dataPoint);
      } else {
        BINData.push(dataPoint);
      }
      data.push(dataPoint);
    }
    this.setState({
      BINData: BINData.sort((a, b) => b.dateSold - a.dateSold).reverse(),
      AuctionData: AuctionData.sort(
        (a, b) => b.dateSold - a.dateSold
      ).reverse(),
      data: data.sort((a, b) => b.dateSold - a.dateSold).reverse(),
    });
    // this.setState({ data: data.reverse() });
    this.setState({ dataReady: true });
  }

  componentDidMount() {
    this.formatData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resultArr !== this.props.resultArr) {
      this.formatData();
    }
  }

  render() {
    if (this.state.dataReady) {
      return (
        <div>
          <Card raised className="chart-container">
            <h2 className="card-title-text">Sold Prices Over Time</h2>
            <ResponsiveContainer height="100%">
              <ScatterChart
                width={400}
                height={400}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="category" dataKey="x" name="Date" />
                <YAxis type="number" dataKey="y" name="Price" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter
                  name="Auctions"
                  data={this.state.data}
                  fill="#59C9A5"
                />
                {/* <Scatter
                  name="Buy It Nows"
                  data={this.state.BINData}
                  fill="#8884d8"
                /> */}
              </ScatterChart>
            </ResponsiveContainer>
          </Card>
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

export default SoldPriceScatter;
