function mapInit(ACCESS_TOKEN) {
  const mymap = L.map("mapid").setView([38.83, -76.85], 12);
  ACCESS_TOKEN =
    "pk.eyJ1Ijoic2Ftc29uam9zZXBoMjUiLCJhIjoiY2t1b2Y0OGoxMDRvZjJva2IzYzVlemJ6dSJ9.jkhey_GJUGycclVWyny8JA";
  L.tileLayer(
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/%22%3EMapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1Ijoic2Ftc29uam9zZXBoMjUiLCJhIjoiY2t1b2Y0OGoxMDRvZjJva2IzYzVlemJ6dSJ9.jkhey_GJUGycclVWyny8JA",
    }
  ).addTo(mymap);
  return mymap;
}
function toggleSpanVisibility(evt) {
  //console.log("Click primary button", evt.target);
  const button = evt.target;
  const target = document.querySelector("#demo_box");
  console.log(target.classList);
  if (target.classList.value.includes("visible")) {
    console.log("found item");
    target.classList.remove("visible");
    target.classList.add("hidden");
  } else {
    target.classList.remove("hidden");
    target.classList.remove("visible");
  }
}

async function filterFunction(event, data, list, mymap) {
  list.innerHTML = '';
  const filteredList = data.filter((item, index) => {
    const zipcode = event.target.value;
    return item.zip === zipcode;
  });
  console.table(filteredList);

  const limitedList = filteredList.slice(0, 5);

  limitedList.forEach((item, index) => {
    const point = item.geocoded_column_1;
    const latlong = point.coordinates;
    const marker = latlong.reserve();

    L.marker(marker).addTo(mymap);

    //Todo frustrating undefined  point bug!!
    list.innerHTML += `<li class='resto-name'>${item.name}</li><br>`;
    //console.log(item.geocoded_columns_1).addTo(mymap);
    L.marker(item.geocoded_column_1).addTo(mymap);
  });
}

async function mainThread() {
  console.log("main script");
  const url = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const inputBox = document.querySelector("#zipcode");
  const visibleListOffFilteredItems = document.querySelector('.suggestions');
  const ACCESS_TOKEN =
    "pk.eyJ1Ijoic2Ftc29uam9zZXBoMjUiLCJhIjoiY2t1b2Y0OGoxMDRvZjJva2IzYzVlemJ6dSJ9.jkhey_GJUGycclVWyny8JA";
  const mymap = mapInit(ACCESS_TOKEN);
  const data = await fetchrequest(url);
  inputBox.addEventListener("input", (event) => {
    filterFunction(event, data, visibleListOffFilteredItems, mymap);
  });
  const form = document.querySelector("#zip-from");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const { value } = inputBox;
    console.log("within form submit", value);
    const fromLocalData = await fetch("/api");
    console.log(fromLocalData);
}
async function fetchrequest(url) {
  const request = await fetch(url);
  const arrayName = await request.json();
  console.log(arrayName);
  return arrayName;
}

window.onload = mainThread;
