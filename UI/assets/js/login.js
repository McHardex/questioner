/* eslint-disable no-console */
const error = document.getElementById('error');
const exitError = document.getElementById('exit-error');
const errorDiv = document.getElementById('error-div');

const form = document.getElementById('login-form');
const route = 'http://localhost:2000/api/v1/auth/login';

// clear error message
exitError.addEventListener('click', (e) => {
  e.preventDefault();
  errorDiv.style.display = 'none';
});

// clear error after 15seconds
const hideError = () => {
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 15000);
};

// get form details
const loginUser = () => {
  const loginDetails = {
    email: form.email.value,
    password: form.password.value,
  };

  fetch(route, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
    method: 'POST',
    body: JSON.stringify(loginDetails)
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        error.innerHTML = 'Invalid email or password';
        errorDiv.style.display = 'block';
        hideError();
      } else {
        errorDiv.style.display = 'none';
        localStorage.setItem('token', data.data[0].token);
        if (data.data[0].user.isAdmin) {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'meetups.html';
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// submit signup form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  loginUser();
});