let input = document.querySelector(".main-text__input");
let inputBtn = document.querySelector(".main-text__btn");
let inputBtnShow = document.querySelector(".main-text__btnS");
let footer = document.querySelector(".footer")
    // let inputBtnDel = document.querySelector(".main-text__btnD");
let div = document.querySelector(".showPhr")
let value = input.value;
let url = 'https://test-api.javascript.ru/v1/waynell/users'


function postPhrases() {
    let phrases = JSON.stringify({
        fullName: input.value,
        email: "phr@phr.ru"
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://test-api.javascript.ru/v1/waynell/users')
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(phrases);

    xhr.onload = () => console.log(xhr.response);
    input.value = "";
}

inputBtn.onclick = postPhrases;

// async function showPhrases() {
//     let response = await fetch(url);
//     let json = await response.json();
//     for (let i = 0; i < json.length; i++) {
//         div.innerHTML += `${json[i].fullName} <br>`;
//     }
//     inputBtnShow.setAttribute('disabled', true)
// }

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
            footer.style.marginBottom = -div.clientHeight / 1.40 + "px";
        });
};

inputBtnShow.onclick = showPhrases;

function deletePhrs() {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", 'https://test-api.javascript.ru/v1/waynell/users')
        // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();

    xhr.onload = () => console.log(xhr.response);
}


// function deletePhr(id) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("DELETE", `https://test-api.javascript.ru/v1/waynell/users/${id}`)
//         // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//     xhr.send();

//     xhr.onload = () => console.log(xhr.response);
// }

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
        xhr.open("DELETE", `https://test-api.javascript.ru/v1/waynell/users/${arr[i]}`)
            // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send();

        xhr.onload = () => console.log(xhr.response);
    }
}


document.addEventListener("click", customInput)

function customInput() {
    input.classList.add("active")
    if (document.activeElement != input) {
        input.classList.remove("active")
    };
}