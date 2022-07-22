const searchBox = document.getElementById("ipTrackr")
const submitButton = document.getElementById("submit")
let ipAddress = ""
const searchUrl = `https://geo.ipify.org/api/v2/country?apiKey=at_oNvwKc6F4I37eCbKER4WSoYriVKGY&ipAddress=${ipAddress}`

function fetchIpData() {
  ipAddress = searchBox.value
  console.log(searchBox.value)
  fetch(searchUrl)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error("something is not right")
    })
    .then((data) => displayIpInfo(data))
    .catch((error) => console.log(error))
}

// fetchIpData()

// get important parts from data
// get search input
// get vale of search input on click
// save value in ipAddress variable call fetchIpData
// make function display
// display returns div with information retrned from data
// get ip address, location, timezone, isp

function displayIpInfo(ipData) {
  const info = {
    ipAd: ipData.ip,
    location: {
      country: ipData.location.country,
      region: ipData.location.region,
      city: ipData.location.city,
    },
    timezone: ipData.location.timezone,
    isp: ipData.isp,
    coords: { lat: ipData.location.lat, lng: ipData.location.lng },
  }
  console.log(info)
}
submitButton.addEventListener("click", fetchIpData)
