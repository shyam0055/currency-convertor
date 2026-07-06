const BASE_URL = "https://api.frankfurter.dev/v1/latest";
//https://api.frankfurter.app/latest?from=USD&to=INR
const selectopt = document.querySelectorAll(".dropdown select");
let fromcurrency = document.querySelector(".from select");
let tocurrency = document.querySelector(".to select");
const amnt = document.querySelector(".container input");
const bt = document.querySelector(".btn");
let msg = document.querySelector(".msg");


for (let select of selectopt) {
  for (let curr in countryList) {
    let newOption = document.createElement("option");
    newOption.value = curr;
    newOption.innerText = curr;
    select.appendChild(newOption);
  }
  select.addEventListener("change", (e) => {
    let countryCode = e.target.value;
    let currency = countryList[countryCode];

    if (select.id === "from") {
      let flag = document.querySelector(".from img");
      flag.src = `https://flagsapi.com/${currency}/flat/64.png`;
    }
    if (select.id === "to") {
      let flag = document.querySelector(".to img");
      flag.src = `https://flagsapi.com/${currency}/flat/64.png`;
    }
  });
}
fromcurrency.addEventListener("change", async (e) => {
  fromcurrency = e.target.value;
  e.preventDefault();
  const URL = `${BASE_URL}?from=${fromcurrency}&to=${tocurrency.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[tocurrency.value];
  console.log(rate);
  let msg = document.querySelector(".msg");
  msg.innerText = `1 ${fromcurrency} = ${rate} ${tocurrency.value}`;
});

bt.addEventListener("click", async (e) => {
  let v = amnt.value;
  e.preventDefault();
  const URL = `${BASE_URL}?from=${fromcurrency.value}&to=${tocurrency.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[tocurrency.value];
  console.log(rate);
  let msg = document.querySelector(".msg");
  msg.innerText = `${v} ${fromcurrency.value} = ${v * rate} ${tocurrency.value}`;
});
