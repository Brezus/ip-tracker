const searchBox = document.getElementById("ipTrackr")
const submitButton = document.getElementById("submit")
const display = document.querySelector(".info-display")
let domainSearch = `https://geo.ipify.org/api/v2/country,city?apiKey=at_oNvwKc6F4I37eCbKER4WSoYriVKGY&domain=`
let ipSearch = `https://geo.ipify.org/api/v2/country,city?apiKey=at_oNvwKc6F4I37eCbKER4WSoYriVKGY&ipAddress=`
let searchUrl =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_oNvwKc6F4I37eCbKER4WSoYriVKGY&ipAddress=192.212.174.101"

searchBox.addEventListener("input", setSearchUrl)
document.addEventListener("DOMContentLoaded", fetchIpData)
function setSearchUrl() {
  const searchStr = searchBox.value.split(".").join("")
  searchUrl = !isNaN(searchStr)
    ? ipSearch + searchBox.value
    : domainSearch + searchBox.value
}

function fetchIpData() {
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
  console.log(ipData)
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
  marker = L.marker([lat, lng], { icon: blackIcon }).addTo(map)
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

let map = L.map("map").setView([34.04915, -118.09462], 8)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map)
let blackIcon = L.icon({
  iconUrl: "images/icon-location.svg",
  iconSize: [38, 50],
  iconAnchor: [32, 24],
  popupAnchor: [-3, -76],
})
let marker = L.marker([34.04915, -118.09462], { icon: blackIcon }).addTo(map)
marker.bindPopup(
  "<b>Bungee Gum posses both the properties of rubber and gum</b>"
)
