let hide = document.getElementById('que');
let show = document.getElementById('edit-form');

function toggle() {
  if(show.style.display === "block") {
    show.style.display = "none";
    hide.style.display = "block";
  } else {
    show.style.display = "block";
    hide.style.display = "none";
  }
}