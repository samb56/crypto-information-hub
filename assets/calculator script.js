
var inputCurrency = document.querySelector(".inputCurrency")
var outputCurrency = document.querySelector(".outputCurrency")
var convertBtn = document.querySelector(".convertBtn")
var conversionOutput = document.querySelector(".conversionOutput")


convertBtn.onclick = function () {


  fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + inputCurrency.value + "&tsyms=" + outputCurrency.value + "&api_key=ee406096203e27f9935de6f6935f753a2fc052509cd86144e14cda932d08007d")
    .then((response) => {
      return response.json()
    })
    .then(data => {
      var currencyData = data;
      let inputText = inputCurrency.value
      let outputText = outputCurrency.value
      // The Price is here:
      conversionOutput.textContent = currencyData.DISPLAY[inputCurrency.value.toUpperCase()][outputCurrency.value.toUpperCase()].PRICE

    })







}

function displayData(data) {
  var conversionArray = []

  for (let i = 0; i < data.length; i++) {
    const conversionData = data[i];
    ConversionArray.push(conversionData);
    console.log(conversionData);
  }
}

// fetch("https://coinlib.io/api/v1/coin?key=2f9de1b530ec0de0&pref=EUR&symbol=BTC")
//   .then(response => response.json())
//   .then(data => dataArray = [data.symbol, data.price])
//   .then(console.log(dataArray))