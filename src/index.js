const searchBox = document.getElementById("ipTrackr")
const submitButton = document.getElementById("submit")
// const key = 'at_oNvwKc6F4I37eCbKER4WSoYriVKGY'
const ipAddress = ""
const searchUrl = `https://geo.ipify.org/api/v2/country?apiKey=at_oNvwKc6F4I37eCbKER4WSoYriVKGY&ipAddress=${ipAddress}`

function fetchIpData() {
  ipAddress = searchBox.value
  console.log(searchBox.value)
  fetch(searchUrl)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error("supm nuh right")
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
}

// fetchIpData()

// get important parts from data
// get search input
// get vale of search input on click
// save value in ipAddress variable call fetchIpData
// make function display
// display returns div with information retrned from data

function displayIpInfo(ipData) {
  ipData
}
