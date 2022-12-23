const PEOPLE = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    cellphone: '1234567890',
    address: ADDRESSES[0],
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    cellphone: '0987654321',
    address: null,
  },
];

const ADDRESSES = [
  {
    id: 1,
    street: 'Dorpsstraat',
    number: '1',
    city: 'Houthulst',
    zip: '8650',
  },
  {
    id: 2,
    street: 'Stadenstraat',
    number: '15b',
    city: 'Houthulst',
    zip: '8650',
  },
];

const LEADERS = [
  {
    id: 1,
    person: PEOPLE[0],
    group: GROUPS[0],
    year: YEARS[0],
  },
  {
    id: 2,
    person: PEOPLE[1],
    group: GROUPS[1],
    year: YEARS[0],
  },
];

const HEAD_LEADERS = [
  {
    id: 1,
    person: PEOPLE[0],
    year: YEARS[0],
  },
];

const ADULT_LEADERS = [
  {
    id: 1,
    person: PEOPLE[0],
    year: YEARS[0],
  },
];

const GROUPS = [
  {
    id: 1,
    name: 'Kabouters',
    color: 'red',
    mascotName: 'Karel',
    targetAudience: '12-14',
  },
  {
    id: 2,
    name: 'Welpen',
    color: 'blue',
    mascotName: null,
    targetAudience: 'boys 14-16',
  },
];

const ARTICLES = [
  {
    id: 1,
    title: 'Info',
    content: '# Info',
  },
  {
    id: 2,
    title: 'Contact',
    content: '# Contact',
  },
];

const EVENTS = [
  {
    id: 1,
    name: 'Kamp',
    description: 'Kamp',
    address: ADDRESSES[0],
    startDate: new Date(2019, 7, 1),
    endDate: new Date(2019, 7, 8),
    targetAudience: '6-18',
    year: YEARS[0],
  },
  {
    id: 2,
    name: 'Kamp',
    description: null,
    address: null,
    startDate: new Date(2020, 7, 1),
    endDate: null,
    targetAudience: null,
    year: YEARS[1],
  },
];

const YEARS = [
  {
    id: 1,
    startDate: new Date(2019, 8, 1),
    endDate: new Date(2020, 7, 31),
  },
  {
    id: 2,
    startDate: new Date(2020, 8, 1),
    endDate: new Date(2021, 7, 31),
  },
];

module.exports = {
  PEOPLE,
  ADDRESSES,
  LEADERS,
  HEAD_LEADERS,
  ADULT_LEADERS,
  GROUPS,
  ARTICLES,
  EVENTS,
  YEARS,
};
