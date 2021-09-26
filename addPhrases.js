let input = document.querySelector(".main-text__input");
let inputBtn = document.querySelector(".main-text__btn");
let inputBtnShow = document.querySelector(".main-text__btnS");
let footer = document.querySelector("footer")
    // let inputBtnDel = document.querySelector(".main-text__btnD");
let div = document.querySelector(".showPhr")
let value = input.value;
let url = 'https://test-api.javascript.ru/v1/waynell/users'

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM загружен!");

    function postPhrases() {
        let phrases = JSON.stringify({
            fullName: input.value,
            email: "phr@phr.ru"
        });

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(phrases);

        xhr.onload = () => console.log(xhr.response);
        input.value = "";
    }

    inputBtn.onclick = postPhrases;

    function showPhrases() {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    div.innerHTML += `${data[i].fullName} <br>`;
                }
                inputBtnShow.setAttribute('disabled', true);
                if (div.clientHeight < 15) {
                    footer.style.marginBottom = auto;
                } else if (div.clientHeight < 350) {
                    footer.style.marginBottom = -div.clientHeight + 215 + "px";
                } else {
                    footer.style.marginBottom = -div.clientHeight + 255 + "px";
                }
            });
    };

    inputBtnShow.onclick = showPhrases;

    document.addEventListener("click", customInput)

    function customInput() {
        input.classList.add("active")
        if (document.activeElement != input) {
            input.classList.remove("active")
        };
    }



})




function deletePhrs() {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url)
        // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();

    xhr.onload = () => console.log(xhr.response);
}


function deletePhr(...arr) {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
        });
    for (let i = 0; i < arr.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", `${url}/${arr[i]}`)
            // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send();

        xhr.onload = () => console.log(xhr.response);
    }
}