import config from "../config.js"
let secretkey = config.API_KEY

const searchBox = document.getElementById("ipTrackr")
const submitButton = document.getElementById("submit")
const display = document.querySelector(".info-display")
const zoomLevel = 14
let domainSearch = `https://geo.ipify.org/api/v2/country,city?apiKey=${secretkey}F&domain=`
let ipSearch = `https://geo.ipify.org/api/v2/country,city?apiKey=${secretkey}F&ipAddress=`
let searchUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${secretkey}F&ipAddress=192.212.174.101`

searchBox.addEventListener("keydown", (e) => {
  setSearchUrl()
  if (e.code === "Enter") {
    fetchIpData()
  }
  if (e.code === 13) {
    fetchIpData()
  }
})
// document.addEventListener("DOMContentLoaded", () => {
//   searchBox.value = ""
//   searchBox.focus()
//   fetchIpData()
// })

function setSearchUrl() {
  const searchStr = searchBox.value.split(".").join("")
  searchUrl = !isNaN(searchStr)
    ? ipSearch + searchBox.value
    : domainSearch + searchBox.value
}

function handleError() {
  const errorMsg = `<p>Error Try again?</p>`
  display.className = "info-display-error"
  display.innerHTML = errorMsg
}

function fetchIpData() {
  fetch(searchUrl)
    .then((res) => {
      console.log(res)
      if (res.ok) {
        return res.json()
      }
      throw new Error("something is not right")
    })
    .then((data) => displayIpInfo(data))
    .catch((error) => handleError())
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
  display.className = "info-display"
  display.innerHTML = getDisplayDivInnerHtml(ipInfo).join("")
  const lat = ipData.location.lat
  const lng = ipData.location.lng
  map.flyTo(new L.LatLng(lat, lng), zoomLevel)
  marker = L.marker([lat, lng], { icon: blackIcon }).addTo(map)
  marker.bindPopup(`<b>Welcome to the hotel ${ipData.location.region}</b>`)
}
function getDisplayDivInnerHtml(ipInfo) {
  const displayDivInnerHtml = ipInfo.map((data) => {
    return `
        <div class="ip-info">
            <h2 class="ip-info-title">${data.title}</h2>
            <p class="location">
                ${data.info}
            </p>
        </div>`
  })
  return displayDivInnerHtml
}
submitButton.addEventListener("click", () => {
  fetchIpData()
  searchBox.value = ""
})

let map = L.map("map", { zoomControl: false }).setView(
  [34.04915, -118.09462],
  zoomLevel
)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map)
let blackIcon = L.icon({
  iconUrl: "images/icon-location.svg",
  iconSize: [45, 50],
  iconAnchor: [32, -20],
  popupAnchor: [-17, 10],
})
let marker = L.marker([34.04915, -118.09462], { icon: blackIcon }).addTo(map)
