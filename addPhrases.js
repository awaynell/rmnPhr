let input = document.querySelector(".main-text__input");
let inputBtn = document.querySelector(".main-text__btn");
let inputBtnShow = document.querySelector(".main-text__btnS");
let footer = document.querySelector("footer");
// let inputBtnDel = document.querySelector(".main-text__btnD");
let div = document.querySelector(".showPhr");
let value = input.value;
let url = "https://test-api.javascript.ru/v1/awaynell/users";
let halfmain = document.querySelector(".halfmain");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен!");

  function postPhrases() {
    let phrases = JSON.stringify({
      fullName: input.value,
      email: "phr@phr.ru",
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(phrases);

    xhr.onload = () => {
      console.log(xhr.response);
      if (xhr.status === 200) {
        halfmain.insertAdjacentHTML("afterbegin", '<div class = "done">Фраза добавлена</div>');
        let done = document.querySelector(".done");
        setTimeout(() => {
          done.style.opacity = "0";
          setTimeout(() => {
            done.remove();
          }, 300);
        }, 1500);
      }
    };

    input.value = "";
  }

  inputBtn.onclick = postPhrases;

  function showPhrases() {
    let loading = document.createElement("div");
    loading.classList.add("loading");
    loading.innerHTML = "Загружаю фразы...";
    halfmain.append(loading);
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loading").remove();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          div.innerHTML += `${data[i].fullName} <br>`;
        }

        inputBtnShow.setAttribute("disabled", true);
      });
  }

  inputBtnShow.onclick = showPhrases;

  document.addEventListener("click", customInput);

  function customInput() {
    input.classList.add("active");
    if (document.activeElement != input) {
      input.classList.remove("active");
    }
  }
});

function deletePhrs() {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", url);
  xhr.send();

  xhr.onload = () => console.log(xhr.response);
}

function deletePhr(...arr) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
  for (let i = 0; i < arr.length; i++) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${url}/${arr[i]}`);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        halfmain.insertAdjacentHTML("afterbegin", '<div class = "done">Фраза удалена</div>');
        let done = document.querySelector(".done");
        setTimeout(() => {
          done.style.opacity = "0";
          setTimeout(() => {
            done.remove();
          }, 300);
        }, 1500);
      }
    };
  }
}
