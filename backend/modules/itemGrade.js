const saleCount = require("./pastSalesCount");
const ata = require("./averageTurnAround");

exports.itemGrade = (listings) => {
  const pastSales = saleCount.pastSalesCount(listings);
  const turnAround = ata.averageTurnAround(listings);
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
