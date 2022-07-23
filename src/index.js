const searchBox = document.getElementById("ipTrackr")
const submitButton = document.getElementById("submit")
const display = document.querySelector(".info-display")
let searchUrl = ""

function setSearchUrl() {
  const searchStr = searchBox.value.split(".").join("")
  console.log(searchStr)
  // return isNaN(searchStr)
}
// make search url a global let variable
// add listener to input searchBox
// make function to check if value of searchBox has any letters
// if it does modify search url

function fetchIpData() {
  const ipAddress = searchBox.value
  searchUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_oNvwKc6F4I37eCbKER4WSoYriVKGY&ipAddress=${ipAddress}`
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

function displayIpInfo(ipData) {
  const locationInfo = `${ipData.location.region}, ${ipData.location.country} ${
    ipData.location.postalCode ? ipData.location.postalCode : "N/A"
  }`
  const ipInfo = [
    { title: "ip address", info: ipData.ip },
    { title: "location", info: locationInfo },
    { title: "timezone", info: `UTC${ipData.location.timezone}` },
    { title: "isp", info: ipData.isp },
  ]
  display.innerHTML = getDisplayDivInnerHtml(ipInfo).join("")
  const lat = ipData.location.lat
  const lng = ipData.location.lng
  map.flyTo(new L.LatLng(lat, lng), 8)
  marker = L.marker([lat, lng]).addTo(map)
  marker.bindPopup(`<b> you are ${ipData.location.region}</b>`)
}
function getDisplayDivInnerHtml(ipInfo) {
  const displayDivInnerHtml = ipInfo.map((data) => {
    return `
        <div class="ip-info">
            <h2>${data.title}</h2>
            <p class="location">
                ${data.info}
            </p>
        </div>`
  })
  return displayDivInnerHtml
}
submitButton.addEventListener("click", fetchIpData)

let map = L.map("map").setView([51.505, -0.09], 13)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map)
let marker = L.marker([51.5, -0.09]).addTo(map)
marker.bindPopup(
  "<b>Bungee Gum posses both the properties of rubber and gum</b>"
)
