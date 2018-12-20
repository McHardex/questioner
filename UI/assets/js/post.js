const showComment = document.getElementById('comment');

const toggle = () => {
  if (showComment.style.display === 'flex') {
    showComment.style.display = 'none';
  } else {
    showComment.style.display = 'flex';
  }
};

module.exports = toggle;
