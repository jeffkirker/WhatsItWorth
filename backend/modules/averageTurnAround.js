exports.averageTurnAround = (listings) => {
  var avg = 0;
  var sum = 0;
  
  for(var i in listings){
    var sum = sum + listings[i].daysToSell;
  }
  avg = sum / listings.length;
  return avg;
}