let phr = document.querySelector(".main-text__phr");
let btn = document.querySelector(".main-text__btn");
let url = "https://test-api.javascript.ru/v1/waynell/users";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен!");
  async function showPhrases() {
    let response = await fetch(url);
    let json = await response.json();
    let jsonCount = Math.trunc(Math.random() * json.length);
    phr.innerHTML = json[jsonCount].fullName;
  }

  btn.onclick = () => showPhrases();
});
