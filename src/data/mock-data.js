let PEOPLE = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    cellphone: '1234567890',
    address: ADDRESSES[0]
  }, {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    cellphone: '0987654321',
    address: null
  }
];

let ADDRESSES = [
  {
    id: 1,
    street: 'Dorpsstraat',
    number: '1',
    city: 'Houthulst',
    zip: '8650'
  },
  {
    id: 2,
    street: 'Stadenstraat',
    number: '15b',
    city: 'Houthulst',
    zip: '8650'
  }
];

let LEADERS = [
  {
    person: PEOPLE[0],
    group: GROUPS[0]
  },
  {
    person: PEOPLE[1],
    group: GROUPS[1]
  }
];

let GROUPS = [
  {
    id: 1,
    name: 'Kabouters',
    color: 'red',
    mascotName: 'Karel',
    targetAudience: "12-14"
  },
  {
    id: 2,
    name: 'Welpen',
    color: 'blue',
    mascotName: null,
    targetAudience: "boys 14-16"
  }
];

let ARTICLES = [
  {
    id: 1,
    title: 'Info',
    content: '# Info',
  },
  {
    id: 2,
    title: 'Contact',
    content: '# Contact',
  }
];

let EVENTS = [
  {
    id: 1,
    name: 'Kamp',
    description: 'Kamp',
    address: ADDRESSES[0],
    startDate: new Date(2019, 7, 1),
    endDate: new Date(2019, 7, 8),
    targetAudience: "6-18",
  },
  {
    id: 2,
    name: 'Kamp',
    description: null,
    address: null,
    startDate: new Date(2020, 7, 1),
    endDate: null,
    targetAudience: null,
  }
];

let YEARS = [
  {
    id: 1,
    startDate: new Date(2019, 8, 1),
    endDate: new Date(2020, 7, 31),
    events: [EVENTS[0]],
    leaders: LEADERS,
    headLeaders: [PEOPLE[0]],
    adultLeaders: [PEOPLE[0]],
  },
  {
    id: 2,
    startDate: new Date(2020, 8, 1),
    endDate: new Date(2021, 7, 31),
    events: [EVENTS[1]],
    leaders: LEADERS,
    headLeaders: [PEOPLE[0]],
    adultLeaders: [PEOPLE[0]],
  }
];

module.exports = {
  PEOPLE,
  ADDRESSES,
  LEADERS,
  GROUPS,
  ARTICLES,
  EVENTS,
  YEARS
};