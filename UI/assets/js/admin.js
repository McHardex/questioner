/* eslint-disable no-console */

const editIcon = document.getElementById('edit-icon');
const modal = document.getElementById('modal');
const hideMeetups = document.getElementById('meetups');
const closeModal = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');

editIcon.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('bukunmi');
  hideMeetups.style.display = 'none';
  overlay.style.visibility = 'visible';
  modal.style.display = 'block';
});

closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  hideMeetups.style.display = 'block';
  overlay.style.visibility = 'hidden';
  modal.style.display = 'none';
});
