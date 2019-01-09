// Get the header
const header = document.getElementById('myHeader');

// Get the offset position of the navbar
const sticky = header.offsetTop;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

// When the user scrolls the page, execute myFunction
window.onscroll = () => { stickyHeader(); };
