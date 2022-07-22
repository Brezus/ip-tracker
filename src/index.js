const searchBox = document.getElementById("ipTrackr")
const submitButton = document.getElementById("submit")
const display = document.querySelector(".info-display")
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
  const locationInfo = [
    ipData.location.region,
    ipData.location.country,
    ipData.location.postalCode,
  ]
  const categories = [
    { title: "ip address", info: ipData.ip },
    { title: "location", info: locationInfo },
    { title: "timezone", info: ipData.location.timezone },
    { title: "isp", info: ipData.isp },
  ]
  //   const info = {
  //     ipAd: ipData.ip,
  //     location: {
  //       region: ipData.location.region,
  //       country: ipData.location.country,
  //       postalCode: ipData.location.postalCode,
  //       coords: { lat: ipData.location.lat, lng: ipData.location.lng },
  //     },
  //     timezone: ipData.location.timezone,
  //     isp: ipData.isp,
  //   }
  display.innerHTML = getDisplayDivInnerHtml(info)
}
function getDisplayDivInnerHtml(info) {
  const displayDivInnerHtml = `
    <div class="ip-info">
      <h2>ip address</h2>
      <p class="location">
        ${info.ipAd}
      </p>
    </div>
    <div class="ip-info">
      <h2>location</h2>
      <p class="location">
        ${info.location.region}, ${info.location.country} ${info.location.postalCode}
      </p>
    </div>
    <div class="ip-info">
      <h2>timezone</h2>
      <p class="location">
        ${info.timezone}
      </p>
    </div>
    <div class="ip-info">
      <h2>location</h2>
      <p class="location">
        ${info.isp}
      </p>
    </div>`
  return displayDivInnerHtml
}
submitButton.addEventListener("click", fetchIpData)
