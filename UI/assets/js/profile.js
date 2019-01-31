/* eslint-disable no-console */
/* eslint-disable array-callback-return */

const upcomingMeetups = document.getElementById('upcoming-meetups');

const route = 'http://localhost:2000/api/v1/meetups/upcoming';
const token = localStorage.getItem('token');

// load meetups on page load
const getAllMeetups = () => {
  fetch(route, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'x-auth-token': token
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        upcomingMeetups.innerHTML = data.error;
      } else {
        searchArray = data.data;
        searchArray.sort((a, b) => b.id - a.id);
        searchArray.map((meetup) => {
          let meet = `<div class="meetup-cont" id=${meetup.id}>`;
          meet += `<div class="meetup-text" id=${meetup.id}>`;
          meet += `<p>${new Date(meetup.happeningon).toDateString()}</p>`;
          meet += `<h3 id=${meetup.id} class="meetup-topic">${meetup.topic}</h3>`;
          meet += `<p>${meetup.location}</p>`;
          meet += `<span>${meetup.tags.join(' ')}</span>`;
          meet += `</div>`;
          meet += `</div>`;
          upcomingMeetups.innerHTML += meet;
        });
      }
    });
};
window.onload = getAllMeetups();

// get specific meetup
upcomingMeetups.addEventListener('click', (e) => {
  if (e.target.id && e.target.classList.contains('meetup-topic')) {
    const meetupId = e.target.id;
    fetch(`http://localhost:2000/api/v1/meetups/${meetupId}`, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-auth-token': token
      },
    })
      .then(response => response.json())
      .then((data) => {
        const resp = data.data[0];
        localStorage.setItem('meetupDetails', JSON.stringify(resp));
        window.location.href = 'meetupDetails.html';
      });
  }
});


// get profile details
const name = document.getElementsByClassName('name');
const email = document.getElementsByClassName('email');
const noOfQuestionsPosted = document.getElementsByClassName('questions-posted');
const noOfComments = document.getElementsByClassName('question-comment');

const profile = JSON.parse(localStorage.getItem('user'));
name[0].innerHTML = `${profile.firstname} ${profile.lastname}`;
email[0].innerHTML = profile.email;

// fetch questions and get no of questions posted by user
fetch('http://localhost:2000/api/v1/questions', {
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'x-auth-token': token
  },
})
  .then(response => response.json())
  .then((data) => {
    if (data.error) {
      noOfQuestionsPosted[0].innerHTML = 0;
    } else {
      const questions = data.data.filter(question => question.createdby === profile.id);
      noOfQuestionsPosted[0].innerHTML = questions.length;
    }
  })
  .catch((err) => { throw new Error(err); });

// fetch comments and get total no of questions commentted on by active user
fetch(`http://localhost:2000/api/v1/comments/${profile.id}`, {
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'x-auth-token': token
  },
})
  .then(response => response.json())
  .then((data) => {
    if (data.error) {
      noOfComments[0].innerHTML = 0;
    } else {
      noOfComments[0].innerHTML = data.data.length;
    }
  })
  .catch((err) => { throw new Error(err); });