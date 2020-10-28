const dummyData = require("../dummy.json");
const Listing = require("../models/listing");

exports.processListings = (jsonData, status) => {
  const listings = [];
  console.log("Status code: ", status ," Processing...");
  let items;
  let resStatus;
  if (status === 200) {
    items = jsonData.findCompletedItemsResponse[0].searchResult[0].item;
    // Iterate through items in response, create processed listings
  } else {
    items = dummyData.findCompletedItemsResponse[0].searchResult[0].item
  }

  for (let i in items) {
    var listing = new Listing(
      items[i].itemId[0],
      items[i].title[0],
      items[i].viewItemURL[0],
      items[i].country[0],
      items[i].shippingInfo[0].shippingType[0],
      items[i].listingInfo[0].endTime[0],
      items[i].listingInfo[0].startTime[0]
    );

    listing.setSalePrice(
      parseFloat(items[i].sellingStatus[0].currentPrice[0].__value__).toFixed(
        2
      )
    );
    listing.setListingType(items[i].listingInfo[0].listingType[0]);
    try {
      listing.setCondition(items[i].condition[0].conditionDisplayName[0]);
    } catch {
      listing.setCondition(null);
    }
    try {
      listing.setBidCount(items[i].sellingStatus[0].bidCount[0]);
    } catch {
      listing.setBidCount(0);
    }
    try {
      listing.setImageUrl(items[i].galleryURL[0]);
    } catch {
      listing.setImageUrl(null);
    }
    listing.setOutlier(false);
    listings.push(listing);
  }
  return listings;
};
