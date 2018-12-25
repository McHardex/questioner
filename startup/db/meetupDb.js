const today = new Date();

const meetupDb = [
  {
    id: 0,
  },
  {
    id: 1,
    title: 'Javascript crash course',
    location: 'Lagos',
    happeningOn: new Date(today.setHours(today.getHours() + 2000)),
    tags: ['javascript', 'programming', '2018'],
  },
];

export default meetupDb;
