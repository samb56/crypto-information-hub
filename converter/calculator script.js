
var inputCurrency = document.querySelector(".inputCurrency")
var outputCurrency = document.querySelector(".outputCurrency")
var convertBtn = document.querySelector(".convertBtn")
var conversionOutput = document.querySelector(".conversionOutput")
var inputAmount = document.querySelector(".inputAmount")


convertBtn.onclick = function () {


  fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + inputCurrency.value + "&tsyms=" + outputCurrency.value + "&api_key=ee406096203e27f9935de6f6935f753a2fc052509cd86144e14cda932d08007d")
    .then((response) => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      var currencyData = data;
      let inputText = inputCurrency.value
      let outputText = outputCurrency.value
      // The Price is here:
      const conversionRatio = currencyData.RAW[inputCurrency.value.toUpperCase()][outputCurrency.value.toUpperCase()].PRICE
      conversionOutput.textContent = currencyData.DISPLAY[inputCurrency.value.toUpperCase()][outputCurrency.value.toUpperCase()].TOSYMBOL + ' ' + (inputAmount.value * conversionRatio).toLocaleString("en-US")

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