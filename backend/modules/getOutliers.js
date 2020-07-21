const { std, mean, median } = require("mathjs");

exports.getOutliers = (listings) => {
  const outliers = [];
  var priceArr = [];
  var outlierCount = 0;
  // var n = listings.length;
  for (var i in listings) {
    priceArr.push(parseFloat(listings[i].salePrice));
  }
  priceArr.sort();
  // const med = median(priceArr);
  const stdDev = std(priceArr);
  const priceMean = mean(priceArr);

  // const lowerQ = priceArr[parseInt(0.25 * (n + 1))];
  // const upperQ = priceArr[parseInt(0.75 * (n + 1))];
  // const interQ = upperQ - lowerQ;

  // const lowerInner = lowerQ - 1.5 * interQ;
  // const upperInner = upperQ + 1.5 * interQ;

  // console.log("median", med);
  // console.log("lowerQ", lowerQ);
  // console.log("upperQ", upperQ);
  // console.log("interQ", interQ);
  // console.log("lowerInner", lowerInner);
  // console.log("upperInner", upperInner);

  for (var i in listings) {
    if (listings[i].salePrice >= priceMean + 1.5 * stdDev) {
      listings[i].outlier = true;
      outliers.push(listings[i]);
      outlierCount += 1;
    } else if (listings[i].salePrice <= priceMean - 1.5 * stdDev) {
      listings[i].outlier = true;
      outliers.push(listings[i]);
      outlierCount += 1;
    }
  }
  console.log("mean", priceMean);
  console.log("upperLimit", priceMean + 1.5 * stdDev);
  console.log("lowerLimit", priceMean - 1.5 * stdDev);

  return {listings: listings, outlierCount: outlierCount, outliers: outliers};
};
