/* eslint-disable no-console */
const error = document.getElementById('error');
const exitError = document.getElementById('exit-error');
const errorDiv = document.getElementById('error-div');
const successMsg = document.getElementById('success');

const form = document.getElementById('signup-form');
const route = 'http://localhost:2000/api/v1/auth/signup';

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
const signupUser = () => {
  const signupDetails = {
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    othername: form.othername.value,
    username: form.username.value,
    email: form.email.value,
    phoneNumber: form.phoneNumber.value,
    password: form.password.value,
  };

  fetch(route, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
    method: 'POST',
    body: JSON.stringify(signupDetails)
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        error.innerHTML = data.error;
        errorDiv.style.display = 'block';
        successMsg.style.visibility = 'hidden';
        hideError();
      } else {
        successMsg.style.visibility = 'visible';
        errorDiv.style.display = 'none';
        form.reset();
        localStorage.setItem('token', data.data.token);
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }
    })
    .catch((err) => {
      error.innerHTML = err;
    });
};

// submit signup form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  signupUser();
});