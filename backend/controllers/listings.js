const Listing = require("../models/listing");

const itemGrade = require("../modules/itemGrade");

const fetch = require("node-fetch");
const URL = require("url");

const getOutliers = require("../modules/getOutliers");
const getPriceDetails = require("../modules/getPriceDetails");
const processListings = require("../modules/processListings");

exports.getListingsFromKeyword = (req, res, next) => {
  const queryObject = URL.parse(req.url, true).query;
  const keywords = queryObject.keywords;

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
      // `itemFilter(1).name=EndTimeTo&` +
      // `itemFilter(1).value=${beforeDate}&` +
      // `itemFilter(2).name=EndTimeFrom&` +
      // `itemFilter(2).value=${afterDate}&` +
      // `itemFilter(3).name=MinPrice&` +
      // `itemFilter(3).value=${minPrice}&` +
      // `itemFilter(4).name=MaxPrice&` +
      // `itemFilter(4).value=${maxPrice}&` +
      `sortOrder=EndTimeSoonest` +
      `&paginationInput.entriesPerPage=100`
  );
  // Make API call to ebay api. Possible rate limit/other errors occur, so return
  // dummy data if status != 200.
  let status;
  try {
    fetch(url)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((json) => {
        // Return listings array
        listings = processListings.processListings(json, status);
        console.log("Sending response");
        res.status(status).send({
          listings: getOutliers.getOutliers(listings),
          ranking: itemGrade.itemGrade(listings),
          details: getPriceDetails.getPriceDetails(listings),
        });
      })
      .catch((err) => console.log(err));
  } catch {}
};

exports.getListingDetails = (req, res, next) => {
  Listing.getPriceDetails((results) => {
    res.send(results);
  });
};
