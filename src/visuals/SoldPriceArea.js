import React, { Component } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "@material-ui/core/Card";

class SoldPriceArea extends Component {
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
    var countingData = {
      name: null,
      BuyItNowSum: 0,
      BuyItNowCount: 0,
      AuctionSum: 0,
      AuctionCount: 0,
    };

    var data = [];
    for (var i in resultArr) {
      if (countingData.name == null) {
        countingData.name = resultArr[i].dateSold.slice(0, 10);
        if (resultArr[i].isAuction) {
          countingData.AuctionCount++;
          countingData.AuctionSum += +resultArr[i].salePrice;
        } else {
          countingData.BuyItNowCount++;
          countingData.BuyItNowSum += +resultArr[i].salePrice;
        }
      } else if (
        countingData.name.localeCompare(resultArr[i].dateSold.slice(0, 10)) ===
        0
      ) {
        if (resultArr[i].isAuction) {
          countingData.AuctionCount++;
          countingData.AuctionSum += +resultArr[i].salePrice;
        } else {
          countingData.BuyItNowCount++;
          countingData.BuyItNowSum += +resultArr[i].salePrice;
        }
      } else {
        var dataPoint = {
          name: null,
          BuyItNow: 0,
          Auction: 0,
        };
        dataPoint.name = countingData.name;
        if (countingData.BuyItNowCount > 0) {
          dataPoint.BuyItNow = parseFloat(
            (countingData.BuyItNowSum / countingData.BuyItNowCount).toFixed(2)
          );
        } else {
          dataPoint.BuyItNow = 0;
        }
        if (countingData.AuctionCount > 0) {
          dataPoint.Auction = parseFloat(
            (countingData.AuctionSum / countingData.AuctionCount).toFixed(2)
          );
        } else {
          dataPoint.Auction = 0;
        }
        data.push(dataPoint);
        var countingData = {
          name: null,
          BuyItNowSum: 0,
          BuyItNowCount: 0,
          AuctionSum: 0,
          AuctionCount: 0,
        };
        countingData.name = resultArr[i].dateSold.slice(0, 10);
        if (resultArr[i].isAuction) {
          countingData.AuctionCount++;
          countingData.AuctionSum += resultArr[i].salePrice;
        } else {
          countingData.BuyItNowCount++;
          countingData.BuyItNowSum += resultArr[i].salePrice;
        }
      }
    }
    if (countingData.name != null) {
      var dataPoint = {
        name: null,
        BuyItNow: 0,
        Auction: 0,
      };
      dataPoint.name = countingData.name;
      if (countingData.BuyItNowCount > 0) {
        dataPoint.BuyItNow = parseFloat(
          (countingData.BuyItNowSum / countingData.BuyItNowCount).toFixed(2)
        );
      } else {
        dataPoint.BuyItNow = 0;
      }
      if (countingData.AuctionCount > 0) {
        dataPoint.Auction = parseFloat(
          (countingData.AuctionSum / countingData.AuctionCount).toFixed(2)
        );
      } else {
        dataPoint.Auction = 0;
      }

      data.push(dataPoint);
    }
    this.setState({ data: data.reverse() });
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
          <Card raised className="chart-container" style={{ marginBottom: "1rem" }}>
            <h2 className="card-title-text">Average Prices Over Time</h2>
            <ResponsiveContainer height="100%">
              <AreaChart
                data={this.state.data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#59C9A5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#59C9A5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D81E5B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#D81E5B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="BuyItNow"
                  stroke="#59C9A5"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="Auction"
                  stroke="#D81E5B"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

export default SoldPriceArea;
