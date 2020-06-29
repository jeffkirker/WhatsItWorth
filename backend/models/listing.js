var Listings = [];

module.exports = class listing {
  constructor(
    itemId,
    title,
    listingUrl,
    country,
    shippingType,
    dateSold,
    dateListed
  ) {
    this.itemId = itemId;
    this.title = title;
    this.listingUrl = listingUrl;
    this.country = country;
    this.shippingType = shippingType;
    this.dateSold = dateSold.substring(0, 10);
    this.dateListed = dateListed.substring(0, 10);
    this.daysToSell = this.getDaysToSell(this.dateListed, this.dateSold);
  }

  getDaysToSell(date1, date2) {
    var newDate1 = new Date(
      date1.substring(5, 7) +
        "/" +
        date1.substring(8, 10) +
        "/" +
        date1.substring(0, 4)
    );
    var newDate2 = new Date(
      date2.substring(5, 7) +
        "/" +
        date2.substring(8, 10) +
        "/" +
        date2.substring(0, 4)
    );
    const diffTime = Math.abs(newDate2 - newDate1);
    const daysToSell = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return daysToSell;
  }

  setCondition(condition) {
    this.condition = condition;
  }

  setBidCount(bidCount) {
    this.bidCount = bidCount;
  }
  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }

  setSalePrice(salePrice) {
    this.salePrice = parseFloat(salePrice);
  }

  setListingType(listingType) {
    if (listingType === "Auction") {
      this.isAuction = true;
    } else {
      this.isAuction = false;
    }
  }

  save() {
    Listings.push(this);
  }

  static getPriceDetails(cb) {
    const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);
    const arrMax = (arr) => Math.max(...arr);
    const arrMin = (arr) => Math.min(...arr);

    const BINPrices = [];
    const AuctionPrices = [];
    for (var i in Listings) {
      if (Listings[i].isAuction) {
        AuctionPrices.push(parseFloat(Listings[i].salePrice));
      } else {
        BINPrices.push(parseFloat(Listings[i].salePrice));
      }
    }
    const MinBIN = arrMin(BINPrices).toFixed(2);
    const MaxBIN = arrMax(BINPrices).toFixed(2);
    const MinAuction = arrMin(AuctionPrices).toFixed(2);
    const MaxAuction = arrMax(AuctionPrices).toFixed(2);
    const AvgBIN = (arrSum(BINPrices) / BINPrices.length).toFixed(2);
    const AvgAuction = (arrSum(AuctionPrices) / AuctionPrices.length).toFixed(2);
    const results = {
      MinBIN,
      MaxBIN,
      MinAuction,
      MaxAuction,
      AvgBIN,
      AvgAuction,
    };
    console.log(AuctionPrices);
    console.log(results);
    cb(results);
  }

  static fetchAll(cb) {
    cb(Listings);
  }
  static deleteAll() {
    Listings = [];
  }
};
