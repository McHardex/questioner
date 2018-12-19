function toggle() {
  let showComment = document.getElementById('comment');
  if(showComment.style.display === "flex") {
    showComment.style.display = "none"
  } else {
    showComment.style.display = "flex"
  }
}