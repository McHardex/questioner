Date.prototype.addHours = function(h) {    
  this.setTime(this.getTime() + (h*60*60*1000)); 
  return this;   
}

const meetup = 
  [
    {
      id: 0
    },
    {
      id: 1,
      title: 'Javascript crash course',
      location: 'Lagos',
      happeningOn:  new Date().addHours(2000),
      tags: ['javascript', 'programming', '2018'],
    }
  ];

module.exports = meetup;
