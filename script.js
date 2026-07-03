const BASE_URL = "https://api.frankfurter.dev/v1/latest";
//https://api.frankfurter.app/latest?from=USD&to=INR
const selectopt = document.querySelectorAll(".dropdown select");
const fromcurrency = document.querySelector(".from select");
const tocurrency = document.querySelector(".to select");
const amnt = document.querySelector(".container input");
const bt = document.querySelector(".btn");



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

bt.addEventListener("click", async (e) => {
  let t = tocurrency.value;
  let f = fromcurrency.value;
  let v = amnt.value;
  e.preventDefault();
  const URL = `${BASE_URL}?from=${f}&to=${t}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[t];
  console.log(rate);
    let msg = document.querySelector(".msg");
    msg.innerText = `${v} ${f} = ${v*rate} ${t}`;
});
