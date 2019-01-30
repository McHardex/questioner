const logout = document.getElementById('logout');

const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('meetupDetails');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
};

logout.addEventListener('click', (e) => {
  e.preventDefault();
  logoutUser();
});

// get active username
const username = document.getElementById('user');
const createmeetup = document.getElementsByClassName('cte-meetup');

const user = JSON.parse(localStorage.getItem('user'));
username.innerHTML = user.username;

// conditional rendering
if (user.isAdmin) {
  createmeetup[0].style.display = 'block';
  createmeetup[0].addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'admin.html';
  });
}