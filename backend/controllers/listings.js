const Listing = require("../models/listing");

const fetch = require("node-fetch");

exports.getListingsFromKeyword = (req, res, next) => {
  Listing.deleteAll();
  const keywords = req.params.keywords;
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
      `sortOrder=EndTimeSoonest` +
      `&paginationInput.entriesPerPage=100`
  );
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((body) => {
      // The actual array of listings is:
      // body.findCompletedItemsResponse[0].searchResult[0].item
      const rawData = body.findCompletedItemsResponse[0].searchResult[0].item;
      for (let i in rawData) {
        var listing = new Listing(
          rawData[i].itemId[0],
          rawData[i].title[0],
          rawData[i].viewItemURL[0],
          rawData[i].country[0],
          rawData[i].shippingInfo[0].shippingType[0],
          rawData[i].listingInfo[0].listingType[0],
          rawData[i].listingInfo[0].startTime[0],
          rawData[i].listingInfo[0].endTime[0]
        );

        listing.setSalePrice(
          parseInt(rawData[i].sellingStatus[0].currentPrice[0].__value__).toFixed(2)
        );
        try {
          listing.setCondition(rawData[i].condition[0].conditionDisplayName[0]);
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
        listing.save();
      }

      Listing.fetchAll((listings) => {
        res.send(listings);
      });
      // res.send(rawData);
    });
};

exports.formatListings = (req, res, next) => {};
