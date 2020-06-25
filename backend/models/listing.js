var Listings = [];

module.exports = class listing {
  constructor(
    itemId,
    title,
    listingUrl,
    country,
    shippingType,
    listingType,
    dateSold,
    dateListed
    // condition
    // bidCount
  ) {
    this.itemId = itemId;
    this.title = title;
    this.listingUrl = listingUrl;
    this.country = country;
    this.shippingType = shippingType;
    this.dateSold = dateSold.substring(0, 10);
    this.dateListed = dateListed.substring(0, 10);
    if (listingType.localeCompare("Auction") === 0) {
      this.listingType = "Auction";
    } else {
      this.listingType = "BIN";
    }

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
    this.salePrice = salePrice;
  }

  save() {
    Listings.push(this);
  }

  static fetchAll(cb) {
    cb(Listings);
  }
  static deleteAll() {
    Listings = [];
  }
};
