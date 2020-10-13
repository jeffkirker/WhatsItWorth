const Listing = require("../models/listing");

const itemGrade = require("../modules/itemGrade");

const fetch = require("node-fetch");
const URL = require("url");

const getOutliers = require("../modules/getOutliers");
const getPriceDetails = require("../modules/getPriceDetails");

exports.getListingsFromKeyword = (req, res, next) => {
  const queryObject = URL.parse(req.url, true).query;
  const keywords = queryObject.keywords;
  var afterDate = new Date();
  afterDate.setMonth(afterDate.getMonth() - 3);
  afterDate = afterDate.toISOString();
  var beforeDate = new Date();
  beforeDate = beforeDate.toISOString();
  var maxPrice = 9999999;
  var minPrice = 0;

  if (queryObject.maxPrice !== "undefined") {
    maxPrice = queryObject.maxPrice;
  }
  if (queryObject.minPrice !== "undefined") {
    minPrice = queryObject.minPrice;
  }
  if (queryObject.beforeDate !== "undefined") {
    beforeDate = queryObject.beforeDate;
  }
  if (queryObject.afterDate !== "undefined") {
    afterDate = queryObject.afterDate;
  }
  console.log(queryObject);
  console.log(beforeDate);
  console.log(afterDate);
  console.log(minPrice);
  console.log(maxPrice);
  var listings = [];
  var url = encodeURI(
    `https://svcs.ebay.com` +
      `/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&` +
      `SERVICE-VERSION=1.7.0&` +
      `SECURITY-APPNAME=${process.env.REACT_APP_API_KEY}&` +
      `RESPONSE-DATA-FORMAT=JSON&` +
      `REST-PAYLOAD&` +
      `keywords=${keywords}&` +
      `itemFilter(0).name=SoldItemsOnly&` +
      `itemFilter(0).value=true&` +
      `itemFilter(1).name=EndTimeTo&` +
      `itemFilter(1).value=${beforeDate}&` +
      `itemFilter(2).name=EndTimeFrom&` +
      `itemFilter(2).value=${afterDate}&` +
      `itemFilter(3).name=MinPrice&` +
      `itemFilter(3).value=${minPrice}&` +
      `itemFilter(4).name=MaxPrice&` +
      `itemFilter(4).value=${maxPrice}&` +
      `sortOrder=EndTimeSoonest` +
      `&paginationInput.entriesPerPage=100`
  );
  console.log("url: ", url);
  try {
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        try {
          console.log(body.findCompletedItemsResponse[0].error[0]);
        } catch (error) {}
        console.log("body", body);
        const rawData = body.findCompletedItemsResponse[0].searchResult[0].item;
        // res.send(rawData[0]);
        if (rawData) {
          for (let i in rawData) {
            var listing = new Listing(
              rawData[i].itemId[0],
              rawData[i].title[0],
              rawData[i].viewItemURL[0],
              rawData[i].country[0],
              rawData[i].shippingInfo[0].shippingType[0],
              rawData[i].listingInfo[0].endTime[0],
              rawData[i].listingInfo[0].startTime[0]
            );

            listing.setSalePrice(
              parseFloat(
                rawData[i].sellingStatus[0].currentPrice[0].__value__
              ).toFixed(2)
            );
            listing.setListingType(rawData[i].listingInfo[0].listingType[0]);
            try {
              listing.setCondition(
                rawData[i].condition[0].conditionDisplayName[0]
              );
            } catch {
              listing.setCondition(null);
            }
            try {
              listing.setBidCount(rawData[i].sellingStatus[0].bidCount[0]);
            } catch {
              listing.setBidCount(0);
            }
            try {
              listing.setImageUrl(rawData[i].galleryURL[0]);
            } catch {
              listing.setImageUrl(null);
            }
            listing.setOutlier(false);
            listings.push(listing);
          }
          console.log("Sending response");
          res.send({
            listings: getOutliers.getOutliers(listings),
            ranking: itemGrade.itemGrade(listings),
            details: getPriceDetails.getPriceDetails(listings),
          });
          // res.send(rawData);
        } else {
          console.log("Sending empty response");
          res.send({ listings: { listings: [] } });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

exports.getListingDetails = (req, res, next) => {
  Listing.getPriceDetails((results) => {
    res.send(results);
  });
};
