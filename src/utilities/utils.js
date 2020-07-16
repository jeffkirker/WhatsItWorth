export const getPriceDetails = (listings) => {
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
  const AvgAuction = (arrSum(AuctionPrices) / AuctionPrices.length).toFixed(2);
  const results = {
    MinBIN,
    MaxBIN,
    MinAuction,
    MaxAuction,
    AvgBIN,
    AvgAuction,
  };
  return results;
};

const pastSalesCount = (listings) => {
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

const averageTurnAround = (listings) => {
  var avg = 0;
  var sum = 0;

  for (var i in listings) {
    sum = sum + listings[i].daysToSell;
  }
  avg = sum / listings.length;
  return avg;
};

export const itemGrade = (listings) => {
  const pastSales = pastSalesCount(listings);
  const turnAround = averageTurnAround(listings);
  var gradeScore = 0;
  var grade = "F";
  gradeScore += pastSales.shortTerm * 6;
  gradeScore += pastSales.medTerm * 3;
  gradeScore += pastSales.longTerm * 1;
  gradeScore += 200 - turnAround;
  if (listings.length === 100) {
    gradeScore += 100;
  } else if (listings.length > 80) {
    gradeScore += 50;
  } else if (listings.length > 50) {
    gradeScore += 20;
  } else if (listings.length > 30) {
    gradeScore -= 20;
  } else if (listings.length > 20) {
    gradeScore -= 30;
  } else if (listings.length > 10) {
    gradeScore -= 40;
  } else if (listings.length > 5) {
    gradeScore -= 50;
  } else if (listings.length >= 1) {
    gradeScore -= 100;
  }

  if (gradeScore < 100) {
    grade = "F";
  } else if (gradeScore < 150) {
    grade = "C-";
  } else if (gradeScore < 200) {
    grade = "C";
  } else if (gradeScore < 250) {
    grade = "C+";
  } else if (gradeScore < 300) {
    grade = "B-";
  } else if (gradeScore < 400) {
    grade = "B";
  } else if (gradeScore < 500) {
    grade = "B+";
  } else if (gradeScore < 600) {
    grade = "A-";
  } else if (gradeScore < 700) {
    grade = "A";
  } else {
    grade = "A+";
  }

  return {
    gradeScore: gradeScore,
    grade: grade,
    pastSales: pastSales,
    turnAround: Math.round(turnAround),
  };
};
