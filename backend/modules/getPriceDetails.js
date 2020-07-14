exports.getPriceDetails = (listings) => {
  const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);
  const arrMax = (arr) => Math.max(...arr);
  const arrMin = (arr) => Math.min(...arr);

  const BINPrices = [];
  const AuctionPrices = [];
  for (var i in listings) {
    if (listings[i].isAuction) {
      AuctionPrices.push(parseFloat(listings[i].salePrice));
    } else {
      BINPrices.push(parseFloat(listings[i].salePrice));
    }
  }
  const MinBIN = arrMin(BINPrices).toFixed(2);
  const MaxBIN = arrMax(BINPrices).toFixed(2);
  const MinAuction = arrMin(AuctionPrices).toFixed(2);
  const MaxAuction = arrMax(AuctionPrices).toFixed(2);
  const AvgBIN = (arrSum(BINPrices) / BINPrices.length).toFixed(2);
  const AvgAuction = (arrSum(AuctionPrices) / AuctionPrices.length).toFixed(
    2
  );
  const results = {
    MinBIN,
    MaxBIN,
    MinAuction,
    MaxAuction,
    AvgBIN,
    AvgAuction,
  };
  return results;
}