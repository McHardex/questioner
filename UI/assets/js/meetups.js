/* eslint-disable no-console */
/* eslint-disable array-callback-return */

const meetups = document.getElementById('meetups');

const route = 'http://localhost:2000/api/v1/meetups';
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
        meetups.innerHTML += meet;
      });
    });
};
window.onload = getAllMeetups();

// get specific meetup
meetups.addEventListener('click', (e) => {
  if (e.target.id && e.target.classList.contains('meetup-topic')) {
    const meetupId = e.target.id;
    console.log(meetupId);
    fetch(`${route}/${meetupId}`, {
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
