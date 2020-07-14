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
    this.dateSold = dateSold;
    this.dateListed = dateListed;
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

  setOutlier(bool) {
    this.outlier = bool;
  }

  
};
