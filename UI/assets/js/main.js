const logout = document.getElementById('logout');

const logoutUser = () => {
  localStorage.removeItem('token');
};

logout.addEventListener('click', (e) => {
  e.preventDefault();
  logoutUser();
});