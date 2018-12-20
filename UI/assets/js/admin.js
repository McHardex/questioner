const hide = document.getElementById('que');
const show = document.getElementById('edit-form');

const toggle = () => {
  if (show.style.display === 'block') {
    show.style.display = 'none';
    hide.style.display = 'block';
  } else {
    show.style.display = 'block';
    hide.style.display = 'none';
  }
};

module.exports = toggle;
