const loginFormElem = document.querySelector('#loginForm');
const loginUsernameElem = document.querySelector('#loginUsername');
const loginPasswordElem = document.querySelector('#loginPassword');

loginFormElem.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    username: loginUsernameElem.value,
    password: loginPasswordElem.value,
  };

  fetch('/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((res) => console.log(res));
});
