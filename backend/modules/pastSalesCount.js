exports.pastSalesCount = (listings) => {
  var today = new Date();
  var shortTerm = 0;
  var medTerm = 0;
  var longTerm = 0;
  for (var i in listings) {
    var saleTime = Math.abs(today - new Date(listings[i].dateSold)) / 86400000;
    if (saleTime > 3 && saleTime < 30) {
      medTerm = medTerm + 1;
    } else if (saleTime > 30) {
      longTerm = longTerm + 1;
    } else if (saleTime < 3) {
      shortTerm = shortTerm + 1;
    }
  }

  return {
    shortTerm: shortTerm,
    medTerm: medTerm,
    longTerm: longTerm,
  };
};
