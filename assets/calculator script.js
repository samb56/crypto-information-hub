
var inputCurrency = document.querySelector(".inputCurrency")
var outputCurrency = document.querySelector(".outputCurrency")
var convertBtn = document.querySelector(".convertBtn")
var conversionOutput = document.querySelector(".conversionOutput")


convertBtn.onclick = function () {
  var conversionArray = []
  fetch("https://min-api.cryptocompare.com/data/price?fsym=" + inputCurrency.value + "&tsyms=" + outputCurrency.value + "&api_key=ee406096203e27f9935de6f6935f753a2fc052509cd86144e14cda932d08007d")
    .then(response => response.json())
    .then(gatherData())





}


function gatherData(data) {
  for (var i = 0; i < data.length; i++) {
    const conversionData = data[i];
    conversionArray.push(conversionData);
    console.log(conversionData);
  }
  console.log(conversionArray)
}

// fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR,ETH,DOGE&api_key=ee406096203e27f9935de6f6935f753a2fc052509cd86144e14cda932d08007d")
//   .then(response => response.json())
//   .then(data => console.log(data));aaaasw