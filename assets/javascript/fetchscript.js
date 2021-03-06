
// 1. Fetch Api's for news and crypto
// Create/link buttons to search for various topics based on user input (Include click and enter key as submission types)
// Grab images/graphs from crypto api to display fluctuating prices for the coin
// Use local storage to save the past couple of searches from user input 
// display the previous 5 listed searches

var clearBtn = document.getElementById("clearBtn")


clearBtn.onclick = function clearHistory() {
  localStorage.clear();
  prevSearch.innerHTML = ""
}


let news = {

  "newsAPIKey": "3ca99191912f4d4cb2438c4ac19e4cb1",
  "cryptoApIKey": "d3452b84f4f7a2a7943c8ce004285656",

  // // q = search for specific wording, from= will dicatate the time frame to search sortby=(relevancy, popularity, publishedAt),
  // Reference this newsAPI documentation for different search parameters https://newsapi.org/docs/endpoints/everything
  fetchNews: function (term) {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://newsapi.org/v2/everything?q=' + term + '&sortBy=popularity&pageSize=5&apiKey=' + this.newsAPIKey)}`)
      .then(r => r.json())
      .then(data => {
        // the actual data from the api
        var newsContent = JSON.parse(data.contents)

        const { name } = newsContent.articles[0].source
        const { author, title, url, content, urlToImage } = newsContent.articles[0]



        document.getElementById("author").innerText = "Author: " + author + ""
        document.getElementById("searchTitle").innerText = "Title: " + title + ""
        document.getElementById('searchContent').innerText = content
        document.getElementById('articleURL').setAttribute("href", url)
        document.getElementById('imageURL').setAttribute("src", urlToImage)

      })
  },
  // function to search for crypto data.
  // End point are the search parameters passed in the URL for specific articles/information
  // https://coinlayer.com/documentation
  fetchCryptoPrice: function (term) {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://api.coinlayer.com/api/live?&symbols=' + term + '&access_key=d3452b84f4f7a2a7943c8ce004285656')}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      // Actual data from api
      .then(data => {
        var cryptoData = JSON.parse(data.contents)
        document.getElementById("cryptoPrice1").innerText = "Current Price of " + term + ": " + cryptoData.rates[term.toUpperCase()] + " USD"
      })

  },

  // Grabs other crypto data that is not the search term
  fetchOtherCrypto: function () {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://api.coinlayer.com/api/live?access_key=d3452b84f4f7a2a7943c8ce004285656')}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        var extraCrypto = JSON.parse(data.contents)

        const { ETH, DOGE, BNB, XRP } = extraCrypto.rates

        document.getElementById("cryptoPrice2").innerText = "Current Price of ETH: " + ETH + " USD"
        document.getElementById("cryptoPrice3").innerText = "Current Price of DOGE: " + DOGE + " USD"
        document.getElementById("cryptoPrice4").innerText = "Current Price of BNB: " + BNB + " USD"
        document.getElementById("cryptoPrice5").innerText = "Current Price of XRP: " + XRP + " USD"
      })

  },

  fetchCryptoName: function (term) {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://api.coinlayer.com/api/list?&symbols=' + term + '&access_key=d3452b84f4f7a2a7943c8ce004285656')}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Term not accepted')
      })
      .then(data => {
        var nameData = JSON.parse(data.contents)
        console.log(nameData)

        document.getElementById('cryptoPrice2').innerText = "Full Market Name: " + nameData.crypto[term.toUpperCase()].name_full


      })

  }

}

// Grabbing user input for search terms
document.getElementById("searchBtn").onclick = function () {
  event.preventDefault()

  var inputEl = document.getElementById('searchTerm').value


  //store recent searches
  var prevSearches = JSON.parse(localStorage.getItem("previous")) || []
  prevSearches.push(inputEl)
  localStorage.setItem("previous", JSON.stringify(prevSearches.slice(-5)))
  displayPrevSearch()


  news.fetchNews(inputEl)
  news.fetchCryptoPrice(inputEl)
  news.fetchCryptoName(inputEl)
  news.fetchOtherCrypto()


}

// search by enter button

var input = document.getElementById('searchTerm')
input.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
    event.preventDefault()

    var inputEl = document.getElementById('searchTerm').value
    news.fetchNews(inputEl)
    news.fetchCryptoPrice(inputEl)
    news.fetchCryptoName(inputEl)

  }

})

//Local storage saving functionality and display as buttons underneath search bar
function displayPrevSearch() {

  var searchDisplay = document.getElementById('prevSearch')
  searchDisplay.innerHTML = ''
  searchHistory = JSON.parse(localStorage.getItem("previous"))


  for (var i = 0; i < searchHistory.length; i++) {
    var prevLinks = document.createElement("div");
    prevLinks.classList.add("SearchHistory")
    prevLinks.innerHTML = '<button onClick = "news.fetchNews(\'' + searchHistory[searchHistory.length - i - 1] + '\')">' +
      searchHistory[searchHistory.length - i - 1] + ' </button>'
    searchDisplay.append(prevLinks)

  }

}