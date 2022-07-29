const API_KEY = '?api_key=5c60de6deb1603623b1a8394c0cafdd3';
const BASE_URL = 'https://api.themoviedb.org/3';
const formEl = document.querySelector('.form');
const reqTokenUrl = BASE_URL + '/authentication/token/new' + API_KEY;
var reqToken = null;


fetch(reqTokenUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data.request_token);
        reqToken = data.request_token;
    })


formEl.addEventListener('submit', event => {

    event.preventDefault();
    const formData = new FormData(formEl);
    formData.append("request_token", reqToken);
    const data = new URLSearchParams(formData);


    fetch(BASE_URL + '/authentication/token/validate_with_login' + API_KEY, {
        method: 'POST',
        body: data
    }).then(res => res.json())
        .then((val) => {
            val.success ? window.location.href = 'index.html' : alert('Hatalı  Giriş');
        }).catch(err => console.error(err))
})
