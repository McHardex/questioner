/* eslint-disable no-console */
/* eslint-disable array-callback-return */

const meetups = document.getElementById('meetups');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');
const form = document.getElementById('create-meetup');
const tag1 = document.getElementById('tag1');
const tag2 = document.getElementById('tag2');
const tag3 = document.getElementById('tag3');

const error = document.getElementById('error');
const exitError = document.getElementById('exit-error');
const errorDiv = document.getElementById('error-div');
const successMsg = document.getElementById('success');

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
      const meetupData = data.data;
      meetupData.sort((a, b) => b.id - a.id);
      meetupData.map((meetup) => {
        let meet = `<div class="meetup-cont" id=${meetup.id}>`;
        meet += `<div class="meetup-text">`;
        meet += `<p>${new Date(meetup.happeningon).toDateString()}</p>`;
        meet += `<h3>${meetup.topic}</h3>`;
        meet += `<p>${meetup.location}</p>`;
        meet += `<span>${meetup.tags.join(' ')}</span>`;
        meet += `</div>`;
        meet += `<i class="fas fa-trash" title="delete" id=${meetup.id}></i>`;
        meet += `<i class="far fa-edit" title="edit" id=${meetup.id}></i>`;
        meet += `</div>`;
        meetups.innerHTML += meet;
      });
    });
};
window.onload = getAllMeetups();

// clear form error message
exitError.addEventListener('click', (e) => {
  e.preventDefault();
  errorDiv.style.display = 'none';
});

// clear form error after 15seconds
const hideError = () => {
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 15000);
};

// close form error modal
closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  meetups.style.display = 'grid';
  overlay.style.visibility = 'hidden';
  modal.style.display = 'none';
});

// admin create meetup
const createMeetup = () => {
  const tagsValue1 = tag1.value;
  const tagsValue2 = tag2.value;
  const tagsValue3 = tag3.value;
  const tagsArray = [tagsValue1, tagsValue2, tagsValue3];
  const meetupDetails = {
    topic: form.topic.value,
    happeningOn: form.happeningOn.value,
    location: form.location.value,
    tags: tagsArray
  };
  fetch(route, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'x-auth-token': token
    },
    method: 'POST',
    body: JSON.stringify(meetupDetails)
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        error.innerHTML = data.error;
        errorDiv.style.display = 'block';
        successMsg.style.visibility = 'hidden';
        hideError();
      } else {
        successMsg.style.visibility = 'visible';
        errorDiv.style.display = 'none';
        form.reset();
        setTimeout(() => {
          successMsg.style.visibility = 'hidden';
        }, 10000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  createMeetup();
  setTimeout(() => {
    getAllMeetups();
    window.location.reload();
  }, 1000);
});

// delete meetup
meetups.addEventListener('click', (e) => {
  if (e.target.id && e.target.classList.contains('fa-trash')) {
    e.preventDefault();
    fetch(`${route}/${e.target.id}`, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-auth-token': token
      },
      method: 'DELETE',
    });
    setTimeout(() => {
      getAllMeetups();
      window.location.reload();
    }, 1000);
  }
});