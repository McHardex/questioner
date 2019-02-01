const meetups = document.getElementById('meetups');
const closeModal = document.getElementById('closeModal');
// edit meetup
meetups.addEventListener('click', (e) => {
  if (e.target.id && e.target.classList.contains('fa-edit')) {
    modal.style.display = 'block';
    meetups.style.display = 'none';
    overlay.style.visibility = 'visible';
  }
});

// close form edit modal
closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.reload();
  meetups.style.display = 'grid';
  overlay.style.visibility = 'hidden';
  modal.style.display = 'none';
});