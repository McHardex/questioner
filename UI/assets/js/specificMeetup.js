const questionRoute = 'http://localhost:2000/api/v1/questions';
const commentRoute = 'http://localhost:2000/api/v1/comments';
const token = localStorage.getItem('token');
const meetupDetails = JSON.parse(localStorage.getItem('meetupDetails'));

const questionWrap = document.getElementById('questions');

const topic = document.getElementById('spe-topic');
const happeningWhere = document.getElementById('spe-location');
const happeningon = document.getElementById('spe-happeningOn');

topic.innerHTML = meetupDetails.topic;
happeningWhere.innerHTML = meetupDetails.location;
happeningon.innerHTML = new Date(meetupDetails.happeningon).toDateString();

// get questions and comments
const getQuestions = () => {
  fetch(commentRoute, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'x-auth-token': token
    },
  })
    .then(response => response.json())
    .then((anotherData) => {
      const questionComments = anotherData.data
        .filter(comment => comment.meetup_id === meetupDetails.id);
      questionComments.sort((a, b) => b.id - a.id);
      questionComments.map((comments) => {
        let str = `<div class="question-cont" id=${comments.id}>`;
        str += `<h3>${comments.title}</h3>`;
        str += `<div class="likes-dis">`;
        str += `<div class="upvote">`;
        str += `<i class="far fa-thumbs-up" id=${comments.id}></i>`;
        str += `<span>${comments.upvote}</span>`;
        str += `</div>`;
        str += `<div class="downvote">`;
        str += `<i class="far fa-thumbs-down" id=${comments.id}></i>`;
        str += ` <span>${comments.downvote}</span>`;
        str += `</div>`;
        str += `</div>`;
        str += `<div id="comments">`;
        str += `<form class="post-comment">`;
        str += `<input type='text' class='form-input' placeholder='comment' required/>`;
        str += `<button type='submit' class='submit-comment' id=${comments.id}>Send</button>`;
        str += `</form>`;
        str += `<p>${comments.comment === "null" ? "Be the first" : comments.comment}</p>`;
        str += `</div>`;
        str += `</div>`;
        questionWrap.innerHTML += str;
        return true;
      });
    })
    .catch((err) => { throw new Error(err); });
};

// get rsvps
const rsvps = document.getElementsByClassName('rsvps');
fetch('http://localhost:2000/api/v1/rsvps', {
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'x-auth-token': token,
  },
})
  .then(response => response.json())
  .then((data) => {
    if (data.error) {
      rsvps[0].innerHTML = `no one is coming yet`;
    } else {
      const filterData = data.data.filter(rsvp => (rsvp.meetup_id === meetupDetails.id) && (rsvp.response === 'yes' || 'maybe'));
      if (filterData.length === 1) {
        rsvps[0].innerHTML = `${filterData.length} person is coming`;
      } else {
        rsvps[0].innerHTML = `${filterData.length} people are coming`;
      }
    }
  });

window.onload = getQuestions();

// upvote question
questionWrap.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('fa-thumbs-up')) {
    fetch(`${questionRoute}/${e.target.id}/upvote`, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-auth-token': token,
      },
      method: 'PATCH'
    });
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
});

// downvote question
questionWrap.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('fa-thumbs-down')) {
    fetch(`${questionRoute}/${e.target.id}/downvote`, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-auth-token': token,
      },
      method: 'PATCH'
    });
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
});

// post comments
let commentInput = [];
questionWrap.addEventListener('change', (e) => {
  if (e.target.classList.contains('form-input')) {
    commentInput.push(e.target.value);
  }
});
const error = document.getElementById('error');
const errorDiv = document.getElementById('error-div');
questionWrap.addEventListener('click', (e) => {
  if (e.target.id && e.target.classList.contains('submit-comment')) {
    e.preventDefault();
    fetch(commentRoute, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-auth-token': token,
      },
      method: 'POST',
      body: JSON.stringify({
        comment: commentInput.join(''),
        question_id: e.target.id
      })
    })
      .then(response => response.json())
      .then((data) => {
        if (data.error) {
          error.innerHTML = data.error;
          errorDiv.style.display = 'block';
          setTimeout(() => {
            errorDiv.style.display = 'none';
          }, 5000);
        } else {
          errorDiv.style.display = 'none';
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }
      })
      .catch((err) => { throw new Error(err); });
  }
  commentInput = [];
});

// post question
const questionForm = document.getElementById('question-submit');

questionForm.addEventListener('submit', (e) => {
  const questionDetails = {
    title: questionForm.questionInput.value,
    meetup_id: meetupDetails.id,
    body: "any message... not required***"
  };
  e.preventDefault();
  fetch(questionRoute, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'x-auth-token': token,
    },
    method: 'POST',
    body: JSON.stringify(questionDetails)
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        error.innerHTML = data.error;
        errorDiv.style.display = 'block';
        setTimeout(() => {
          errorDiv.style.display = 'none';
        }, 10000);
      } else {
        errorDiv.style.display = 'none';
        setTimeout(() => {
          getQuestions();
          window.location.reload();
        }, 10);
      }
    })
    .catch((err) => { throw new Error(err); });
  questionForm.reset();
});


// post rsvp
const rsvpForm = document.getElementById('rsvp-submit');
const responseMsg = document.getElementById('rsvp-msg');

rsvpForm.addEventListener('submit', (e) => {
  const rsvpDetails = {
    response: rsvpForm.rsvpInput.value.toLowerCase(),
  };
  e.preventDefault();
  fetch(`http://localhost:2000/api/v1/meetups/${meetupDetails.id}/rsvps`, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'x-auth-token': token,
    },
    method: 'POST',
    body: JSON.stringify(rsvpDetails)
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        responseMsg.innerHTML = data.error;
        responseMsg.style.display = 'block';
        responseMsg.style.color = 'red';
        setTimeout(() => {
          responseMsg.style.display = 'none';
        }, 10000);
      } else {
        responseMsg.classList.add('rsvp-success');
        responseMsg.innerHTML = "Your response has been recorded";
        responseMsg.style.display = 'block';
        responseMsg.style.color = 'green';
        setTimeout(() => {
          responseMsg.style.display = 'none';
        }, 10000);
      }
    })
    .catch((err) => { throw new Error(err); });
  rsvpForm.reset();
});
