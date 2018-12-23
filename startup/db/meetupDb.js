const today = new Date();

const meetup = [
  {
    id: 0,
  },
  {
    id: 1,
    title: 'Javascript crash course',
    location: 'Lagos',
    happeningOn: today.setHours(today.getHours() + 2000),
    tags: ['javascript', 'programming', '2018'],
  },
];

module.exports = meetup;
